export class DetalleOrden {
    public id_detalle_solicitud: number;
    public codigo_solicitud: string;
    public codigo_orden: string;
    public codigo_item: string;
    public descripcion_item: string;
    public tipo_item: string;
    public fecha_arte: Date;
    public fecha_requerida: Date;
    public cantidad: number;
    public unidad: string;
    public precio_unitario: number;
    public sub_total: number;
    public estado: string;
    public prioridad: number;
    public almacen: string;

    public usuario_creacion: string;
    public usuario_modificacion: string;
}
