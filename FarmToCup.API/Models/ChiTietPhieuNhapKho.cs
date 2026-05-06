using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace FarmToCup.API.Models;

[Table("ChiTietPhieuNhapKho")]
public partial class ChiTietPhieuNhapKho
{
    [Key]
    public int MaChiTietPhieuNhap { get; set; }

    public int MaPhieuNhap { get; set; }

    public int MaSanPham { get; set; }

    [Column(TypeName = "decimal(18, 2)")]
    public decimal SoLuong { get; set; }

    [StringLength(50)]
    public string? DonViTinh { get; set; }

    [Column(TypeName = "decimal(18, 2)")]
    public decimal DonGia { get; set; }

    [Column(TypeName = "decimal(37, 4)")]
    public decimal? ThanhTien { get; set; }

    [ForeignKey("MaPhieuNhap")]
    [InverseProperty("ChiTietPhieuNhapKhos")]
    public virtual PhieuNhapKho MaPhieuNhapNavigation { get; set; } = null!;

    [ForeignKey("MaSanPham")]
    [InverseProperty("ChiTietPhieuNhapKhos")]
    public virtual SanPham MaSanPhamNavigation { get; set; } = null!;
}
