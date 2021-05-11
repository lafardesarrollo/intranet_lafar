import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from '../layout/layout.module';
import { ScRoutingModule } from './sc-routing.module';
import { ScComponent } from './sc.component';

@NgModule({
    imports: [
        CommonModule,
        ScRoutingModule,
        LayoutModule
    ],
    providers: [],
    declarations: [ScComponent]
})

export class ScModule {}
