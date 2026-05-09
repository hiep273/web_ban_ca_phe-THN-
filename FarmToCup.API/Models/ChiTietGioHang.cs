using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace FarmToCup.API.Models;

[Table("ChiTietGioHang")]
public partial class ChiTietGioHang
{
    [Key]
    public int MaChiTietGioHang { get; set; }

    public int MaGioHang { get; set; }

    public int MaSanPham { get; set; }

    public int SoLuong { get; set; }

    public bool? DangKyDinhKy { get; set; }

    [ForeignKey("MaGioHang")]
    [InverseProperty("ChiTietGioHangs")]
    public virtual GioHang MaGioHangNavigation { get; set; } = null!;

    [ForeignKey("MaSanPham")]
    [InverseProperty("ChiTietGioHangs")]
    public virtual SanPham MaSanPhamNavigation { get; set; } = null!;
}
