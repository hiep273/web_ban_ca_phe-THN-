using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace FarmToCup.API.Models;

[Table("LuaChonQuiz")]
public partial class LuaChonQuiz
{
    [Key]
    public int MaLuaChon { get; set; }

    public int MaCauHoi { get; set; }

    [StringLength(255)]
    public string NoiDungLuaChon { get; set; } = null!;

    [StringLength(100)]
    public string? NhomHuongVi { get; set; }

    [ForeignKey("MaCauHoi")]
    [InverseProperty("LuaChonQuizzes")]
    public virtual CauHoiQuiz MaCauHoiNavigation { get; set; } = null!;
}
