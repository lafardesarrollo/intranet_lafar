import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddaccidentesComponent } from './addaccidentes.component';


const routes: Routes = [
    {
        path: '', component: AddaccidentesComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class AddaccidentesRoutingModule {
}
