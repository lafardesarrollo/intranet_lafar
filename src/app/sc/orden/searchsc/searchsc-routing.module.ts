import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchscComponent } from './searchsc.component';

const routes: Routes = [
    {
        path: '', component: SearchscComponent
    }
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class SearchscRoutingModule {

}
