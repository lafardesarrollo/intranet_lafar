import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GlvComponent } from './glv.component';

const routes: Routes = [
    {
        path: '',
        component: GlvComponent,
        children: [
            { path: '', redirectTo: 'vacaciones' },
            { path: 'main', loadChildren: './solicitudesglv/solicitudesglv.module#SolicitudesglvModule' },
            { path: 'vacaciones', loadChildren: './vacaciones/vacaciones.module#VacacionesModule' }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class GlvRoutingModule {}
