import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MaindolibarrmktComponent } from './maindolibarrmkt.component';

const routes: Routes = [
    {
        path: '', component: MaindolibarrmktComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class MaindolibarrmktRoutingModule {
}
