import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TrackingDiarioComponent } from './tracking-diario.component';

const routes: Routes = [
    {
        path: '',
        component: TrackingDiarioComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TrackingDiarioRoutingModule {}
