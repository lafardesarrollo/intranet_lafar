import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProduccionComponent } from './produccion.component';

const routes: Routes = [
    {
        path: '',
        component: ProduccionComponent,
        children: [
            { path: '', redirectTo: 'add' },
            { path: 'add', loadChildren: './bitacoraseccion/bitacoraseccion.module#BitacoraseccionModule' }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProduccionRoutingModule {}
