import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicacionesRoutingModule } from './publicaciones-routing.module';
import { PublicacionesComponent } from './publicaciones.component';
import { BotonesService } from '../botones.service';
import { MzModalModule,
  MzNavbarModule,
  MzInputModule,
  MzIconModule,
  MzValidationModule,
  MzDatepickerModule,
  MzSpinnerModule,
  MzCardModule,
  MzDropdownModule,
  MzIconMdiModule} from 'ngx-materialize';

import { CodeSnippetModule } from '../../shared/code-snippet/code-snippet.module';
import { NgxSmartModalModule } from 'ngx-smart-modal';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListaPublicacionComponent } from './lista-publicacion/lista-publicacion.component';
import { LoadingComponent } from '../../components/loading/loading.component';
import { SimpleNotificationsModule } from 'angular2-notifications';

@NgModule({
  imports: [
    CommonModule,
    PublicacionesRoutingModule,
    MzModalModule,
    MzNavbarModule,
    MzInputModule,
    MzIconModule,
    MzIconMdiModule,
    CodeSnippetModule,
    NgxSmartModalModule,
    FormsModule,
    ReactiveFormsModule,
    MzValidationModule,
    MzDatepickerModule,
    MzDropdownModule,
    MzSpinnerModule,
    MzCardModule,
    SimpleNotificationsModule.forRoot()
  ],
  declarations: [
    PublicacionesComponent,
    ListaPublicacionComponent,
    LoadingComponent
  ],
  providers: [
    BotonesService
  ]
})

export class PublicacionesModule {}
