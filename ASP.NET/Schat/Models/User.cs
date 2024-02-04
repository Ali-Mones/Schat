using Microsoft.AspNetCore.Identity;
using System.Text.Json.Serialization;

namespace Schat.Models;

public partial class User : IdentityUser<int>
{
    public override int Id { get; set; }
    public string FirstName { get; set; } = null!;
    public string LastName { get; set; } = null!;

    public DateOnly BirthDate { get; set; } = new DateOnly();
    public string Nationality { get; set; } = null!;
    public Gender Gender { get; set; }

    [JsonIgnore]
    public virtual ICollection<Message>? MessageFromNavigations { get; set; } = new List<Message>();

    [JsonIgnore]
    public virtual ICollection<Message>? MessageToNavigations { get; set; } = new List<Message>();
}
