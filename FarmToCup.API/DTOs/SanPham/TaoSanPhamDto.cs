using System.ComponentModel.DataAnnotations;

namespace FarmToCup.API.DTOs.SanPham
{
    public class TaoSanPhamDto
    {
        [Required]
        public string TenSanPham { get; set; } = null!;

        public string? XuatXu { get; set; }

        [Range(0, double.MaxValue)]
        public decimal Gia { get; set; }

        public string? MucRang { get; set; }
        public string? QuyTrinhCheBien { get; set; }
        public string? MoTa { get; set; }
        public string? HinhAnh { get; set; }
        public string? NhanHieuPhu { get; set; }
        public int? SoLuongTon { get; set; }

    }
}
