import { Injectable } from '@angular/core';
import { Users } from './admin-intranet/users/users';

@Injectable()
export class Globals {
    user: Users = new Users();

    // urlServidor: string = 'http://192.168.1.235/';

    // urlIntranet: string = 'http://192.168.1.235/lafarnet/';
    // urlAPI: string = 'http://192.168.1.235/newApiLafarnet/public/';
    // // urlAPICORE: string = 'http://192.168.1.230/lafarnetservice/api/';
    // urlSAP: string = 'http://190.104.26.90:8082/apisap/api/'; // Url para Escribir en el SAP
    // urlAPISmartsheet: string = 'http://190.104.26.90:8082/apismartsheet/api/'; // Url para Escribir en el SAP
    // // urlAPISmartsheet: string = 'http://localhost:52584/api/';
    // // urlAPICORE: string = 'http://localhost/lafarnetservice/api/';
    // urlAPICORE: string = 'http://190.104.26.90:8082/lafarnetserviceu/api/';
    // // urlAPICORE: string = 'http://localhost:1925/api/';
    // urlAPISAP: string = 'http://190.104.26.90:8082/apilafarnet/api/';
    // // urlAPISAP: string = 'http://192.168.1.230/apilafarnet/api/';
    // urlImagenesPersonal: string = 'http://192.168.1.235/newApiLafarnet/assets/imagenes_users/';
    // urlImagenesFirmas: string = 'http://192.168.1.235/newApiLafarnet/assets/imagenes_firmas/';
    // urlPublicaciones: string = 'http://192.168.1.235/newApiLafarnet/assets/publicaciones_images/';
    
    urlServidor: string = 'http://intranet.lafar.net/';
    urlLafarDocs: string = 'http://190.104.26.91/';
    
    urlIntranet: string = 'http://intranet.lafar.net/lafarnet/';
    urlAPI: string = 'http://intranet.lafar.net/newApiLafarnet/public/';

    // urlSAP: string = 'http://190.104.26.90:8082/apisap/api/'; // Url para Escribir en el SAP
    urlSAP: string = 'http://localhost:64111/api/'; // Url para Escribir en el SAP

    urlAPISmartsheet: string = 'http://190.104.26.91/apismartsheet/api/'; // Url para Escribir en el SAP
    // urlAPISmartsheet: string = 'http://localhost:52584/api/';
    // urlAPICORE: string = 'http://localhost/lafarnetservice/api/';
    urlAPICORE: string = 'http://190.104.26.90:8082/lafarnetserviceu/api/';
    // urlAPICORE: string = 'http://localhost:1925/api/';
    urlAPISAP: string = 'http://190.104.26.91/apilafarnetnv/api/';
    // urlAPISAP: string = 'http://192.168.1.230/apilafarnet/api/';
    urlIntranetLCC: string = 'http://intranet.lafar.net/lcc/#';

    urlImagenesPersonal: string = 'http://intranet.lafar.net/newApiLafarnet/assets/imagenes_users/';
    urlImagenesFirmas: string = 'http://intranet.lafar.net/newApiLafarnet/assets/imagenes_firmas/';
    urlPublicaciones: string = 'http://intranet.lafar.net/newApiLafarnet/assets/publicaciones_images/';

/*
    urlIntranet: string = 'http://localhost:8080/lafarnet/';
    urlAPI: string = 'http://localhost:8080/newApiLafarnet/public/';
    // urlAPICORE: string = 'http://192.168.1.230/lafarnetservice/api/';
    urlAPICORE: string = 'http://localhost:1925/api/';
    // urlSAP: string = 'http://localhost:64111/api/'; // Url para Escribir en el SAP
    urlSAP: string = 'http://190.104.26.90:8082/apisap/api/'; // Url para Escribir en el SAP
    // urlAPICORE: string = 'http://192.168.2.58/lafarnetservice/api/';
    // urlAPICORE: string = 'http://190.104.26.90:8082/lafarnetservice/api/';
    urlAPISAP: string = 'http://190.104.26.90:8082/apilafarnet/api/';
    urlImagenesPersonal: string = 'http://localhost:8080/newApiLafarnet/assets/imagenes_users/';
    urlImagenesFirmas: string = 'http://localhost:8080/newApiLafarnet/assets/imagenes_firmas/';
    urlPublicaciones: string = 'http://localhost:8080/newApiLafarnet/assets/publicaciones_images/';
*/
/*
    urlIntranet: string = 'http://192.168.1.220/lafarnet/';
    urlAPI: string = 'http://192.168.1.220/newApiLafarnet/public/';
    urlSAP: string = 'http://190.104.26.90:8082/apisap/api/'; // Url para Escribir en el SAP
    urlAPICORE: string = 'http://190.104.26.90:8082/lafarnetservice/api/';
    urlAPISAP: string = 'http://190.104.26.90:8082/apilafarnet/api/';
    urlImagenesPersonal: string = 'http://192.168.1.220/newApiLafarnet/assets/imagenes_users/';
    urlImagenesFirmas: string = 'http://192.168.1.220/newApiLafarnet/assets/imagenes_firmas/';
    urlPublicaciones: string = 'http://192.168.1.220/newApiLafarnet/assets/publicaciones_images/';
*/
/*
    urlIntranet: string = 'http://192.168.2.58:8080/lafarnet/';
    urlAPI: string = 'http://192.168.2.58:8080/newApiLafarnet/public/';
    // urlAPICORE: string = 'http://192.168.1.230/lafarnetservice/api/';
    urlAPICORE: string = 'http://localhost:1925/api/';
    // urlAPICORE: string = 'http://192.168.2.58/lafarnetservice/api/';
    // urlSAP: string = 'http://localhost:64111/api/'; // Url para Escribir en el SAP
    urlSAP: string = 'http://192.168.2.58/apisap/api/'; // Url para Escribir en el SAP
    // urlAPICORE: string = 'http://190.104.26.90:8082/lafarnetservice/api/';
    urlAPISAP: string = 'http://190.104.26.90:8082/apisap/api/';
    // urlAPISAP: string = 'http://192.168.1.230/apilafarnet/api/';
    // urlAPISAP: string = 'http://localhost:3607/api/';
    urlImagenesPersonal: string = 'http://192.168.2.58:8080/newApiLafarnet/assets/imagenes_users/';
    urlImagenesFirmas: string = 'http://192.168.2.58:8080/newApiLafarnet/assets/imagenes_firmas/';
    urlPublicaciones: string = 'http://192.168.2.58:8080/newApiLafarnet/assets/publicaciones_images/';
*/
    urlImagesDocs: string = 'assets/images/notices/';
    urlImagenUserDefault: string = 'assets/images/usuario.jpg';
    urlImagenFirmaDefault: string = 'assets/images/firmas.jpg';

}


