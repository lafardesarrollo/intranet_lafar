import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HeSolicitudesComponent } from './he-solicitudes.component';

const routes: Routes = [
    {
        path: '',
        component: HeSolicitudesComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class HeSolicitudesRoutingModule {}
