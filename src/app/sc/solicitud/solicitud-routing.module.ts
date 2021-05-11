import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SolicitudComponent } from './solicitud.component';

const routes: Routes = [
    {
        path: '',
        component: SolicitudComponent,
        children: [
            { path: '', redirectTo: 'add' },
            { path: 'add', loadChildren: './addsc/addsc.module#AddscModule' },
            { path: 'list', loadChildren: './listsc/listsc.module#ListscModule' },
            { path: 'detail/:id', loadChildren: './detailsc/detailsc.module#DetailscModule' },
            { path: 'list_aut', loadChildren: './listscsup/listscsup.module#ListscsupModule' },
            { path: 'detailsup/:id', loadChildren: './detailscsup/detailscsup.module#DetailscsupModule' },
            { path: 'detailabas/:id', loadChildren: './detailscabas/detailscabas.module#DetailscabasModule' },
            { path: 'list_abast', loadChildren: './listscabas/listscabas.module#ListscabasModule' },
            { path: 'notify/:id', loadChildren: './notifysc/notifysc.module#NotifyscModule' }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SolicitudRoutingModule {}
