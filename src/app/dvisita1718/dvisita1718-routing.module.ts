import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Dvisita1718Component } from './dvisita1718.component';

const routes: Routes = [
    {
        path: '',
        component: Dvisita1718Component,
        children: [
            { path: '', redirectTo: 'add' },
            { path: 'add', loadChildren: './muestrasdvisita/muestrasdvisita.module#MuestrasdvisitaModule' }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class Dvisita1718RoutingModule {}
