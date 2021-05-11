export class Monitoreothrproceso {
    public id_monitoreo_thr_proceso: number;
    public id_seccion: number;
    public id_etapa: number;
    public lote: string;
    public codigo_producto: string;
    public nombre_producto: string;
    public hora: string;
    public fecha: string;
    public temperatura_original: number;
    public humedad_relativa_original: number;
    public temperatura_corregido: number;
    public humedad_relativa_corregido: number;
    public higroscopico: Boolean = false;
    public username: string;
    public estado: string;
    public usuario_creacion: string;
    public fecha_creacion: string;
    public usuario_modificacion: string;
    public fecha_modificacion: string;
}
