import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ScComponent } from './sc.component';

const routes: Routes = [
    {
        path: '',
        component: ScComponent,
        children: [
            { path: '', redirectTo: 'main' },
            { path: 'main', loadChildren: './mainsc/mainsc.module#MainscModule' },
            { path: 'solicitud', loadChildren: './solicitud/solicitud.module#SolicitudModule' },
            { path: 'orden', loadChildren: './orden/orden.module#OrdenModule' }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ScRoutingModule {}
