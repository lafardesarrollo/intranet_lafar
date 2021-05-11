import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LafardocsComponent } from './lafardocs.component';


const routes: Routes = [
    {
        path: '',
        component: LafardocsComponent,
        children: [
            { path: '', redirectTo: 'add' },
            { path: 'add', loadChildren: './documentacionlf/documentacionlf.module#DocumentacionlfModule' }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LafardocsRoutingModule {}
