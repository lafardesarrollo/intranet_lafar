import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MetrologiaComponent } from './metrologia.component';

const routes: Routes = [
    {
        path: '',
        component: MetrologiaComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MetrologiaRoutingModule {}
