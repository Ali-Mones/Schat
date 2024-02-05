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

            entity.HasIndex(e => e.NormalizedEmail, "EmailIndex");

            entity.HasIndex(e => e.NormalizedUserName, "UserNameIndex")
                .IsUnique()
                .HasFilter("([NormalizedUserName] IS NOT NULL)");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Email).HasMaxLength(256);
            entity.Property(e => e.FirstName)
                .HasMaxLength(255)
                .HasDefaultValue("")
                .HasColumnName("first_name");
            entity.Property(e => e.LastName)
                .HasMaxLength(255)
                .HasDefaultValue("")
                .HasColumnName("last_name");
            entity.Property(e => e.Nationality).HasDefaultValue("");
            entity.Property(e => e.NormalizedEmail).HasMaxLength(256);
            entity.Property(e => e.NormalizedUserName).HasMaxLength(256);
            entity.Property(e => e.UserName).HasMaxLength(256);

            entity.HasMany(d => d.User1s).WithMany(p => p.User2s)
                .UsingEntity<Dictionary<string, object>>(
                    "Friendship",
                    r => r.HasOne<User>().WithMany()
                        .HasForeignKey("User1")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("FK__friendship__user1"),
                    l => l.HasOne<User>().WithMany()
                        .HasForeignKey("User2")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("FK__friendship__user2"),
                    j =>
                    {
                        j.HasKey("User1", "User2").HasName("PK__friendsh__3213E83F3A3C3F6F");
                        j.ToTable("friendship", "schat");
                        j.IndexerProperty<int>("User1").HasColumnName("user1");
                        j.IndexerProperty<int>("User2").HasColumnName("user2");
                    });

            entity.HasMany(d => d.User2s).WithMany(p => p.User1s)
                .UsingEntity<Dictionary<string, object>>(
                    "Friendship",
                    r => r.HasOne<User>().WithMany()
                        .HasForeignKey("User2")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("FK__friendship__user2"),
                    l => l.HasOne<User>().WithMany()
                        .HasForeignKey("User1")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("FK__friendship__user1"),
                    j =>
                    {
                        j.HasKey("User1", "User2").HasName("PK__friendsh__3213E83F3A3C3F6F");
                        j.ToTable("friendship", "schat");
                        j.IndexerProperty<int>("User1").HasColumnName("user1");
                        j.IndexerProperty<int>("User2").HasColumnName("user2");
                    });
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
