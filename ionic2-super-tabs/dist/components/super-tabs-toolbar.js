import { Component, ElementRef, EventEmitter, Input, Output, QueryList, Renderer2, ViewChild, ViewChildren, ViewEncapsulation } from '@angular/core';
import { Platform } from 'ionic-angular';
import { SuperTabsPanGesture } from '../super-tabs-pan-gesture';
import { SuperTabButtonComponent } from './super-tab-button';
var SuperTabsToolbar = (function () {
    function SuperTabsToolbar(el, plt, rnd) {
        this.el = el;
        this.plt = plt;
        this.rnd = rnd;
        this.color = '';
        this.tabsColor = '';
        this.badgeColor = '';
        this.scrollTabs = false;
        this.indicatorColor = '';
        this.selectedTab = 0;
        this.indicatorPosition = 0;
        this.indicatorWidth = 0;
        this.tabSelect = new EventEmitter();
        /**
           * @private
           */
        this.segmentPosition = 0;
        /**
           * The width of each button
           */
        this.segmentButtonWidths = [];
        /**
           * The segment width
           */
        this.segmentWidth = 0;
        this.tabs = [];
        this.animationState = {
            indicator: false,
            segment: false
        };
    }
    Object.defineProperty(SuperTabsToolbar.prototype, "height", {
        get: function () {
            if (!this.el || !this.el.nativeElement) {
                return 0;
            }
            return this.el.nativeElement.getBoundingClientRect().height;
        },
        enumerable: true,
        configurable: true
    });
    SuperTabsToolbar.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.gesture = new SuperTabsPanGesture(this.plt, this.config, this.tabButtonsContainer.nativeElement, this.rnd);
        this.gesture.onMove = function (delta) {
            var newCPos = _this.segmentPosition + delta;
            var mw = _this.el.nativeElement.offsetWidth, cw = _this.segmentWidth;
            newCPos = Math.max(0, Math.min(newCPos, cw - mw));
            _this.setSegmentPosition(newCPos);
        };
        if (this.scrollTabs) {
            this.plt.timeout(function () {
                _this.indexSegmentButtonWidths();
            }, 100);
        }
    };
    SuperTabsToolbar.prototype.ngOnDestroy = function () {
        this.gesture && this.gesture.destroy();
    };
    SuperTabsToolbar.prototype.onTabSelect = function (index) {
        this.tabSelect.emit(index);
    };
    SuperTabsToolbar.prototype.alignIndicator = function (position, width, animate) {
        this.setIndicatorProperties(width, position, animate);
    };
    SuperTabsToolbar.prototype.setIndicatorPosition = function (position, animate) {
        this.setIndicatorProperties(this.indicatorWidth, position, animate);
    };
    SuperTabsToolbar.prototype.setIndicatorWidth = function (width, animate) {
        this.setIndicatorProperties(width, this.indicatorPosition, animate);
    };
    SuperTabsToolbar.prototype.setIndicatorProperties = function (width, position, animate) {
        this.indicatorWidth = width;
        this.indicatorPosition = position;
        var scale = width / 100;
        this.toggleAnimation('indicator', animate);
        this.rnd.setStyle(this.indicator.nativeElement, this.plt.Css.transform, 'translate3d(' +
            (position - this.segmentPosition) +
            'px, 0, 0) scale3d(' +
            scale +
            ', 1, 1)');
    };
    SuperTabsToolbar.prototype.setSegmentPosition = function (position, animate) {
        this.segmentPosition = position;
        this.toggleAnimation('segment', animate);
        this.rnd.setStyle(this.tabButtonsBar.nativeElement, this.plt.Css.transform, "translate3d(" + -1 * position + "px,0,0)");
        this.setIndicatorPosition(this.indicatorPosition, animate);
    };
    /**
     * Enables/disables animation
     * @param el
     * @param animate
     */
    /**
       * Enables/disables animation
       * @param el
       * @param animate
       */
    SuperTabsToolbar.prototype.toggleAnimation = /**
       * Enables/disables animation
       * @param el
       * @param animate
       */
    function (el, animate) {
        if (!this.config || this.config.transitionDuration === 0) {
            return;
        }
        // only change style if the value changed
        if (this.animationState[el] === animate) {
            return;
        }
        this.animationState[el] = animate;
        var _el = el === 'indicator'
            ? this.indicator.nativeElement
            : this.tabButtonsBar.nativeElement;
        var value = animate
            ? "all " + this.config.transitionDuration + "ms " + this.config.transitionEase
            : 'initial';
        this.rnd.setStyle(_el, this.plt.Css.transition, value);
    };
    /**
     * Indexes the segment button widths
     */
    /**
       * Indexes the segment button widths
       */
    SuperTabsToolbar.prototype.indexSegmentButtonWidths = /**
       * Indexes the segment button widths
       */
    function () {
        var index = [];
        var total = 0;
        this.tabButtons.forEach(function (btn, i) {
            index[i] = btn.getNativeElement().offsetWidth;
            total += index[i];
        });
        this.segmentButtonWidths = index;
        this.segmentWidth = total;
    };
    SuperTabsToolbar.decorators = [
        { type: Component, args: [{
                    selector: 'super-tabs-toolbar',
                    template: "\n    <ion-toolbar [color]=\"color\" mode=\"md\" [class.scroll-tabs]=\"scrollTabs\">\n      <div class=\"tab-buttons-container\" #tabButtonsContainer>\n        <div *ngIf=\"tabsPlacement === 'bottom'\" class=\"indicator {{ 'button-md-' + indicatorColor }}\" #indicator></div>\n        <div class=\"tab-buttons\" #tabButtons>\n          <super-tab-button *ngFor=\"let tab of tabs; let i = index\" (select)=\"onTabSelect(i)\" [title]=\"tab.title\"\n                       [img]=\"tab.img\"     [icon]=\"tab.icon\" [badge]=\"tab.badge\" [selected]=\"selectedTab === i\" [color]=\"tabsColor\"\n                            [badgeColor]=\"badgeColor\"></super-tab-button>\n        </div>\n        <div *ngIf=\"tabsPlacement === 'top'\" class=\"indicator {{ 'button-md-' + indicatorColor }}\" #indicator></div>\n      </div>\n    </ion-toolbar>\n  ",
                    encapsulation: ViewEncapsulation.None
                },] },
    ];
    /** @nocollapse */
    SuperTabsToolbar.ctorParameters = function () { return [
        { type: ElementRef, },
        { type: Platform, },
        { type: Renderer2, },
    ]; };
    SuperTabsToolbar.propDecorators = {
        "color": [{ type: Input },],
        "tabsColor": [{ type: Input },],
        "badgeColor": [{ type: Input },],
        "scrollTabs": [{ type: Input },],
        "indicatorColor": [{ type: Input },],
        "selectedTab": [{ type: Input },],
        "config": [{ type: Input },],
        "tabsPlacement": [{ type: Input },],
        "tabSelect": [{ type: Output },],
        "tabButtons": [{ type: ViewChildren, args: [SuperTabButtonComponent,] },],
        "tabButtonsContainer": [{ type: ViewChild, args: ['tabButtonsContainer',] },],
        "indicator": [{ type: ViewChild, args: ['indicator',] },],
        "tabButtonsBar": [{ type: ViewChild, args: ['tabButtons',] },],
    };
    return SuperTabsToolbar;
}());
export { SuperTabsToolbar };
//# sourceMappingURL=super-tabs-toolbar.js.map