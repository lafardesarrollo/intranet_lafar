import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarModalComponent } from './navbar-modal/navbar-modal.component';
import { MaterializeComponentesModule } from '../materialize.module';


@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [NavbarModalComponent],
    exports: [
        NavbarModalComponent
    ]
})

export class ComponentesModule {}
