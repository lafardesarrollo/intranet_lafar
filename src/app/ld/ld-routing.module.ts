import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LdComponent } from './ld.component';

const routes: Routes = [
    {
        path: '',
        component: LdComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LdRoutingModule {}
