import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetallelfrcliComponent } from './detallelfrcli.component';

const routes: Routes = [
    {
        path: '', component: DetallelfrcliComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class DetallelfrcliRoutingModule {
}
