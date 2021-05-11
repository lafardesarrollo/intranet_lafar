import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccionesComponent } from './acciones.component';

const routes: Routes = [
    {
        path: '',
        component: AccionesComponent,
        children: [
            { path: '', redirectTo: 'add' },
            { path: 'add', loadChildren: './addacciones/addacciones.module#AddaccionesModule' }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AccionesRoutingModule {}
