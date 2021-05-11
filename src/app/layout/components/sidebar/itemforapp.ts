export class ItemForApp {
    app_id: string;

    constructor(app_id: string) {
        this.app_id = app_id;
    }
}

export class RequestUserRol {
    public username: string;
    public id_app: string;
}

