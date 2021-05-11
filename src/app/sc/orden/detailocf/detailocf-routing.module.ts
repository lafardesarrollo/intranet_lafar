import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetailocfComponent } from './detailocf.component';

const routes: Routes = [
    {
        path: '', component: DetailocfComponent
    }
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class DetailocfRoutingModule {

}
