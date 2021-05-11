import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GhComponent } from './gh.component';

const routes: Routes = [
    {
        path: '',
        component: GhComponent,
        children: [
            { path: '', redirectTo: 'solicitud' },
            { path: 'he', loadChildren: './horasextras/horasextras.module#HorasextrasModule' },
            { path: 'solicitud', loadChildren: './he-nueva-solicitud/he-nueva-solicitud.module#HeNuevaSolicitudModule' },
            { path: 'solicitudgh', loadChildren: './he-nueva-solicitudgh/he-nueva-solicitudgh.module#HeNuevaSolicitudghModule' },
            { path: 'solicitudes', loadChildren: './he-solicitudes/he-solicitudes.module#HeSolicitudesModule' },
            { path: 'lhe', loadChildren: './he-aprobar-solicitudes/he-aprobar-solicitudes.module#HeAprobarSolicitudesModule' },
            { path: 'lhegg', loadChildren: './he-aprobar-solicitudes-gg/he-aprobar-solicitudes-gg.module#HeAprobarSolicitudesGgModule' },
            { path: 'semanal', loadChildren: './he-reporte-semanal/he-reporte-semanal.module#HeReporteSemanalModule' },
            { path: 'mensual', loadChildren: './he-reporte-mensual/he-reporte-mensual.module#HeReporteMensualModule' }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class GhRoutingModule {}
