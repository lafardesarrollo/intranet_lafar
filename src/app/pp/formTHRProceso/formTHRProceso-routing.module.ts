import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormTHRProcesoComponent } from './formTHRProceso.component';

const routes: Routes = [
    {
        path: '',
        component: FormTHRProcesoComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class FormTHRProcesoRoutingModule {}
