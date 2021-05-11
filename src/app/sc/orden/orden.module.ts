import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MzParallaxModule, MzCardModule, MzModalService, MzModalModule, MzButtonModule } from 'ngx-materialize';
import { OrdenRoutingModule } from './orden-routing.module';
import { OrdenComponent } from './orden.component';

@NgModule({
    imports: [
        CommonModule,
        OrdenRoutingModule,
        MzParallaxModule,
        MzCardModule,
        MzModalModule,
        MzButtonModule
    ],
    declarations: [
        OrdenComponent,
    ],
})

export class OrdenModule {}
