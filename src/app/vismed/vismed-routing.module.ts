import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VismedComponent } from './vismed.component';

const routes: Routes = [
    {
        path: '',
        component: VismedComponent,
        children: [
            { path: '', redirectTo: 'add' },
            { path: 'add', loadChildren: './detallevismed/detallevismed.module#DetallevismedModule' }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class VismedRoutingModule {}
