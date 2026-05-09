using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace FarmToCup.API.Models;

[Table("CauHoiQuiz")]
public partial class CauHoiQuiz
{
    [Key]
    public int MaCauHoi { get; set; }

    [StringLength(255)]
    public string NoiDungCauHoi { get; set; } = null!;

    public int ThuTu { get; set; }

    [InverseProperty("MaCauHoiNavigation")]
    public virtual ICollection<LuaChonQuiz> LuaChonQuizzes { get; set; } = new List<LuaChonQuiz>();
}
