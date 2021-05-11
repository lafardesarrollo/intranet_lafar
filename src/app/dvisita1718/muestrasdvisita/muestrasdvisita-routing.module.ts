import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MuestrasdvisitaComponent } from './muestrasdvisita.component';

const routes: Routes = [
    {
        path: '', component: MuestrasdvisitaComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class MuestrasdvisitaRoutingModule {
}
