using FarmToCup.API.Models;
namespace FarmToCup.API.Repository
{
    public interface ISanPhamRepository
    {
        Task<object> GetAllAsync(
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
            int pageSize);

        Task<SanPham?> GetByIdAsync(int id);
        Task<SanPham> AddAsync(SanPham sanPham);
        Task<bool> UpdateAsync(SanPham sanPham);
        Task<bool> SoftDeleteAsync(int id);

    }
}
