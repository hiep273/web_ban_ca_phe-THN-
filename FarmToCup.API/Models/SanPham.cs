using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace FarmToCup.API.Models;

[Table("SanPham")]
public partial class SanPham
{
    [Key]
    public int MaSanPham { get; set; }

    [StringLength(150)]
    public string TenSanPham { get; set; } = null!;

    [StringLength(150)]
    public string? XuatXu { get; set; }

    [Column(TypeName = "decimal(18, 2)")]
    public decimal Gia { get; set; }

    [StringLength(50)]
    public string? MucRang { get; set; }

    [StringLength(100)]
    public string? QuyTrinhCheBien { get; set; }

    public string? MoTa { get; set; }

    [StringLength(500)]
    public string? HinhAnh { get; set; }

    [StringLength(100)]
    public string? NhanHieuPhu { get; set; }

    public int? SoLuongTon { get; set; }

    public bool? TrangThai { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? NgayTao { get; set; }

    [InverseProperty("MaSanPhamNavigation")]
    public virtual ICollection<AnhSanPham> AnhSanPhams { get; set; } = new List<AnhSanPham>();

    [InverseProperty("MaSanPhamNavigation")]
    public virtual ICollection<ChiTietDonHang> ChiTietDonHangs { get; set; } = new List<ChiTietDonHang>();

    [InverseProperty("MaSanPhamNavigation")]
    public virtual ICollection<ChiTietGioHang> ChiTietGioHangs { get; set; } = new List<ChiTietGioHang>();

    [InverseProperty("MaSanPhamNavigation")]
    public virtual ICollection<ChiTietPhieuNhapKho> ChiTietPhieuNhapKhos { get; set; } = new List<ChiTietPhieuNhapKho>();

    [InverseProperty("MaSanPhamNavigation")]
    public virtual ICollection<DanhGiaSanPham> DanhGiaSanPhams { get; set; } = new List<DanhGiaSanPham>();

    [InverseProperty("MaSanPhamNavigation")]
    public virtual ICollection<LoHang> LoHangs { get; set; } = new List<LoHang>();

    [ForeignKey("MaSanPham")]
    [InverseProperty("MaSanPhams")]
    public virtual ICollection<HuongVi> MaHuongVis { get; set; } = new List<HuongVi>();

    [ForeignKey("MaSanPham")]
    [InverseProperty("MaSanPhams")]
    public virtual ICollection<PhuongPhapPha> MaPhuongPhaps { get; set; } = new List<PhuongPhapPha>();
}
