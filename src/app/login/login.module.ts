import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MzIconMdiModule,
    MzValidationModule,
    MzInputModule, MzModalModule, MzInjectionModule, MzButtonModule, MzProgressModule } from 'ngx-materialize';
import { MzSpinnerModule } from 'ngx-materialize';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SimpleNotificationsModule } from 'angular2-notifications';
import { JasperoAlertsModule } from '@jaspero/ng2-alerts';


@NgModule({
    imports: [
        CommonModule,
        LoginRoutingModule,
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
    declarations: [LoginComponent],
    providers: [],
    entryComponents: []
})
export class LoginModule {}
