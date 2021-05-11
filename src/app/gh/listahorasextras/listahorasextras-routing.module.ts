import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListahorasextrasComponent } from './listahorasextras.component';

const routes: Routes = [
    {
        path: '',
        component: ListahorasextrasComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ListahorasextrasRoutingModule {}
