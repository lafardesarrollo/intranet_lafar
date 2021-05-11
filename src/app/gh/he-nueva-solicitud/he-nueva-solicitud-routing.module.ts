import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HeNuevaSolicitudComponent } from './he-nueva-solicitud.component';

const routes: Routes = [
    {
        path: '',
        component: HeNuevaSolicitudComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class HeNuevaSolicitudRoutingModule {}
