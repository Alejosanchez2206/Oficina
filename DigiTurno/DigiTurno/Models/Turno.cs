namespace DigiTurno.Models
{
    public class Turno
    {
        public int Id { get; set; }
        public required string TipoDocumento { get; set; }
        public required string Especialidad { get; set; }
        public long NumeroDocumento { get; set; }
    }

}
