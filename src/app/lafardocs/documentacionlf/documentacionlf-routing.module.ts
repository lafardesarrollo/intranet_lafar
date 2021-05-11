import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DocumentacionlfComponent } from './documentacionlf.component';

const routes: Routes = [
    {
        path: '', component: DocumentacionlfComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class DocumentacionlfRoutingModule {
}
