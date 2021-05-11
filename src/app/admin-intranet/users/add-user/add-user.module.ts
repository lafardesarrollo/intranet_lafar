import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddUserRoutingModule } from './add-user.routing.module';
import { AddUserComponent } from './add-user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {
  MzDropdownModule,
  MzSwitchModule,
  MzParallaxModule,
  MzButtonModule,
  MzIconModule,
  MzIconMdiModule,
  MzCardModule,
  MzInputModule,
  MzValidationModule,
  MzSelectModule,
  MzToastService
} from 'ngx-materialize';

import { Ng2CompleterModule } from 'ng2-completer';
import { SimpleNotificationsModule } from 'angular2-notifications';
@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    AddUserRoutingModule,
    SimpleNotificationsModule.forRoot(),
    MzDropdownModule,
    MzSwitchModule,
    MzButtonModule,
    MzIconMdiModule,
    MzParallaxModule,
    MzCardModule,
    MzButtonModule,
    MzIconModule,
    MzInputModule,
    MzSelectModule,
    MzValidationModule,
    Ng2CompleterModule
  ],
  declarations: [AddUserComponent],
  providers: [MzToastService]
})
export class AddUserModule { }
