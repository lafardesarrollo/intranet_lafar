import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddmantenimientoComponent } from './addmantenimiento.component';

const routes: Routes = [
    {
        path: '', component: AddmantenimientoComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class AddmantenimientoRoutingModule {
}
