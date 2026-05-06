using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace FarmToCup.API.Models;

[Table("PhieuNhapKho")]
public partial class PhieuNhapKho
{
    [Key]
    public int MaPhieuNhap { get; set; }

    public int? MaNhaCungCap { get; set; }

    public int? MaNguoiTao { get; set; }

    [Column(TypeName = "decimal(18, 2)")]
    public decimal? TongTien { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? NgayNhap { get; set; }

    [StringLength(50)]
    public string? TrangThai { get; set; }

    [StringLength(255)]
    public string? GhiChu { get; set; }

    [InverseProperty("MaPhieuNhapNavigation")]
    public virtual ICollection<ChiTietPhieuNhapKho> ChiTietPhieuNhapKhos { get; set; } = new List<ChiTietPhieuNhapKho>();

    [ForeignKey("MaNguoiTao")]
    [InverseProperty("PhieuNhapKhos")]
    public virtual NguoiDung? MaNguoiTaoNavigation { get; set; }

    [ForeignKey("MaNhaCungCap")]
    [InverseProperty("PhieuNhapKhos")]
    public virtual NhaCungCap? MaNhaCungCapNavigation { get; set; }
}
