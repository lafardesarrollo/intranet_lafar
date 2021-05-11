import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AgmComponent } from './agm.component';

const routes: Routes = [
    {
        path: '',
        component: AgmComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AgmRoutingModule {}
