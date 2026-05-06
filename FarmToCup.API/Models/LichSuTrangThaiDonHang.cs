using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace FarmToCup.API.Models;

[Table("LichSuTrangThaiDonHang")]
public partial class LichSuTrangThaiDonHang
{
    [Key]
    public int MaLichSu { get; set; }

    public int MaDonHang { get; set; }

    [StringLength(50)]
    public string? TrangThaiCu { get; set; }

    [StringLength(50)]
    public string TrangThaiMoi { get; set; } = null!;

    public int? MaNguoiCapNhat { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? ThoiGianCapNhat { get; set; }

    [StringLength(255)]
    public string? GhiChu { get; set; }

    [ForeignKey("MaDonHang")]
    [InverseProperty("LichSuTrangThaiDonHangs")]
    public virtual DonHang MaDonHangNavigation { get; set; } = null!;

    [ForeignKey("MaNguoiCapNhat")]
    [InverseProperty("LichSuTrangThaiDonHangs")]
    public virtual NguoiDung? MaNguoiCapNhatNavigation { get; set; }
}
