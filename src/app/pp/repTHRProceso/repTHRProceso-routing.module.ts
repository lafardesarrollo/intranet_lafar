import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RepTHRProcesoComponent } from './repTHRProceso.component';

const routes: Routes = [
    {
        path: '',
        component: RepTHRProcesoComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RepTHRProcesoRoutingModule {}
