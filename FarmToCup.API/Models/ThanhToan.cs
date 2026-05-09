using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace FarmToCup.API.Models;

[Table("ThanhToan")]
public partial class ThanhToan
{
    [Key]
    public int MaThanhToan { get; set; }

    public int MaDonHang { get; set; }

    [StringLength(50)]
    public string PhuongThucThanhToan { get; set; } = null!;

    [Column(TypeName = "decimal(18, 2)")]
    public decimal SoTien { get; set; }

    [StringLength(50)]
    public string? TrangThaiThanhToan { get; set; }

    [StringLength(100)]
    public string? MaGiaoDich { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? NgayThanhToan { get; set; }

    [StringLength(255)]
    public string? GhiChu { get; set; }

    [ForeignKey("MaDonHang")]
    [InverseProperty("ThanhToans")]
    public virtual DonHang MaDonHangNavigation { get; set; } = null!;
}
