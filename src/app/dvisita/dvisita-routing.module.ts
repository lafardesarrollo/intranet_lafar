import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DvisitaComponent } from './dvisita.component';

const routes: Routes = [
    {
        path: '',
        component: DvisitaComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DvisitaRoutingModule {}
