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
    MzRadioButtonModule,
    MzToastService,
    MzCollectionModule
 } from 'ngx-materialize';


import { FormsModule } from '@angular/forms';
import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { Ng2CompleterModule } from 'ng2-completer';
import { CodeSnippetModule } from '../../layout/shared/code-snippet/code-snippet.module';
import { SuperareaService } from '../superarea/superarea.service';
import { Ng2SearchPipeModule } from 'ng2-search-filter';


@NgModule({
    imports: [
        CommonModule,
        SimpleNotificationsModule.forRoot(),
        ProfileRoutingModule,
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
        Ng2CompleterModule,
        MzCollectionModule,
        Ng2SearchPipeModule
        ],
    declarations: [
        ProfileComponent
    ],
    providers: [MzToastService, SuperareaService]
})
export class ProfileModule {}
