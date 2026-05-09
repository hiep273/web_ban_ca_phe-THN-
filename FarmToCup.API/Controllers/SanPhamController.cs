using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using FarmToCup.API.DTOs.SanPham;
using FarmToCup.API.Repository;
using FarmToCup.API.Models;

namespace FarmToCup.API.Controllers
{
    [Route("api/san-pham")]
    [ApiController]
    public class SanPhamController : ControllerBase
    {
        private readonly ISanPhamRepository _sanPhamRepo;

        public SanPhamController(ISanPhamRepository sanPhamRepo)
        {
            _sanPhamRepo = sanPhamRepo;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll(
            string? keyword,
            string? xuatXu,
            string? mucRang,
            string? quyTrinhCheBien,
            string? huongVi,
            string? phuongPhapPha,
            decimal? minPrice,
            decimal? maxPrice,
            string? sortBy = "newest",
            bool desc = true,
            int page = 1,
            int pageSize = 12)
        {
            var result = await _sanPhamRepo.GetAllAsync(
                keyword,
                xuatXu,
                mucRang,
                quyTrinhCheBien,
                huongVi,
                phuongPhapPha,
                minPrice,
                maxPrice,
                sortBy,
                desc,
                page,
                pageSize);

            return Ok(result);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var sanPham = await _sanPhamRepo.GetByIdAsync(id);

            if (sanPham == null)
                return NotFound("Không tìm thấy sản phẩm");

            return Ok(sanPham);
        }

        [HttpPost]
        public async Task<IActionResult> Create(TaoSanPhamDto dto)
        {
            var sanPham = new SanPham
            {
                TenSanPham = dto.TenSanPham,
                XuatXu = dto.XuatXu,
                Gia = dto.Gia,
                MucRang = dto.MucRang,
                QuyTrinhCheBien = dto.QuyTrinhCheBien,
                MoTa = dto.MoTa,
                HinhAnh = dto.HinhAnh,
                NhanHieuPhu = dto.NhanHieuPhu,
                SoLuongTon = dto.SoLuongTon ?? 0,
                TrangThai = true,
                NgayTao = DateTime.UtcNow
            };

            var result = await _sanPhamRepo.AddAsync(sanPham);

            return Ok(result);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, CapNhatSanPhamDto dto)
        {
            var sanPham = await _sanPhamRepo.GetByIdAsync(id);

            if (sanPham == null)
                return NotFound("Không tìm thấy sản phẩm");

            sanPham.TenSanPham = dto.TenSanPham;
            sanPham.XuatXu = dto.XuatXu;
            sanPham.Gia = (decimal)dto.Gia;
            sanPham.MucRang = dto.MucRang;
            sanPham.QuyTrinhCheBien = dto.QuyTrinhCheBien;
            sanPham.MoTa = dto.MoTa;
            sanPham.HinhAnh = dto.HinhAnh;
            sanPham.NhanHieuPhu = dto.NhanHieuPhu;

            if (dto.SoLuongTon.HasValue)
                sanPham.SoLuongTon = dto.SoLuongTon.Value;

            sanPham.TrangThai = dto.TrangThai ?? sanPham.TrangThai;

            await _sanPhamRepo.UpdateAsync(sanPham);

            return Ok(sanPham);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var result = await _sanPhamRepo.SoftDeleteAsync(id);

            if (!result)
                return NotFound("Không tìm thấy sản phẩm");

            return Ok("Đã ẩn sản phẩm");
        }

    }
            
}
