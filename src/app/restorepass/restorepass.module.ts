import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
    MzIconMdiModule,
    MzValidationModule,
    MzInputModule,
    MzModalModule,
    MzInjectionModule,
    MzButtonModule,
    MzProgressModule
} from 'ngx-materialize';
import { MzSpinnerModule } from 'ngx-materialize';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SimpleNotificationsModule } from 'angular2-notifications';
import { JasperoAlertsModule } from '@jaspero/ng2-alerts';
import { RestorePassComponent } from './restorepass.component';
import { RestorePassRoutingModule } from './restorepass-routing.module';
import { UsersService } from '../admin-intranet/users/users.service';

@NgModule({
    imports: [
        CommonModule,
        RestorePassRoutingModule,
        FormsModule,
        MzIconMdiModule,
        MzSpinnerModule,
        SimpleNotificationsModule.forRoot(),
        JasperoAlertsModule,
        ReactiveFormsModule,
        MzInputModule,
        MzValidationModule,
        MzButtonModule,
        MzInjectionModule,
        MzModalModule,
        MzSpinnerModule
    ],
    declarations: [RestorePassComponent],
    providers: [UsersService],
    entryComponents: []
})
export class RestorePassModule {}
