using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace FarmToCup.API.Models;

[Table("LoHang")]
public partial class LoHang
{
    [Key]
    public int MaLoHang { get; set; }

    public int MaSanPham { get; set; }

    public int? MaNhaCungCap { get; set; }

    [StringLength(50)]
    public string MaLo { get; set; } = null!;

    [Column(TypeName = "decimal(18, 2)")]
    public decimal SoLuongNhap { get; set; }

    [StringLength(50)]
    public string? DonViTinh { get; set; }

    [Column(TypeName = "decimal(18, 2)")]
    public decimal? GiaNhap { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? NgayNhap { get; set; }

    public DateOnly? NgaySanXuat { get; set; }

    public DateOnly? HanSuDung { get; set; }

    [StringLength(50)]
    public string? TrangThai { get; set; }

    [StringLength(255)]
    public string? GhiChu { get; set; }

    [ForeignKey("MaNhaCungCap")]
    [InverseProperty("LoHangs")]
    public virtual NhaCungCap? MaNhaCungCapNavigation { get; set; }

    [ForeignKey("MaSanPham")]
    [InverseProperty("LoHangs")]
    public virtual SanPham MaSanPhamNavigation { get; set; } = null!;
}
