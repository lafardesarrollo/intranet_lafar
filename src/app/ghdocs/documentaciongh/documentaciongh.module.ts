import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentacionghRoutingModule } from './documentaciongh-routing.module';
import { DocumentacionghComponent } from './documentaciongh.component';


@NgModule({
    imports: [
        CommonModule,
        DocumentacionghRoutingModule
    ],
    declarations: [
        DocumentacionghComponent
    ]
})
export class DocumentacionghModule {}
