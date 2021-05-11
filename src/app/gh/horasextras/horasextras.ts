export class HorasExtras {
    public id: string;
    public id_dependiente: string;
    public id_area: string;
    public fecha_inicio: string;
    public hora_inicio: string;
    public fecha_fin: string;
    public hora_fin: string;
    public id_turno: string;
    public refrigerio: Boolean;
    public pasajes: Boolean;
    public estado: string;
    public usuario_creacion: string;
    public fecha_creacion: string;
    public usuario_modificacion: string;
    public fecha_modificacion: string;
}


export class DependienteSupervisor {
    public id_dependiente: string;
    public nombre_dependiente: string;
    public nombre_cargo: string;
}

export class Turno {
    public id_turno: string;
    public turno: string;
    public estado_turno: string;
    public hora_inicio: string;
    public hora_fin: string;
}
