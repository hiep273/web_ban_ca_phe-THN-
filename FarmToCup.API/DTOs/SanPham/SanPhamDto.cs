namespace FarmToCup.API.DTOs.SanPham
{
    public class SanPhamDto
    {
        public int MaSanPham { get; set; }
        public string TenSanPham { get; set; } = null!;
        public string? XuatXu { get; set; }
        public decimal Gia { get; set; }
        public string? MucRang { get; set; }
        public string? QuyTrinhCheBien { get; set; }
        public string? MoTa { get; set; }
        public string? HinhAnh { get; set; }
        public int? SoLuongTon { get; set; }
        public bool? TrangThai { get; set; }
    }
}
