import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClaveUserRoutingModule } from './clave-user-routing.module';
import { ClaveUserComponent } from './clave-user.component';
import { MzCardModule, MzParallaxModule, MzInputModule, MzButtonModule } from 'ngx-materialize';
import { FormsModule } from '@angular/forms';
import { EqualValidator } from './password.match.directive';
import { SimpleNotificationsModule } from 'angular2-notifications';

@NgModule({
  imports: [
    CommonModule,
    ClaveUserRoutingModule,
    MzCardModule,
    MzParallaxModule,
    MzInputModule,
    MzButtonModule,
    FormsModule,
    SimpleNotificationsModule.forRoot(),
  ],
  exports: [
    ClaveUserComponent
  ],
  declarations: [ClaveUserComponent, EqualValidator]
})

export class ClaveUserModule {}
