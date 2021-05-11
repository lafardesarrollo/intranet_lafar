import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from './users.component';


const routes: Routes = [
    {
        path: '',
        component: UsersComponent,
        children: [
            { path: '', redirectTo: 'list' },
            { path: 'list', loadChildren: './list-user/list-user.module#ListUserModule'},
            { path: 'add', loadChildren: './add-user/add-user.module#AddUserModule' },
            { path: 'clave', loadChildren: './clave-user/clave-user.module#ClaveUserModule'}
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UsersRoutingModule {}
