export class DetalleSolicitud {
    public id_detalle_solicitud: number;
    public codigo_solicitud: string;
    public codigo_item: string;
    public descripcion_item: string;
    public tipo_item: string;
    public fecha_requerida: Date;
    public fecha_arte: Date;
    public cantidad: number;
    public unidad: string;
    public prioridad: number;
    public estado: string;
    public almacen: string;

    public usuario_creacion: string;
    public fecha_creacion: Date;
    public usuario_modificacion: string;
    public fecha_modificacion: Date;
}

export class RequestUpdateDetalleSolicitud {
    public codigo_solicitud: string;
    public id_detalle_solicitud: number;
    public usuario_modificacion: string;
    public estado: string;
}
