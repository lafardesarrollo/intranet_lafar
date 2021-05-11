import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    MzIconModule,
    MzIconMdiModule,
    MzToastService,
    MzInputModule,
    MzCardModule
 } from 'ngx-materialize';
import { FormsModule } from '@angular/forms';
import { IconosRoutingModule } from './iconos-routing.module';
import { IconosComponent } from './iconos.component';

@NgModule({
    imports: [
        CommonModule,
        MzIconModule,
        MzInputModule,
        MzIconMdiModule,
        MzCardModule,
        FormsModule,
        IconosRoutingModule
        ],
    declarations: [
        IconosComponent
    ],
    providers: [MzToastService]
})
export class IconosModule {}
