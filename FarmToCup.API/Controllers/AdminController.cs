using FarmToCup.API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FarmToCup.API.Controllers
{
    [Route("api/admin")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private readonly FarmToCupContext _context;

        public AdminController(FarmToCupContext context)
        {
            _context = context;
        }

        [HttpGet("overview")]
        public async Task<IActionResult> GetOverview()
        {
            var products = await _context.SanPhams
                .Include(product => product.LoHangs)
                    .ThenInclude(lot => lot.MaNhaCungCapNavigation)
                .Where(product => product.TrangThai == true || product.TrangThai == null)
                .OrderByDescending(product => product.NgayTao)
                .ToListAsync();

            var orders = await _context.DonHangs
                .Include(order => order.MaNguoiDungNavigation)
                .Include(order => order.ChiTietDonHangs)
                .Include(order => order.ThanhToans)
                .Include(order => order.VanChuyens)
                .OrderByDescending(order => order.NgayDat)
                .ToListAsync();

            var suppliers = await _context.NhaCungCaps
                .Include(supplier => supplier.LoHangs)
                .Include(supplier => supplier.PhieuNhapKhos)
                .OrderBy(supplier => supplier.TenNhaCungCap)
                .ToListAsync();

            var purchaseReceipts = await _context.PhieuNhapKhos
                .Include(receipt => receipt.MaNhaCungCapNavigation)
                .Include(receipt => receipt.ChiTietPhieuNhapKhos)
                    .ThenInclude(detail => detail.MaSanPhamNavigation)
                .OrderByDescending(receipt => receipt.NgayNhap)
                .Take(6)
                .ToListAsync();

            var inventoryItems = products.Select(product =>
            {
                var latestLot = product.LoHangs
                    .OrderByDescending(lot => lot.NgayNhap)
                    .FirstOrDefault();
                var stockQty = product.SoLuongTon ?? 0;
                var reorderPoint = Math.Max(10, (int)Math.Ceiling(stockQty * 0.2));

                return new
                {
                    id = $"prd-{product.MaSanPham}",
                    name = product.TenSanPham,
                    origin = product.XuatXu ?? "Chua cap nhat",
                    process = product.QuyTrinhCheBien ?? "Chua cap nhat",
                    roastLevel = product.MucRang ?? "Chua cap nhat",
                    type = IsGreenCoffee(product.MucRang) ? "Green" : "Roasted",
                    stockQty,
                    stockUnit = "bags",
                    reorderPoint,
                    harvestDate = FormatDate(latestLot?.NgaySanXuat),
                    roastDate = FormatDate(product.NgayTao),
                    freshness = latestLot?.HanSuDung != null
                        ? $"HSD {FormatDate(latestLot.HanSuDung)}"
                        : "Dang cap nhat",
                    supplierId = latestLot?.MaNhaCungCap != null ? $"sup-{latestLot.MaNhaCungCap}" : "",
                    supplierName = latestLot?.MaNhaCungCapNavigation?.TenNhaCungCap ?? "Chua gan nha cung cap",
                    status = stockQty <= 0 ? "Out of Stock" : stockQty <= reorderPoint ? "Low Stock" : "In Stock",
                    image = product.HinhAnh
                };
            });

            var orderRows = orders.Select(order =>
            {
                var latestPayment = order.ThanhToans
                    .OrderByDescending(payment => payment.NgayThanhToan)
                    .FirstOrDefault();
                var latestShipping = order.VanChuyens
                    .OrderByDescending(shipping => shipping.NgayGui)
                    .FirstOrDefault();

                return new
                {
                    id = $"ORD-{order.MaDonHang}",
                    customer = order.MaNguoiDungNavigation.HoTen,
                    channel = order.ChiTietDonHangs.Any(detail => detail.DangKyDinhKy == true)
                        ? "Subscription"
                        : "Website",
                    items = order.ChiTietDonHangs.Sum(detail => detail.SoLuong),
                    total = order.ThanhTien,
                    payment = latestPayment?.TrangThaiThanhToan ?? "Pending",
                    fulfillment = latestShipping?.TrangThaiVanChuyen ?? order.TrangThaiDonHang ?? "Pending",
                    createdAt = FormatDateTime(order.NgayDat)
                };
            });

            var supplierRows = suppliers.Select(supplier =>
            {
                var nextReceipt = supplier.PhieuNhapKhos
                    .Where(receipt => receipt.NgayNhap != null)
                    .OrderByDescending(receipt => receipt.NgayNhap)
                    .FirstOrDefault();

                return new
                {
                    id = $"sup-{supplier.MaNhaCungCap}",
                    name = supplier.TenNhaCungCap,
                    region = supplier.KhuVuc ?? supplier.DiaChi ?? "Chua cap nhat",
                    contact = supplier.NguoiLienHe ?? supplier.Email ?? supplier.SoDienThoai ?? "Chua cap nhat",
                    activeLots = supplier.LoHangs.Count(lot => lot.TrangThai != "Da huy"),
                    nextShipment = FormatDate(nextReceipt?.NgayNhap),
                    rating = supplier.XepHang ?? "N/A",
                    status = supplier.TrangThai ?? "Active"
                };
            });

            var shipments = purchaseReceipts.Select(receipt =>
            {
                var firstDetail = receipt.ChiTietPhieuNhapKhos.FirstOrDefault();
                var quantity = receipt.ChiTietPhieuNhapKhos.Sum(detail => detail.SoLuong);
                var unit = firstDetail?.DonViTinh ?? "units";

                return new
                {
                    id = $"ship-{receipt.MaPhieuNhap}",
                    title = firstDetail?.MaSanPhamNavigation.TenSanPham
                        ?? receipt.MaNhaCungCapNavigation?.TenNhaCungCap
                        ?? "Phieu nhap kho",
                    quantity = $"{quantity:0.##} {unit}",
                    eta = FormatDate(receipt.NgayNhap),
                    route = receipt.MaNhaCungCapNavigation?.TenNhaCungCap ?? "Kho noi bo",
                    status = receipt.TrangThai ?? "Scheduled"
                };
            });

            var revenue = orders
                .Where(order => order.NgayDat >= DateTime.Today.AddDays(-7))
                .Sum(order => order.ThanhTien);
            var lowStockCount = products.Count(product => (product.SoLuongTon ?? 0) <= Math.Max(10, (int)Math.Ceiling((product.SoLuongTon ?? 0) * 0.2)));
            var delayedSuppliers = suppliers.Count(supplier => supplier.TrangThai == "Delayed" || supplier.TrangThai == "Cham");

            var reportMetrics = new[]
            {
                new { label = "Revenue this week", value = revenue, type = "currency", trend = "DB" },
                new { label = "Orders", value = (decimal)orders.Count, type = "number", trend = "DB" },
                new { label = "Low stock lots", value = (decimal)lowStockCount, type = "number", trend = "Needs action" },
                new { label = "Supplier delays", value = (decimal)delayedSuppliers, type = "number", trend = $"{delayedSuppliers} delayed" }
            };

            return Ok(new
            {
                inventoryItems,
                orders = orderRows,
                suppliers = supplierRows,
                shipments,
                reportMetrics
            });
        }

        private static bool IsGreenCoffee(string? roastLevel)
        {
            return roastLevel?.Contains("green", StringComparison.OrdinalIgnoreCase) == true
                || roastLevel?.Contains("xanh", StringComparison.OrdinalIgnoreCase) == true;
        }

        private static string FormatDate(DateOnly? value)
        {
            return value?.ToString("yyyy-MM-dd") ?? "Chua cap nhat";
        }

        private static string FormatDate(DateTime? value)
        {
            return value?.ToString("yyyy-MM-dd") ?? "Chua cap nhat";
        }

        private static string FormatDateTime(DateTime? value)
        {
            return value?.ToString("yyyy-MM-dd HH:mm") ?? "Chua cap nhat";
        }
    }
}
