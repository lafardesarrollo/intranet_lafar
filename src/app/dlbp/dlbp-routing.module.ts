import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DlbpComponent } from './dlbp.component';

const routes: Routes = [
    {
        path: '',
        component: DlbpComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DlbpRoutingModule {}
