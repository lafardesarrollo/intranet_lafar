import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HeNuevaSolicitudghComponent } from './he-nueva-solicitudgh.component';

const routes: Routes = [
    {
        path: '',
        component: HeNuevaSolicitudghComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class HeNuevaSolicitudghRoutingModule {}
