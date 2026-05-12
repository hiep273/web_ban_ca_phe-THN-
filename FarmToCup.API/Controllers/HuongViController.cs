using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using FarmToCup.API.Models;
using FarmToCup.API.Repository;
using FarmToCup.API.DTOs.HuongVi;

namespace FarmToCup.API.Controllers
{
    [Route("api/huong-vi")]
    [ApiController]
    public class HuongViController : ControllerBase
    {
        private readonly IHuongViRepository _repo;

        public HuongViController(IHuongViRepository repo)
        {
            _repo = repo;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var data = await _repo.GetAllAsync();

            return Ok(data);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var data = await _repo.GetByIdAsync(id);

            if (data == null)
                return NotFound("Không tìm thấy hương vị");

            return Ok(data);
        }

        [HttpPost]
        public async Task<IActionResult> Create(TaoHuongViDto dto)
        {
            var huongVi = new HuongVi
            {
                TenHuongVi = dto.TenHuongVi
            };

            var result = await _repo.AddAsync(huongVi);

            return Ok(result);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(
            int id,
            CapNhatHuongViDto dto)
        {
            var huongVi = await _repo.GetByIdAsync(id);

            if (huongVi == null)
                return NotFound("Không tìm thấy hương vị");

            huongVi.TenHuongVi = dto.TenHuongVi;

            await _repo.UpdateAsync(huongVi);

            return Ok(huongVi);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var result = await _repo.DeleteAsync(id);

            if (!result)
                return NotFound("Không tìm thấy hương vị");

            return Ok("Xóa thành công");
        }

    }
}
