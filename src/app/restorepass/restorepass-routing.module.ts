import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RestorePassComponent } from './restorepass.component';

const routes: Routes = [
    {
        path: '',
        component: RestorePassComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RestorePassRoutingModule {}
