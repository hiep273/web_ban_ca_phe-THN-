using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace FarmToCup.API.Models;

[Table("HuongVi")]
public partial class HuongVi
{
    [Key]
    public int MaHuongVi { get; set; }

    [StringLength(100)]
    public string TenHuongVi { get; set; } = null!;

    [ForeignKey("MaHuongVi")]
    [InverseProperty("MaHuongVis")]
    public virtual ICollection<SanPham> MaSanPhams { get; set; } = new List<SanPham>();
}
