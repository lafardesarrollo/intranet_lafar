import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MzParallaxModule, MzCardModule, MzIconMdiModule, MzBadgeModule,
    MzButtonModule, MzModalModule, MzInputModule, MzValidationModule } from 'ngx-materialize';
import { SearchscRoutingModule } from './searchsc-routing.module';
import { SearchscComponent } from './searchsc.component';
import { FormsModule } from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        SearchscRoutingModule,
        MzParallaxModule,
        MzCardModule,
        MzIconMdiModule,
        MzBadgeModule,
        MzButtonModule,
        MzModalModule,
        MzInputModule,
        MzValidationModule,
        FormsModule
    ],
    declarations: [
        SearchscComponent
    ]
})

export class SearchscModule {}
