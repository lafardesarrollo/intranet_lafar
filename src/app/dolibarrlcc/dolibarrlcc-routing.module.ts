import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DolibarrlccComponent } from './dolibarrlcc.component';

const routes: Routes = [
    {
        path: '',
        component: DolibarrlccComponent,
        children: [
            { path: '', redirectTo: 'add' },
            { path: 'add', loadChildren: './maindolibarrlcc/maindolibarrlcc.module#MaindolibarrlccModule' }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DolibarrlccRoutingModule {}
