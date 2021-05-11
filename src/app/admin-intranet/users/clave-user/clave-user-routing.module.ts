import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClaveUserComponent } from './clave-user.component';

const routes: Routes = [
    {
        path: '', component: ClaveUserComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class ClaveUserRoutingModule {
}
