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
        private readonly IRepository<SanPham> _sanPhamRepo;
        public SanPhamController(IRepository<SanPham> sanPhamRepo)
        {
            _sanPhamRepo = sanPhamRepo;
        }
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var sanPhams = await _sanPhamRepo.GetAllAsync();
            return Ok(sanPhams);
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var sanPham = await _sanPhamRepo.GetByIdAsync(id);
            if (sanPham == null) return NotFound();
            return Ok(sanPham);
        }
        [HttpPost]
        public async Task<IActionResult> Create(TaoSanPhamDto taoSanPhamDto)
        {
            var sanPham = new SanPham
            {
                TenSanPham = taoSanPhamDto.TenSanPham,
                XuatXu = taoSanPhamDto.XuatXu,
                Gia = taoSanPhamDto.Gia,
                MucRang = taoSanPhamDto.MucRang,
                QuyTrinhCheBien = taoSanPhamDto.QuyTrinhCheBien,
                MoTa = taoSanPhamDto.MoTa,
                HinhAnh = taoSanPhamDto.HinhAnh,
                NhanHieuPhu = taoSanPhamDto.NhanHieuPhu,
                SoLuongTon = taoSanPhamDto.SoLuongTon,
                TrangThai = true,
                NgayTao = DateTime.UtcNow

            };



            var createdSanPham = await _sanPhamRepo.AddAsync(sanPham);
            return Ok(sanPham);
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, TaoSanPhamDto taoSanPhamDto)
        {
            var sanPham = await _sanPhamRepo.GetByIdAsync(id);
            if (sanPham == null) return NotFound();
            sanPham.TenSanPham = taoSanPhamDto.TenSanPham;
            sanPham.XuatXu = taoSanPhamDto.XuatXu;
            sanPham.Gia = taoSanPhamDto.Gia;
            sanPham.MucRang = taoSanPhamDto.MucRang;
            sanPham.QuyTrinhCheBien = taoSanPhamDto.QuyTrinhCheBien;
            sanPham.MoTa = taoSanPhamDto.MoTa;
            sanPham.HinhAnh = taoSanPhamDto.HinhAnh;
            sanPham.NhanHieuPhu = taoSanPhamDto.NhanHieuPhu;
            sanPham.SoLuongTon = taoSanPhamDto.SoLuongTon;
            await _sanPhamRepo.UpdateAsync(sanPham);
            return Ok(sanPham);
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var sanPham = await _sanPhamRepo.GetByIdAsync(id);
            if (sanPham == null) return NotFound();
            sanPham.TrangThai = false;
            await _sanPhamRepo.UpdateAsync(sanPham);
            return Ok("da an san pham");
       

        }
    }
            
}
