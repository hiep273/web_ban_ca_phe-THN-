using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace FarmToCup.API.Models;

[Table("RefreshToken")]
public partial class RefreshToken
{
    [Key]
    public int MaRefreshToken { get; set; }

    public int MaNguoiDung { get; set; }

    [StringLength(500)]
    public string Token { get; set; } = null!;

    [Column(TypeName = "datetime")]
    public DateTime NgayHetHan { get; set; }

    public bool? DaThuHoi { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? NgayTao { get; set; }

    [ForeignKey("MaNguoiDung")]
    [InverseProperty("RefreshTokens")]
    public virtual NguoiDung MaNguoiDungNavigation { get; set; } = null!;
}
