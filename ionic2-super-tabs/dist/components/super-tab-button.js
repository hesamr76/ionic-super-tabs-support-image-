import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, Output, ViewEncapsulation, } from '@angular/core';
var SuperTabButtonComponent = (function () {
    function SuperTabButtonComponent(eRef) {
        this.eRef = eRef;
        this.selected = false;
        this.select = new EventEmitter();
    }
    SuperTabButtonComponent.prototype.onClick = function () {
        this.select.emit(this);
    };
    SuperTabButtonComponent.prototype.getNativeElement = function () {
        return this.eRef.nativeElement;
    };
    SuperTabButtonComponent.decorators = [
        { type: Component, args: [{
                    selector: 'super-tab-button',
                    template: "\n    <ion-icon *ngIf=\"!!icon\" [name]=\"icon\" [color]=\"color\"></ion-icon>\n   <img *ngIf=\"!!img\" class=\"super-img\" [src]=\"img\">\n <span class=\"title\" *ngIf=\"!!title\" ion-text [color]=\"color\">{{ title }}</span>\n    <ion-badge mode=\"md\" [color]=\"badgeColor\">{{ badge }}</ion-badge>\n    <div class=\"button-effect\"></div>\n  ",
                    host: {
                        '[class.selected]': 'selected',
                        '(click)': 'onClick()',
                        '[class.title-only]': '!!title && !icon',
                        '[class.icon-only]': '!title && !!icon',
                        '[class.title-and-icon]': '!!title && !!icon',
                        'tappable': '',
                        'role': 'button'
                    },
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None
                },] },
    ];
    /** @nocollapse */
    SuperTabButtonComponent.ctorParameters = function () { return [
        { type: ElementRef, },
    ]; };
    SuperTabButtonComponent.propDecorators = {
        "selected": [{ type: Input },],
        "title": [{ type: Input },],
        "img": [{ type: Input },],
        "icon": [{ type: Input },],
        "badge": [{ type: Input },],
        "badgeColor": [{ type: Input },],
        "color": [{ type: Input },],
        "select": [{ type: Output },],
    };
    return SuperTabButtonComponent;
}());
export { SuperTabButtonComponent };
//# sourceMappingURL=super-tab-button.js.map