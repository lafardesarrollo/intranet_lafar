import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImagePublicacionRoutingModule } from './image-publicacion-routing.module';
import { ImagePublicacionComponent } from './image-publicacion.component';

@NgModule({
  imports: [
    CommonModule,
    ImagePublicacionRoutingModule
  ],
  declarations: [ImagePublicacionComponent]
})

export class ImagePublicacionModule {}