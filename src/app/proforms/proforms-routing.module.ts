import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProformsComponent } from './proforms.component';

const routes: Routes = [
    {
        path: '',
        component: ProformsComponent,
        children: [
            { path: '', redirectTo: 'higrotermometro' },
            { path: 'higrotermometro', loadChildren: './higrotermometros/higrotermometros.module#HigrotermometrosModule' },
            { path: 'presion', loadChildren: './presion/presion.module#PresionModule' }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProformsRoutingModule {}
