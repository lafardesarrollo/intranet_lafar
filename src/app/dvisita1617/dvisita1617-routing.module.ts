import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Dvisita1617Component } from './dvisita1617.component';

const routes: Routes = [
    {
        path: '',
        component: Dvisita1617Component
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class Dvisita1617RoutingModule {}
