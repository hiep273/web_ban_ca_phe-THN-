using FarmToCup.API.Models;
using Microsoft.EntityFrameworkCore;
namespace FarmToCup.API.Repository
{
    public class HuongViRepository : Repository<HuongVi>, IHuongViRepository
    {
        private readonly FarmToCupContext _context;

        public HuongViRepository(FarmToCupContext context)
            : base(context)
        {
            _context = context;
        }

        public async Task<IEnumerable<HuongVi>> GetAllAsync()
        {
            return await _context.HuongVis.ToListAsync();
        }

        public async Task<HuongVi?> GetByIdAsync(int id)
        {
            return await _context.HuongVis
                .FirstOrDefaultAsync(x => x.MaHuongVi == id);
        }

        public async Task<HuongVi> AddAsync(HuongVi huongVi)
        {
            await _context.HuongVis.AddAsync(huongVi);

            await _context.SaveChangesAsync();

            return huongVi;
        }

        public async Task<bool> UpdateAsync(HuongVi huongVi)
        {
            _context.HuongVis.Update(huongVi);

            await _context.SaveChangesAsync();

            return true;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var huongVi = await _context.HuongVis
                .FindAsync(id);

            if (huongVi == null)
                return false;

            _context.HuongVis.Remove(huongVi);

            await _context.SaveChangesAsync();

            return true;
        }


    }
}
