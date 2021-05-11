import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HigrotermometrosComponent } from './higrotermometros.component';



const routes: Routes = [
    {
        path: '', component: HigrotermometrosComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class HigrotermometrosRoutingModule {
}
