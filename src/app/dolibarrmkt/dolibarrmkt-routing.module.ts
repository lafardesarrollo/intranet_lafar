import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DolibarrmktComponent } from './dolibarrmkt.component';

const routes: Routes = [
    {
        path: '',
        component: DolibarrmktComponent,
        children: [
            { path: '', redirectTo: 'add' },
            { path: 'add', loadChildren: './maindolibarrmkt/maindolibarrmkt.module#MaindolibarrmktModule' }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DolibarrmktRoutingModule {}
