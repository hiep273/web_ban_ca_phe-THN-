using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace FarmToCup.API.Models;

[Table("NhaCungCap")]
public partial class NhaCungCap
{
    [Key]
    public int MaNhaCungCap { get; set; }

    [StringLength(150)]
    public string TenNhaCungCap { get; set; } = null!;

    [StringLength(150)]
    public string? KhuVuc { get; set; }

    [StringLength(100)]
    public string? NguoiLienHe { get; set; }

    [StringLength(150)]
    public string? Email { get; set; }

    [StringLength(20)]
    public string? SoDienThoai { get; set; }

    [StringLength(255)]
    public string? DiaChi { get; set; }

    [StringLength(20)]
    public string? XepHang { get; set; }

    [StringLength(50)]
    public string? TrangThai { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? NgayTao { get; set; }

    [InverseProperty("MaNhaCungCapNavigation")]
    public virtual ICollection<LoHang> LoHangs { get; set; } = new List<LoHang>();

    [InverseProperty("MaNhaCungCapNavigation")]
    public virtual ICollection<PhieuNhapKho> PhieuNhapKhos { get; set; } = new List<PhieuNhapKho>();
}
