export class Rol {
    public id_rol: number;
    public nombre_rol: string;
    public codigo_app: string;
    public descripcion: string;
}


export class UserRol {
    public id: number;
    public username: string;
    public id_rol: number;
}
