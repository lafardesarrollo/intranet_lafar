import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddaccionesComponent } from './addacciones.component';

const routes: Routes = [
    {
        path: '', component: AddaccionesComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class AddaccionesRoutingModule {
}
