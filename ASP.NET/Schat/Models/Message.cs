using System.Text.Json.Serialization;

namespace Schat.Models;

public partial class Message
{
	[JsonIgnore]
	public int Id { get; set; }

	public string Text { get; set; } = null!;

	public DateTime Date { get; set; }

	public int From { get; set; }

	public int To { get; set; }

	[JsonIgnore]
	public virtual User? FromNavigation { get; set; } = null;

	[JsonIgnore]
	public virtual User? ToNavigation { get; set; } = null;
}
