using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace FarmToCup.API.Models;

[Table("VanChuyen")]
public partial class VanChuyen
{
    [Key]
    public int MaVanChuyen { get; set; }

    public int MaDonHang { get; set; }

    [StringLength(100)]
    public string? DonViVanChuyen { get; set; }

    [StringLength(100)]
    public string? MaVanDon { get; set; }

    [Column(TypeName = "decimal(18, 2)")]
    public decimal? PhiVanChuyen { get; set; }

    [StringLength(255)]
    public string DiaChiNhanHang { get; set; } = null!;

    [StringLength(50)]
    public string? TrangThaiVanChuyen { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? NgayGui { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? NgayGiaoDuKien { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? NgayGiaoThucTe { get; set; }

    [ForeignKey("MaDonHang")]
    [InverseProperty("VanChuyens")]
    public virtual DonHang MaDonHangNavigation { get; set; } = null!;
}
