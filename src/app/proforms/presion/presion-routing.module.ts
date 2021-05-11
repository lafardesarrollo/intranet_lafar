import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PresionComponent } from './presion.component';


const routes: Routes = [
    {
        path: '', component: PresionComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class PresionRoutingModule {
}
