import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MzParallaxModule, MzCardModule } from 'ngx-materialize';
import { CodeSnippetModule } from '../../layout/shared/code-snippet/code-snippet.module';
import { PropertiesTableModule } from '../../layout/shared/properties-table/properties-table.module';
import { MainscRoutingModule } from './mainsc-routing.module';
import { MainscComponent } from './mainsc.component';

@NgModule({
    imports: [
        CommonModule,
        MainscRoutingModule,
        MzParallaxModule,
        MzCardModule,
        CodeSnippetModule,
        PropertiesTableModule,

        
    ],
    declarations: [
        MainscComponent
    ]
})

export class MainscModule {}


