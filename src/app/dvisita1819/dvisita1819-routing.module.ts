import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Dvisita1819Component } from './dvisita1819.component';

const routes: Routes = [
    {
        path: '',
        component: Dvisita1819Component
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class Dvisita1819RoutingModule {}
