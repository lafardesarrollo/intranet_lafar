import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from '../layout/layout.module';
import { RdolibarRoutingModule } from './rdolibar-routing.module';
import { RdolibarComponent } from './rdolibar.component';

@NgModule({
    imports: [
        CommonModule,
        RdolibarRoutingModule,
        LayoutModule
    ],
    declarations: [RdolibarComponent]
})

export class RdolibarModule {}
