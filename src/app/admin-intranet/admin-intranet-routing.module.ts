import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminIntranetComponent } from './admin-intranet.component';

const routes: Routes = [
    {
        path: '',
        component: AdminIntranetComponent,
        children: [
            { path: '', redirectTo: 'users' },
            { path: 'users', loadChildren: './users/users.module#UsersModule' },
            { path: 'apps', loadChildren: './apps/apps.module#AppsModule' },
            { path: 'items', loadChildren: './items/items.module#ItemsModule' },
            { path: 'areas', loadChildren: './areas/areas.module#AreasModule' },
            { path: 'secciones', loadChildren: './secciones/secciones.module#SeccionesModule' },
            { path: 'profile/:id', loadChildren: './profile/profile.module#ProfileModule' },
            { path: 'admusersapps/:id', loadChildren: './adminusersapps/adminusersapps.module#AdminUsersAppsModule' },
            { path: 'roles/:id/:username', loadChildren: './roles/roles.module#RolesModule'},
            { path: 'rol', loadChildren: './rol/rol.module#RolModule' },
            { path: 'items/:id/:name', loadChildren: './items/items.module#ItemsModule' },
            { path: 'iconos', loadChildren: './iconos/iconos.module#IconosModule' },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminIntranetRoutingModule {}
