import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ImagePublicacionComponent } from './image-publicacion.component';

const routes: Routes = [
    {
        path: ':name', component: ImagePublicacionComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class ImagePublicacionRoutingModule {
}
