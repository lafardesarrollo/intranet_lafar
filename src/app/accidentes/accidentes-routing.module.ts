import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccidentesComponent } from './accidentes.component';

const routes: Routes = [
    {
        path: '',
        component: AccidentesComponent,
        children: [
            { path: '', redirectTo: 'add' },
            { path: 'add', loadChildren: './addaccidentes/addaccidentes.module#AddaccidentesModule' }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AccidentesRoutingModule {}
