import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SolicitudesglvComponent } from './solicitudesglv.component';

const routes: Routes = [
    {
        path: '', component: SolicitudesglvComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class SolicitudesglvRoutingModule {
}
