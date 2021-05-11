import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HeAprobarSolicitudesComponent } from './he-aprobar-solicitudes.component';

const routes: Routes = [
    {
        path: '',
        component: HeAprobarSolicitudesComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class HeAprobarSolicitudesRoutingModule {}
