using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace FarmToCup.API.Models;

public partial class FarmToCupContext : DbContext
{
    public FarmToCupContext()
    {
    }

    public FarmToCupContext(DbContextOptions<FarmToCupContext> options)
        : base(options)
    {
    }

    public virtual DbSet<AnhSanPham> AnhSanPhams { get; set; }

    public virtual DbSet<CauHoiQuiz> CauHoiQuizzes { get; set; }

    public virtual DbSet<ChiTietDonHang> ChiTietDonHangs { get; set; }

    public virtual DbSet<ChiTietGioHang> ChiTietGioHangs { get; set; }

    public virtual DbSet<ChiTietPhieuNhapKho> ChiTietPhieuNhapKhos { get; set; }

    public virtual DbSet<DanhGiaSanPham> DanhGiaSanPhams { get; set; }

    public virtual DbSet<DonHang> DonHangs { get; set; }

    public virtual DbSet<GioHang> GioHangs { get; set; }

    public virtual DbSet<HuongVi> HuongVis { get; set; }

    public virtual DbSet<LichSuTrangThaiDonHang> LichSuTrangThaiDonHangs { get; set; }

    public virtual DbSet<LoHang> LoHangs { get; set; }

    public virtual DbSet<LuaChonQuiz> LuaChonQuizzes { get; set; }

    public virtual DbSet<NguoiDung> NguoiDungs { get; set; }

    public virtual DbSet<NhaCungCap> NhaCungCaps { get; set; }

    public virtual DbSet<PhieuNhapKho> PhieuNhapKhos { get; set; }

    public virtual DbSet<PhuongPhapPha> PhuongPhapPhas { get; set; }

    public virtual DbSet<RefreshToken> RefreshTokens { get; set; }

    public virtual DbSet<SanPham> SanPhams { get; set; }

    public virtual DbSet<ThanhToan> ThanhToans { get; set; }

    public virtual DbSet<VanChuyen> VanChuyens { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Server=CẢNHHIỆP273;Database=FarmtoCup;Trusted_Connection=True;TrustServerCertificate=True");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<AnhSanPham>(entity =>
        {
            entity.HasKey(e => e.MaAnhSanPham).HasName("PK__AnhSanPh__B2213736CA9741F1");

            entity.Property(e => e.LaAnhChinh).HasDefaultValue(false);
            entity.Property(e => e.ThuTu).HasDefaultValue(1);

            entity.HasOne(d => d.MaSanPhamNavigation).WithMany(p => p.AnhSanPhams)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_AnhSanPham_SanPham");
        });

        modelBuilder.Entity<CauHoiQuiz>(entity =>
        {
            entity.HasKey(e => e.MaCauHoi).HasName("PK__CauHoiQu__1937D77B98F6C620");
        });

        modelBuilder.Entity<ChiTietDonHang>(entity =>
        {
            entity.HasKey(e => e.MaChiTietDonHang).HasName("PK__ChiTietD__4B0B45DD806F2452");

            entity.Property(e => e.DangKyDinhKy).HasDefaultValue(false);

            entity.HasOne(d => d.MaDonHangNavigation).WithMany(p => p.ChiTietDonHangs)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__ChiTietDo__MaDon__5EBF139D");

            entity.HasOne(d => d.MaSanPhamNavigation).WithMany(p => p.ChiTietDonHangs)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__ChiTietDo__MaSan__5FB337D6");
        });

        modelBuilder.Entity<ChiTietGioHang>(entity =>
        {
            entity.HasKey(e => e.MaChiTietGioHang).HasName("PK__ChiTietG__BBF47498DEAD5722");

            entity.Property(e => e.DangKyDinhKy).HasDefaultValue(false);
            entity.Property(e => e.SoLuong).HasDefaultValue(1);

            entity.HasOne(d => d.MaGioHangNavigation).WithMany(p => p.ChiTietGioHangs)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__ChiTietGi__MaGio__534D60F1");

            entity.HasOne(d => d.MaSanPhamNavigation).WithMany(p => p.ChiTietGioHangs)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__ChiTietGi__MaSan__5441852A");
        });

        modelBuilder.Entity<ChiTietPhieuNhapKho>(entity =>
        {
            entity.HasKey(e => e.MaChiTietPhieuNhap).HasName("PK__ChiTietP__8908D2834D0052DA");

            entity.Property(e => e.DonViTinh).HasDefaultValue("kg");
            entity.Property(e => e.ThanhTien).HasComputedColumnSql("([SoLuong]*[DonGia])", true);

            entity.HasOne(d => d.MaPhieuNhapNavigation).WithMany(p => p.ChiTietPhieuNhapKhos)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ChiTietPhieuNhapKho_PhieuNhapKho");

            entity.HasOne(d => d.MaSanPhamNavigation).WithMany(p => p.ChiTietPhieuNhapKhos)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ChiTietPhieuNhapKho_SanPham");
        });

        modelBuilder.Entity<DanhGiaSanPham>(entity =>
        {
            entity.HasKey(e => e.MaDanhGia).HasName("PK__DanhGiaS__AA9515BFCF81EAA5");

            entity.Property(e => e.NgayDanhGia).HasDefaultValueSql("(getdate())");
            entity.Property(e => e.TrangThai).HasDefaultValue("Hiển thị");

            entity.HasOne(d => d.MaNguoiDungNavigation).WithMany(p => p.DanhGiaSanPhams)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_DanhGiaSanPham_NguoiDung");

            entity.HasOne(d => d.MaSanPhamNavigation).WithMany(p => p.DanhGiaSanPhams)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_DanhGiaSanPham_SanPham");
        });

        modelBuilder.Entity<DonHang>(entity =>
        {
            entity.HasKey(e => e.MaDonHang).HasName("PK__DonHang__129584AD748835A2");

            entity.Property(e => e.GiamGia).HasDefaultValue(0m);
            entity.Property(e => e.NgayDat).HasDefaultValueSql("(getdate())");
            entity.Property(e => e.PhiVanChuyen).HasDefaultValue(0m);
            entity.Property(e => e.TrangThaiDonHang).HasDefaultValue("ChoXacNhan");

            entity.HasOne(d => d.MaNguoiDungNavigation).WithMany(p => p.DonHangs)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__DonHang__MaNguoi__5AEE82B9");
        });

        modelBuilder.Entity<GioHang>(entity =>
        {
            entity.HasKey(e => e.MaGioHang).HasName("PK__GioHang__F5001DA3A0900C8E");

            entity.Property(e => e.NgayTao).HasDefaultValueSql("(getdate())");

            entity.HasOne(d => d.MaNguoiDungNavigation).WithMany(p => p.GioHangs)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__GioHang__MaNguoi__4E88ABD4");
        });

        modelBuilder.Entity<HuongVi>(entity =>
        {
            entity.HasKey(e => e.MaHuongVi).HasName("PK__HuongVi__953BE5AD2F427C56");
        });

        modelBuilder.Entity<LichSuTrangThaiDonHang>(entity =>
        {
            entity.HasKey(e => e.MaLichSu).HasName("PK__LichSuTr__C443222A914C398A");

            entity.Property(e => e.ThoiGianCapNhat).HasDefaultValueSql("(getdate())");

            entity.HasOne(d => d.MaDonHangNavigation).WithMany(p => p.LichSuTrangThaiDonHangs)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_LichSuTrangThaiDonHang_DonHang");

            entity.HasOne(d => d.MaNguoiCapNhatNavigation).WithMany(p => p.LichSuTrangThaiDonHangs).HasConstraintName("FK_LichSuTrangThaiDonHang_NguoiDung");
        });

        modelBuilder.Entity<LoHang>(entity =>
        {
            entity.HasKey(e => e.MaLoHang).HasName("PK__LoHang__E81C10B27BAA97F2");

            entity.Property(e => e.DonViTinh).HasDefaultValue("kg");
            entity.Property(e => e.NgayNhap).HasDefaultValueSql("(getdate())");
            entity.Property(e => e.TrangThai).HasDefaultValue("Còn hàng");

            entity.HasOne(d => d.MaNhaCungCapNavigation).WithMany(p => p.LoHangs).HasConstraintName("FK_LoHang_NhaCungCap");

            entity.HasOne(d => d.MaSanPhamNavigation).WithMany(p => p.LoHangs)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_LoHang_SanPham");
        });

        modelBuilder.Entity<LuaChonQuiz>(entity =>
        {
            entity.HasKey(e => e.MaLuaChon).HasName("PK__LuaChonQ__99B0F9F8402DCE58");

            entity.HasOne(d => d.MaCauHoiNavigation).WithMany(p => p.LuaChonQuizzes)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__LuaChonQu__MaCau__6477ECF3");
        });

        modelBuilder.Entity<NguoiDung>(entity =>
        {
            entity.HasKey(e => e.MaNguoiDung).HasName("PK__NguoiDun__C539D7626D7817A0");

            entity.Property(e => e.NgayTao).HasDefaultValueSql("(getdate())");
            entity.Property(e => e.TrangThai).HasDefaultValue(true);
            entity.Property(e => e.VaiTro).HasDefaultValue("KhachHang");
        });

        modelBuilder.Entity<NhaCungCap>(entity =>
        {
            entity.HasKey(e => e.MaNhaCungCap).HasName("PK__NhaCungC__53DA9205275F726C");

            entity.Property(e => e.NgayTao).HasDefaultValueSql("(getdate())");
            entity.Property(e => e.TrangThai).HasDefaultValue("Hoạt động");
        });

        modelBuilder.Entity<PhieuNhapKho>(entity =>
        {
            entity.HasKey(e => e.MaPhieuNhap).HasName("PK__PhieuNha__1470EF3B9417C48B");

            entity.Property(e => e.NgayNhap).HasDefaultValueSql("(getdate())");
            entity.Property(e => e.TongTien).HasDefaultValue(0m);
            entity.Property(e => e.TrangThai).HasDefaultValue("Đã nhập");

            entity.HasOne(d => d.MaNguoiTaoNavigation).WithMany(p => p.PhieuNhapKhos).HasConstraintName("FK_PhieuNhapKho_NguoiDung");

            entity.HasOne(d => d.MaNhaCungCapNavigation).WithMany(p => p.PhieuNhapKhos).HasConstraintName("FK_PhieuNhapKho_NhaCungCap");
        });

        modelBuilder.Entity<PhuongPhapPha>(entity =>
        {
            entity.HasKey(e => e.MaPhuongPhap).HasName("PK__PhuongPh__DD2AA8305B074BD9");
        });

        modelBuilder.Entity<RefreshToken>(entity =>
        {
            entity.HasKey(e => e.MaRefreshToken).HasName("PK__RefreshT__1FEA46E8EFCD111B");

            entity.Property(e => e.DaThuHoi).HasDefaultValue(false);
            entity.Property(e => e.NgayTao).HasDefaultValueSql("(getdate())");

            entity.HasOne(d => d.MaNguoiDungNavigation).WithMany(p => p.RefreshTokens)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_RefreshToken_NguoiDung");
        });

        modelBuilder.Entity<SanPham>(entity =>
        {
            entity.HasKey(e => e.MaSanPham).HasName("PK__SanPham__FAC7442DDBDBD043");

            entity.Property(e => e.NgayTao).HasDefaultValueSql("(getdate())");
            entity.Property(e => e.SoLuongTon).HasDefaultValue(0);
            entity.Property(e => e.TrangThai).HasDefaultValue(true);

            entity.HasMany(d => d.MaHuongVis).WithMany(p => p.MaSanPhams)
                .UsingEntity<Dictionary<string, object>>(
                    "SanPhamHuongVi",
                    r => r.HasOne<HuongVi>().WithMany()
                        .HasForeignKey("MaHuongVi")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("FK__SanPham_H__MaHuo__44FF419A"),
                    l => l.HasOne<SanPham>().WithMany()
                        .HasForeignKey("MaSanPham")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("FK__SanPham_H__MaSan__440B1D61"),
                    j =>
                    {
                        j.HasKey("MaSanPham", "MaHuongVi").HasName("PK__SanPham___3394FA77AD531BB8");
                        j.ToTable("SanPham_HuongVi");
                    });

            entity.HasMany(d => d.MaPhuongPhaps).WithMany(p => p.MaSanPhams)
                .UsingEntity<Dictionary<string, object>>(
                    "SanPhamPhuongPhapPha",
                    r => r.HasOne<PhuongPhapPha>().WithMany()
                        .HasForeignKey("MaPhuongPhap")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("FK__SanPham_P__MaPhu__4AB81AF0"),
                    l => l.HasOne<SanPham>().WithMany()
                        .HasForeignKey("MaSanPham")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("FK__SanPham_P__MaSan__49C3F6B7"),
                    j =>
                    {
                        j.HasKey("MaSanPham", "MaPhuongPhap").HasName("PK__SanPham___E715EEAEF81C8306");
                        j.ToTable("SanPham_PhuongPhapPha");
                    });
        });

        modelBuilder.Entity<ThanhToan>(entity =>
        {
            entity.HasKey(e => e.MaThanhToan).HasName("PK__ThanhToa__D4B258448D8AE833");

            entity.Property(e => e.TrangThaiThanhToan).HasDefaultValue("Chờ thanh toán");

            entity.HasOne(d => d.MaDonHangNavigation).WithMany(p => p.ThanhToans)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ThanhToan_DonHang");
        });

        modelBuilder.Entity<VanChuyen>(entity =>
        {
            entity.HasKey(e => e.MaVanChuyen).HasName("PK__VanChuye__4B22972DD9B1F88E");

            entity.Property(e => e.PhiVanChuyen).HasDefaultValue(0m);
            entity.Property(e => e.TrangThaiVanChuyen).HasDefaultValue("Chờ xử lý");

            entity.HasOne(d => d.MaDonHangNavigation).WithMany(p => p.VanChuyens)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_VanChuyen_DonHang");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
