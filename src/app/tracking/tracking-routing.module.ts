import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TrackingComponent } from './tracking.component';

const routes: Routes = [
    {
        path: '',
        component: TrackingComponent,
        children: [
            { path: '', redirectTo: 'tracking-diario'},
            { path: 'tracking-diario', loadChildren: './tracking-diario/tracking-diario.module#TrackingDiarioModule' }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TrackingRoutingModule {}
