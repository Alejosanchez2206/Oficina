using Microsoft.EntityFrameworkCore;
using DigiTurno.Models; // Asegúrate de usar el espacio de nombres correcto para tus modelos

// En ApplicationDbContext.cs
namespace DigiTurno.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<Turno> Turnos { get; set; }
    }
}


