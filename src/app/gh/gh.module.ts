import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from '../layout/layout.module';
import { GhRoutingModule } from './gh-routing.module';
import { GhComponent } from './gh.component';

@NgModule({
    imports: [
        CommonModule,
        GhRoutingModule,
        LayoutModule
    ],
    declarations: [GhComponent]
})

export class GhModule {}
