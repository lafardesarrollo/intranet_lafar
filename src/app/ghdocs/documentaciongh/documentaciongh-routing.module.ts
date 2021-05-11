import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DocumentacionghComponent } from './documentaciongh.component';

const routes: Routes = [
    {
        path: '', component: DocumentacionghComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class DocumentacionghRoutingModule {
}
