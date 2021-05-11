import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HeReporteMensualComponent } from './he-reporte-mensual.component';

const routes: Routes = [
    {
        path: '',
        component: HeReporteMensualComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class HeReporteMensualRoutingModule {}
