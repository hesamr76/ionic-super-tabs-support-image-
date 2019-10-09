import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { SuperTabComponent } from './components/super-tab';
import { SuperTabButtonComponent } from './components/super-tab-button';
import { SuperTabsComponent } from './components/super-tabs';
import { SuperTabsContainer } from './components/super-tabs-container';
import { SuperTabsToolbar } from './components/super-tabs-toolbar';
import { SuperTabsController } from './providers/super-tabs-controller';
var SuperTabsModule = (function () {
    function SuperTabsModule() {
    }
    SuperTabsModule.forRoot = function () {
        return {
            ngModule: SuperTabsModule,
            providers: [SuperTabsController]
        };
    };
    SuperTabsModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [
                        SuperTabComponent,
                        SuperTabsComponent,
                        SuperTabsToolbar,
                        SuperTabsContainer,
                        SuperTabButtonComponent
                    ],
                    imports: [IonicModule],
                    exports: [SuperTabComponent, SuperTabsComponent]
                },] },
    ];
    return SuperTabsModule;
}());
export { SuperTabsModule };
//# sourceMappingURL=super-tabs.module.js.map