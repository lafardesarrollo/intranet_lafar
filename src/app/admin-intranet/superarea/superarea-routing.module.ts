import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SuperareaComponent } from './superarea.component';


const routes: Routes = [
    {
        path: '', component: SuperareaComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class SuperareaRoutingModule {
}
