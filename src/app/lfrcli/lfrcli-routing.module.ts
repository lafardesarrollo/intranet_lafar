import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LfrcliComponent } from './lfrcli.component';

const routes: Routes = [
    {
        path: '',
        component: LfrcliComponent,
        children: [
            { path: '', redirectTo: 'add' },
            { path: 'add', loadChildren: './detallelfrcli/detallelfrcli.module#DetallelfrcliModule' }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LfrcliRoutingModule {}
