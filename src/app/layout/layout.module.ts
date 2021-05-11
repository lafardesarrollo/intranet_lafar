import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';

import { MzButtonModule, MzIconMdiModule, MzSidenavModule, MzModalModule, MzNavbarModule } from 'ngx-materialize';
import { MalihuScrollbarModule } from 'ngx-malihu-scrollbar';
import { MarkdownModule } from 'ngx-markdown';
import { LayoutComponent } from './layout.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NgxSmartModalModule, NgxSmartModalService } from 'ngx-smart-modal';
import { HeaderComponent } from './components/header/header.component';
import { UsersService } from '../admin-intranet/users/users.service';
import { CargosService } from '../admin-intranet/cargos/cargos.service';
import { AreasService } from '../admin-intranet/areas/areas.service';
import { RegionalesService } from '../admin-intranet/regionales/regionales.service';

@NgModule({
    imports: [
        CommonModule,
        LayoutRoutingModule,
        MalihuScrollbarModule.forRoot(),
        MzButtonModule,
        MzIconMdiModule,
        MzSidenavModule,
        MarkdownModule.forRoot(),
        MzModalModule,
        MzNavbarModule,
        NgxSmartModalModule
    ],
    declarations: [LayoutComponent, SidebarComponent, HeaderComponent],
    exports: [ HeaderComponent, SidebarComponent ],
    providers: [ NgxSmartModalService, UsersService, CargosService, AreasService, RegionalesService]
})

export class LayoutModule {}
