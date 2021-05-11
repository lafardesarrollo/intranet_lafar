import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SuperareaRoutingModule } from './superarea-routing.module';
import { SuperareaComponent } from './superarea.component';

@NgModule({
    imports: [
        CommonModule,
        SuperareaRoutingModule
    ],
    declarations: [
        SuperareaComponent
    ]
})
export class SuperareaModule {}
