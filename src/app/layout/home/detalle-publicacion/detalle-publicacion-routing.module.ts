import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetallePublicacionComponent } from './detalle-publicacion.component';

const routes: Routes = [
    {
        path: ':name', component: DetallePublicacionComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class DetallePublicacionRoutingModule {
}
