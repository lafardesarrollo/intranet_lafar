import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MzNavbarModule, MzParallaxModule } from 'ngx-materialize';
import { HigrotermometrosRoutingModule } from './higrotermometros-routing.module';
import { HigrotermometrosComponent } from './higrotermometros.component';


@NgModule({
    imports: [
        CommonModule,
        HigrotermometrosRoutingModule,
        MzNavbarModule,
        MzParallaxModule,
        FormsModule
    ],
    declarations: [
        HigrotermometrosComponent
    ]
})
export class HigrotermometrosModule {}
