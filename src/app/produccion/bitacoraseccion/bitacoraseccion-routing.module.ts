import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BitacoraseccionComponent } from './bitacoraseccion.component';

const routes: Routes = [
    {
        path: '', component: BitacoraseccionComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class BitacoraseccionRoutingModule {
}
