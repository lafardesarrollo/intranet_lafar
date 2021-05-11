import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AlmacenesComponent } from './almacenes.component';

const routes: Routes = [
    {
        path: '',
        component: AlmacenesComponent,
        children: [
            { path: '', redirectTo: 'add' },
            { path: 'add', loadChildren: './addalmacenes/addalmacenes.module#AddalmacenesModule' }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AlmacenesRoutingModule {}
