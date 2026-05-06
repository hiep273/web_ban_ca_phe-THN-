using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace FarmToCup.API.Models;

[Table("ChiTietDonHang")]
public partial class ChiTietDonHang
{
    [Key]
    public int MaChiTietDonHang { get; set; }

    public int MaDonHang { get; set; }

    public int MaSanPham { get; set; }

    public int SoLuong { get; set; }

    [Column(TypeName = "decimal(18, 2)")]
    public decimal DonGia { get; set; }

    public bool? DangKyDinhKy { get; set; }

    [ForeignKey("MaDonHang")]
    [InverseProperty("ChiTietDonHangs")]
    public virtual DonHang MaDonHangNavigation { get; set; } = null!;

    [ForeignKey("MaSanPham")]
    [InverseProperty("ChiTietDonHangs")]
    public virtual SanPham MaSanPhamNavigation { get; set; } = null!;
}
