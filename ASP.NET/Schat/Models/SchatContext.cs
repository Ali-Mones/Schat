using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Schat.Models;

public partial class SchatContext : IdentityDbContext<User, IdentityRole<int>, int>
{
    public SchatContext()
    {
    }

    public SchatContext(DbContextOptions<SchatContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Message> Messages { get; set; }
    public virtual DbSet<User> Users { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Server=DESKTOP-U4VVTBN;Database=schat;Integrated Security=True;TrustServerCertificate=True");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<Message>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__message__3213E83F9345AA1A");

            entity.ToTable("message", "schat");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Date)
                .HasColumnType("datetime")
                .HasColumnName("date");
            entity.Property(e => e.From).HasColumnName("from");
            entity.Property(e => e.Text)
                .HasMaxLength(255)
                .HasColumnName("text");
            entity.Property(e => e.To).HasColumnName("to");

            entity.HasOne(d => d.FromNavigation).WithMany(p => p.MessageFromNavigations)
                .HasForeignKey(d => d.From)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__message__from__09A971A2");

            entity.HasOne(d => d.ToNavigation).WithMany(p => p.MessageToNavigations)
                .HasForeignKey(d => d.To)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__message__to__0A9D95DB");
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__user__3213E83F6EC9DBD4");

            entity.ToTable("user", "schat");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.FirstName)
                .HasMaxLength(255)
                .HasColumnName("first_name");
            entity.Property(e => e.LastName)
                .HasMaxLength(255)
                .HasColumnName("last_name");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
