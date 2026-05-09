using FarmToCup.API.Models;
using Microsoft.EntityFrameworkCore;
namespace FarmToCup.API.Repository
{
    public class SanPhamRepository : Repository<SanPham>, ISanPhamRepository
    {
        private readonly FarmToCupContext _context;

        public SanPhamRepository(FarmToCupContext context) : base(context)
        {
            _context = context;
        }

        public async Task<object> GetAllAsync(
            string? keyword,
            string? xuatXu,
            string? mucRang,
            string? quyTrinhCheBien,
            string? huongVi,
            string? phuongPhapPha,
            decimal? minPrice,
            decimal? maxPrice,
            string? sortBy,
            bool desc,
            int page,
            int pageSize)
        {
            if (page <= 0) page = 1;
            if (pageSize <= 0) pageSize = 12;

            var query = _context.SanPhams
                .Include(x => x.MaHuongVis)
                .Include(x => x.MaPhuongPhaps)
                .Where(x => x.TrangThai == true || x.TrangThai == null)
                .AsQueryable();

            if (!string.IsNullOrWhiteSpace(keyword))
                query = query.Where(x => x.TenSanPham.Contains(keyword));

            if (!string.IsNullOrWhiteSpace(xuatXu))
                query = query.Where(x => x.XuatXu != null && x.XuatXu.Contains(xuatXu));

            if (!string.IsNullOrWhiteSpace(mucRang))
                query = query.Where(x => x.MucRang != null && x.MucRang.Contains(mucRang));

            if (!string.IsNullOrWhiteSpace(quyTrinhCheBien))
                query = query.Where(x => x.QuyTrinhCheBien != null && x.QuyTrinhCheBien.Contains(quyTrinhCheBien));

            if (!string.IsNullOrWhiteSpace(huongVi))
                query = query.Where(x => x.MaHuongVis.Any(hv => hv.TenHuongVi.Contains(huongVi)));

            if (!string.IsNullOrWhiteSpace(phuongPhapPha))
                query = query.Where(x => x.MaPhuongPhaps.Any(pp => pp.TenPhuongPhap.Contains(phuongPhapPha)));

            if (minPrice.HasValue)
                query = query.Where(x => x.Gia >= minPrice.Value);

            if (maxPrice.HasValue)
                query = query.Where(x => x.Gia <= maxPrice.Value);

            query = sortBy?.ToLower() switch
            {
                "price" => desc ? query.OrderByDescending(x => x.Gia) : query.OrderBy(x => x.Gia),
                "name" => desc ? query.OrderByDescending(x => x.TenSanPham) : query.OrderBy(x => x.TenSanPham),
                "stock" => desc ? query.OrderByDescending(x => x.SoLuongTon) : query.OrderBy(x => x.SoLuongTon),
                _ => desc ? query.OrderByDescending(x => x.NgayTao) : query.OrderBy(x => x.NgayTao)
            };

            var totalItems = await query.CountAsync();

            var data = await query
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .Select(x => new
                {
                    x.MaSanPham,
                    x.TenSanPham,
                    x.XuatXu,
                    x.Gia,
                    x.MucRang,
                    x.QuyTrinhCheBien,
                    x.MoTa,
                    x.HinhAnh,
                    x.NhanHieuPhu,
                    x.SoLuongTon,
                    x.TrangThai,
                    x.NgayTao,
                    HuongVis = x.MaHuongVis.Select(hv => new
                    {
                        hv.MaHuongVi,
                        hv.TenHuongVi
                    }),
                    PhuongPhapPhas = x.MaPhuongPhaps.Select(pp => new
                    {
                        pp.MaPhuongPhap,
                        pp.TenPhuongPhap
                    })
                })
                .ToListAsync();

            return new
            {
                page,
                pageSize,
                totalItems,
                totalPages = (int)Math.Ceiling((double)totalItems / pageSize),
                data
            };
        }

        public async Task<SanPham?> GetByIdAsync(int id)
        {
            return await _context.SanPhams
                .Include(x => x.MaHuongVis)
                .Include(x => x.MaPhuongPhaps)
                .FirstOrDefaultAsync(x =>
                    x.MaSanPham == id &&
                    (x.TrangThai == true || x.TrangThai == null));
        }

        public async Task<SanPham> AddAsync(SanPham sanPham)
        {
            await _context.SanPhams.AddAsync(sanPham);
            await _context.SaveChangesAsync();
            return sanPham;
        }

        public async Task<bool> UpdateAsync(SanPham sanPham)
        {
            _context.SanPhams.Update(sanPham);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> SoftDeleteAsync(int id)
        {
            var sanPham = await _context.SanPhams.FindAsync(id);

            if (sanPham == null)
                return false;

            sanPham.TrangThai = false;
            await _context.SaveChangesAsync();

            return true;
        }
    }

}
