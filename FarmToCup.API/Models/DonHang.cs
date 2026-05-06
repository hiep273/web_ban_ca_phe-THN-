using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace FarmToCup.API.Models;

[Table("DonHang")]
public partial class DonHang
{
    [Key]
    public int MaDonHang { get; set; }

    public int MaNguoiDung { get; set; }

    [Column(TypeName = "decimal(18, 2)")]
    public decimal TongTien { get; set; }

    [Column(TypeName = "decimal(18, 2)")]
    public decimal? GiamGia { get; set; }

    [Column(TypeName = "decimal(18, 2)")]
    public decimal? PhiVanChuyen { get; set; }

    [Column(TypeName = "decimal(18, 2)")]
    public decimal ThanhTien { get; set; }

    [StringLength(50)]
    public string? TrangThaiDonHang { get; set; }

    [StringLength(255)]
    public string? DiaChiGiaoHang { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? NgayDat { get; set; }

    [InverseProperty("MaDonHangNavigation")]
    public virtual ICollection<ChiTietDonHang> ChiTietDonHangs { get; set; } = new List<ChiTietDonHang>();

    [InverseProperty("MaDonHangNavigation")]
    public virtual ICollection<LichSuTrangThaiDonHang> LichSuTrangThaiDonHangs { get; set; } = new List<LichSuTrangThaiDonHang>();

    [ForeignKey("MaNguoiDung")]
    [InverseProperty("DonHangs")]
    public virtual NguoiDung MaNguoiDungNavigation { get; set; } = null!;

    [InverseProperty("MaDonHangNavigation")]
    public virtual ICollection<ThanhToan> ThanhToans { get; set; } = new List<ThanhToan>();

    [InverseProperty("MaDonHangNavigation")]
    public virtual ICollection<VanChuyen> VanChuyens { get; set; } = new List<VanChuyen>();
}
