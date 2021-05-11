import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PowerbiComponent } from './powerbi.component';

const routes: Routes = [
    {
        path: '',
        component: PowerbiComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PowerbiRoutingModule {}
