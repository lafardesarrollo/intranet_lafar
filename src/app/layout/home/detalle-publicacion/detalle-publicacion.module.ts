import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetallePublicacionRoutingModule } from './detalle-publicacion-routing.module';
import { DetallePublicacionComponent } from './detalle-publicacion.component';

@NgModule({
  imports: [
    CommonModule,
    DetallePublicacionRoutingModule
  ],
  declarations: [DetallePublicacionComponent]
})

export class DetallePublicacionModule {}