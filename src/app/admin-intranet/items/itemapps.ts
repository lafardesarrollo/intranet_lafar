export class RequestItemsAppsAsignado {
    public id_rol: number;
    public app_id: number;
}

export class ItemApps {
    public id: number;
    public url: string;
    public icon: string;
    public app_id: string;
    public itemName: string;
    public tipo: string;
    public id_mother: number;
    public asignado: Boolean;
    public items: Array<ItemApps>;
}

export class ItemTree {
    public nodeId: number;
    public nodeText: string;
    public nodeChild: Array<ItemChildrenTree>;
}

export class ItemChildrenTree {
    public nodeId: number;
    public nodeText: string;
}

export class ItemMother {
    public id: number;
    public itemName: string;
}


export class ItemAppsChildren {
    public url: string;
    public icon: string;
    public app_id: number;
    public itemName: string;
    public tipo: string;
    public id_mother: number;
    public usuario: string;
}
