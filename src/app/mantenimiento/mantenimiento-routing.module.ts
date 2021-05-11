import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MantenimientoComponent } from './mantenimiento.component';

const routes: Routes = [
    {
        path: '',
        component: MantenimientoComponent,
        children: [
            { path: '', redirectTo: 'add' },
            { path: 'add', loadChildren: './addmantenimiento/addmantenimiento.module#AddmantenimientoModule' }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MantenimientoRoutingModule {}
