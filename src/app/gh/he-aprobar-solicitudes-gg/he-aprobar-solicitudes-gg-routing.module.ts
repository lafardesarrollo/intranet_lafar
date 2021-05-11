import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HeAprobarSolicitudesGgComponent } from './he-aprobar-solicitudes-gg.component';

const routes: Routes = [
    {
        path: '',
        component: HeAprobarSolicitudesGgComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class HeAprobarSolicitudesGgRoutingModule {}
