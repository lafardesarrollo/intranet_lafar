import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetailocsgComponent } from './detailocsg.component';

const routes: Routes = [
    {
        path: '', component: DetailocsgComponent
    }
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class DetailocsgRoutingModule {

}
