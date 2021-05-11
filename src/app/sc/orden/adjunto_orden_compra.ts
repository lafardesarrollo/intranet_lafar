export class AdjuntoOrdenCompra {
    id: number;
    codigo_orden :string;
    id_tipo_compra_adjunto: number;
    url: string;
    estado: string;
}

export class TipoCompraAdjunto {
    id: number;
    id_tipo_compra: number;
    nombre_adjunto: string;
}