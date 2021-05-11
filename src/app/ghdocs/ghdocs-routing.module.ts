import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GhdocsComponent } from './ghdocs.component';


const routes: Routes = [
    {
        path: '',
        component: GhdocsComponent,
        children: [
            { path: '', redirectTo: 'add' },
            { path: 'add', loadChildren: './documentaciongh/documentaciongh.module#DocumentacionghModule' }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class GhdocsRoutingModule {}
