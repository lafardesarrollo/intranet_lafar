import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegionalesComponent } from './regionales.component';

const routes: Routes = [
    {
        path: '', component: RegionalesComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class RegionalesRoutingModule {
}
