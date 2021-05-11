import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IconosComponent } from './iconos.component';

const routes: Routes = [
    {
        path: '', component: IconosComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class IconosRoutingModule {
}
