import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetallevismedComponent } from './detallevismed.component';

const routes: Routes = [
    {
        path: '', component: DetallevismedComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class DetallevismedRoutingModule {
}
