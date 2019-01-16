using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace WebApi.Models
{
    public class Cliente
    {
        public int Id { get; set; }
        [Required]
        public string Nome { get; set; }

        public string Endereco { get; set; }

        public string Telefone { get; set; }
        [Required]
        public string Email { get; set; }
    }
}
