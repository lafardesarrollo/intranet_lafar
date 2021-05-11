import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PpComponent } from './pp.component';

const routes: Routes = [
    {
        path: '',
        component: PpComponent,
        children: [
            { path: '', redirectTo: 'formthrproceso'},
            { path: 'formthrproceso', loadChildren: './formTHRProceso/formTHRProceso.module#FormTHRProcesoModule'},
            { path: 'repthrproceso', loadChildren: './repTHRProceso/repTHRProceso.module#RepTHRProcesoModule'}
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PpRoutingModule {}
