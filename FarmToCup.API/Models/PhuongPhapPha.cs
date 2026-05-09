using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace FarmToCup.API.Models;

[Table("PhuongPhapPha")]
public partial class PhuongPhapPha
{
    [Key]
    public int MaPhuongPhap { get; set; }

    [StringLength(100)]
    public string TenPhuongPhap { get; set; } = null!;

    [ForeignKey("MaPhuongPhap")]
    [InverseProperty("MaPhuongPhaps")]
    public virtual ICollection<SanPham> MaSanPhams { get; set; } = new List<SanPham>();
}
