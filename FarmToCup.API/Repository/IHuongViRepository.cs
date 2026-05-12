using FarmToCup.API.Models;
namespace FarmToCup.API.Repository
{
    public interface IHuongViRepository
    {
        Task<IEnumerable<HuongVi>> GetAllAsync();
        Task<HuongVi?> GetByIdAsync(int id);
        Task<HuongVi> AddAsync(HuongVi huongVi);
        Task<bool> UpdateAsync(HuongVi huongVi);
        Task<bool> DeleteAsync(int id);

    }
}
