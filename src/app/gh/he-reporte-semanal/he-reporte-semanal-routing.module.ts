import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HeReporteSemanalComponent } from './he-reporte-semanal.component';

const routes: Routes = [
    {
        path: '',
        component: HeReporteSemanalComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class HeReporteSemanalRoutingModule {}
