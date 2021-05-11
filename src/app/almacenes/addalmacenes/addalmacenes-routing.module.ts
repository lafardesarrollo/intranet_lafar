import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddalmacenesComponent } from './addalmacenes.component';

const routes: Routes = [
    {
        path: '', component: AddalmacenesComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class AddalmacenesRoutingModule {
}
