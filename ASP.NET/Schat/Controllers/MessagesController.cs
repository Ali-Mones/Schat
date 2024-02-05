using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Schat.Models;

namespace Schat.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [AllowAnonymous]
    public class MessagesController : ControllerBase
    {
        private readonly SchatContext _context;

        public MessagesController(SchatContext context)
        {
            _context = context;
        }

        // GET: api/Messages
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Message>>> GetMessages()
        {
            //_context.UserClaims.Find(1);
            return await _context.Messages.OrderBy(m => m.Date).ToListAsync();
        }

        // GET: api/Messages/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Message>> GetMessage(int id)
        {
            var message = await _context.Messages.FindAsync(id);

            if (message == null)
            {
                return NotFound();
            }

            return message;
        }

        [HttpGet("to/{id}")]
        public async Task<ActionResult<IEnumerable<Message>>> GetMessagesTo(int id)
        {
            return await _context.Messages.Where(m => m.To == id).OrderBy(m => m.Date).ToListAsync();
        }

        [HttpGet("from/{id}")]
        public async Task<ActionResult<IEnumerable<Message>>> GetMessagesFrom(int id)
        {
            return await _context.Messages.Where(m => m.From == id).OrderBy(m => m.Date).ToListAsync();
        }

        [HttpGet("from/{from}/to/{to}")]
        public async Task<ActionResult<IEnumerable<Message>>> GetMessagesFromTo(int from, int to)
        {
            return await _context.Messages.Where(m => m.From == from && m.To == to).OrderBy(m => m.Date).ToListAsync();
        }

        [HttpGet("between/{user1}/{user2}")]
        public async Task<ActionResult<IEnumerable<Message>>> GetMessagesBetween(int user1, int user2)
        {
            return await _context.Messages.Where(m => m.From == user1 && m.To == user2 || m.From == user2 && m.To == user1).OrderBy(m => m.Date).ToListAsync();
        }

        // PUT: api/Messages/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutMessage(int id, Message message)
        {
            if (id != message.Id)
            {
                return BadRequest();
            }

            _context.Entry(message).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MessageExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Messages
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Message>> PostMessage(Message message)
        {
            if (_context.Users.Find(message.From) == null || _context.Users.Find(message.To) == null)
            {
                return NotFound();
            }

            message.Id = 0;

            _context.Messages.Add(message);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetMessage", new { id = message.Id }, message);
        }

        // DELETE: api/Messages/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMessage(int id)
        {
            var message = await _context.Messages.FindAsync(id);
            if (message == null)
            {
                return NotFound();
            }

            _context.Messages.Remove(message);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool MessageExists(int id)
        {
            return _context.Messages.Any(e => e.Id == id);
        }
    }
}
