import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: '', redirectTo: 'home' },
            { path: 'home', loadChildren: 'app/layout/home/home.module#HomeModule'},
            { path: 'calendario', loadChildren: 'app/layout/calendario/calendario.module#CalendarioModule'},
            { path: 'micuenta', loadChildren: 'app/layout/micuenta/micuenta.module#MiCuentaModule'}
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule {}
