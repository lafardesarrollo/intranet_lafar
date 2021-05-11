export class HoraExtra {
    public Id: number;
    public IdSolicitudHoraExtra: number;
    public CodigoSap: number;
    public NombreEmpleado: string;
    public TipoHoraExtra: number;
    public IdTurno: number;
    public Turno: string;
    public ActividadRealizada: string;
    public AclaracionTurno: string;
    public NumeroHoras: number;
    public Costo: number;
    public NombreTipoHoraExtra: string;
    public Sexo: string;
}

export class SolicitudHoraExtra {
    public Id: number;
    public FechaSolicitud: Date;
    public Solicitante: string;
    public AreaTrabajo: number;
    public TipoHoraExtra: number;
    public CostoTotal: number;
    public FechaCreacionSolicitud: Date;
    public Estado: string;
    public NombreArea: string;
    public NombreTipoHoraExtra: string;
    public Lcc: string;
    public Mantenimiento: string;
    public Empleados: Array<HoraExtra>;
}