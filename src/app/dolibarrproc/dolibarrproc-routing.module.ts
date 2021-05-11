import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DolibarrprocComponent } from './dolibarrproc.component';

const routes: Routes = [
    {
        path: '',
        component: DolibarrprocComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DolibarrprocRoutingModule {}
