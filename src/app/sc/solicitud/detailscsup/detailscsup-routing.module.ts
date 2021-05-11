import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetailscsupComponent } from './detailscsup.component';

const routes: Routes = [
    {
        path: '', component: DetailscsupComponent
    }
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class DetailscsupRoutingModule {

}
