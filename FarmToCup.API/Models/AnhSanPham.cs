using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace FarmToCup.API.Models;

[Table("AnhSanPham")]
public partial class AnhSanPham
{
    [Key]
    public int MaAnhSanPham { get; set; }

    public int MaSanPham { get; set; }

    [StringLength(500)]
    public string DuongDanAnh { get; set; } = null!;

    public bool? LaAnhChinh { get; set; }

    public int? ThuTu { get; set; }

    [ForeignKey("MaSanPham")]
    [InverseProperty("AnhSanPhams")]
    public virtual SanPham MaSanPhamNavigation { get; set; } = null!;
}
