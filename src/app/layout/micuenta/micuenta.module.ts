import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    MzDropdownModule,
    MzSwitchModule,
    MzParallaxModule,
    MzButtonModule,
    MzIconModule,
    MzIconMdiModule,
    MzCardModule,
    MzModalModule,
    MzInputModule,
    MzValidationModule,
    MzSelectModule,
    MzCheckboxModule,
    MzRadioButtonModule
 } from 'ngx-materialize';


import { FormsModule } from '@angular/forms';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { Ng2CompleterModule } from 'ng2-completer';
import { CodeSnippetModule } from '../../layout/shared/code-snippet/code-snippet.module';
import { MiCuentaRoutingModule } from './micuenta-routing.module';
import { MiCuentaComponent } from './micuenta.component';
import { ClaveUserModule } from '../../admin-intranet/users/clave-user/clave-user.module';
import { MzToastService } from 'ngx-materialize';


@NgModule({
    imports: [
        CommonModule,
        SimpleNotificationsModule.forRoot(),
        MiCuentaRoutingModule,
        MzDropdownModule,
        MzSelectModule,
        MzSwitchModule,
        MzButtonModule,
        MzIconMdiModule,
        MzParallaxModule,
        MzCardModule,
        MzButtonModule,
        MzIconModule,
        MzInputModule,
        MzModalModule,
        MzValidationModule,
        MzCheckboxModule,
        MzRadioButtonModule,
        FormsModule,
        CodeSnippetModule,
        Ng2CompleterModule
    ],
    declarations: [
        MiCuentaComponent
    ],
    providers: [MzToastService]
})
export class MiCuentaModule {}
