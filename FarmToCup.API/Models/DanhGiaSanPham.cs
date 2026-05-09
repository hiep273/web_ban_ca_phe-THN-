using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace FarmToCup.API.Models;

[Table("DanhGiaSanPham")]
public partial class DanhGiaSanPham
{
    [Key]
    public int MaDanhGia { get; set; }

    public int MaNguoiDung { get; set; }

    public int MaSanPham { get; set; }

    public int SoSao { get; set; }

    [StringLength(500)]
    public string? NoiDung { get; set; }

    [StringLength(50)]
    public string? TrangThai { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? NgayDanhGia { get; set; }

    [ForeignKey("MaNguoiDung")]
    [InverseProperty("DanhGiaSanPhams")]
    public virtual NguoiDung MaNguoiDungNavigation { get; set; } = null!;

    [ForeignKey("MaSanPham")]
    [InverseProperty("DanhGiaSanPhams")]
    public virtual SanPham MaSanPhamNavigation { get; set; } = null!;
}
