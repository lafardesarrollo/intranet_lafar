export class RequestReporteSemanal{
    public FechaDesde: Date;
    public FechaHasta: Date;
    public AreaTrabajo: number;
}

export class ReporteSemanal {
    public FechaHoraExtra: Date;
    public NombreEmpleado: string;
    public Turno: string;
    public Area: string;
    public Actividad: string;
    public AclaracionTurno: string;
    public TotalCantidadHoras: number;
    public TotalCosto: number;
    public Estado: string;
    public EstadoDetalle: string;
}