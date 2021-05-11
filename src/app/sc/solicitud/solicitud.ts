export class SolicitudCompra {
    public id: number;
    public codigo: string;
    public tipo: string;
    public estado: string;
    public estado_transferencia: string;
    public fecha: Date;
    public motivo: string;
    public usuario_anulacion: string;
    public motivo_anulacion: string;
    public fecha_anulacion: Date;
    public solicitante: string;
    public autorizador: string;
    public estado_autorizacion_superior: string;
    public fecha_autorizacion_superior: Date;
    public motivo_autorizacion: string;
    public tipo_compra: string;
    public codigo_proveedor: string;
    public nombre_proveedor: string;

    public adjuntos: string[];

    public usuario_creacion: string;
    public fecha_creacion: Date;
    public usuario_modificacion: string;
    public fecha_modificacion: Date;

    public departamento_compra: string;
}


export class Solicitudcompralistado {
    public codigo: string;
    public conversacion: number;
    public tipo: string;
    public fecha: Date;
    public motivo: string;
    public estado_autorizacion_superior: string;
    public estado: string;
    public solicitante: string;
    public nombre_solicitante: string;
    public completada: number;
}

export class RequestAnulacionSolicitud {
    public codigo_solicitud: string;
    public motivo_anulacion: string;
    public usuario_anulacion: string;
}

export class RequestAutorizacionSolicitud {
    public codigo_solicitud: string;
    public motivo_autorizacion_superior: string;
    public estado_autorizacion: string;
    public autorizador: string;
}

export class RequestCerrarSolicitud {
    public codigo_solicitud: string;
    public usuario_creacion: string;
}

export class RequestEstadoAutorizador {
    public id_superior: string;
    public estado_autorizacion: string;
}

export class RequestFechaArte {
    public codigo_producto: string;
    public codigo_proveedor: string;
}

export class FechaArte {
    public Code: string;
    public U_u_codprov: string;
    public U_u_fechaarte: Date;
}
