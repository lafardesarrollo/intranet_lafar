import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentacionlfRoutingModule } from './documentacionlf-routing.module';
import { DocumentacionlfComponent } from './documentacionlf.component';


@NgModule({
    imports: [
        CommonModule,
        DocumentacionlfRoutingModule
    ],
    declarations: [
        DocumentacionlfComponent
    ]
})
export class DocumentacionlfModule {}
