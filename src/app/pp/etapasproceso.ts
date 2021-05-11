export class Etapasproceso {
    public id_etapa_proceso: number;
    public id_proceso: number;
    public id_area: number;
    public nombre_etapa: string;
    public estado: string;
    public usuario_creacion: string;
    public fecha_creacion: string;
    public usuario_modificacion: string;
    public fecha_modificacion: string;
}

export class EtapasForLote {
    public lote: string;
    public codigo_producto: string;
    public nombre_producto:string;
    public nombre_etapa:string;
}

export class EtapasForLoteAll {
    public id_monitoreo_proceso: string;
    public lote: string;
    public codigo_producto:string;
    public id_etapa_proceso:string;
    public id_proceso: string;
    public nombre_etapa: string;
    public fecha:string;
    public hora:string;
    public temperatura:string;
    public humedad_relativa:string;
}
