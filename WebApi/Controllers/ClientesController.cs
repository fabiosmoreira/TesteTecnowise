using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApi.Models;

namespace WebApi.Controllers
{
    [Produces("application/json")]
    [Route("api/Clientes")]
    public class ClientesController : Controller
    {
        private readonly ClienteContext _context;

        public ClientesController(ClienteContext context)
        {
            _context = context;
        }

        // GET: api/Clientes
        /// <summary>
        /// Buscar dados de todos os clientes cadastrados.
        /// </summary>
        /// <returns>Uma lista com dados de todos os clientes.</returns>
        [HttpGet]
        public IEnumerable<Cliente> GetCliente()
        {
            return _context.Cliente;
        }

        // GET: api/Clientes/5
        /// <summary>
        /// Buscar dados de um cliente especifico, passando o Id.
        /// </summary>
        /// <param name="id">Id do cliente no banco de dados.</param>
        /// <returns>Um objeto com dados do cliente</returns>
        [HttpGet("{id}")]
        public async Task<IActionResult> GetCliente([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var cliente = await _context.Cliente.SingleOrDefaultAsync(m => m.Id == id);

            if (cliente == null)
            {
                return NotFound();
            }

            return Ok(cliente);
        }

        /// <summary>
        /// Atualizar dados de um determinado cliente.
        /// </summary>
        /// <param name="id">Id do cliente a ser atualizado.</param>
        /// <param name="cliente">Dados novos para serem atualizados.</param>
        /// <returns>Um objeto Microsoft.AspNetCore.Mvc.NoContentResult.</returns>
        // PUT: api/Clientes/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCliente([FromRoute] int id, [FromBody] Cliente cliente)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != cliente.Id)
            {
                return BadRequest();
            }

            _context.Entry(cliente).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ClienteExists(id))
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

        // POST: api/Clientes
        /// <summary>
        /// Cadastrar um novo cliente no banco de dados.
        /// </summary>
        /// <param name="cliente">Dados do cliente.</param>
        /// <returns>Um objeto Microsoft.AspNetCore.Mvc.CreatedAtActionResult.</returns>
        [HttpPost]
        public async Task<IActionResult> PostCliente([FromBody] Cliente cliente)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Cliente.Add(cliente);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCliente", new { id = cliente.Id }, cliente);
        }

        // DELETE: api/Clientes/5
        /// <summary>
        /// Excluir um determinado cliente do banco de dados.
        /// </summary>
        /// <param name="id">Id do cliente a ser excluido.</param>
        /// <returns></returns>
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCliente([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var cliente = await _context.Cliente.SingleOrDefaultAsync(m => m.Id == id);
            if (cliente == null)
            {
                return NotFound();
            }

            _context.Cliente.Remove(cliente);
            await _context.SaveChangesAsync();

            return Ok(cliente);
        }

        private bool ClienteExists(int id)
        {
            return _context.Cliente.Any(e => e.Id == id);
        }
    }
}