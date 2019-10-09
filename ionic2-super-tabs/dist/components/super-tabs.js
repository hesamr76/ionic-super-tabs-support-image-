var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/debounceTime';
import { Component, ElementRef, EventEmitter, forwardRef, Input, Optional, Output, Renderer2, ViewChild, ViewEncapsulation } from '@angular/core';
import { App, DeepLinker, DomController, NavController, Platform, RootNode, ViewController } from 'ionic-angular';
import { DIRECTION_SWITCH } from 'ionic-angular/navigation/nav-util';
import { Observable } from 'rxjs/Observable';
import { SuperTabsController } from '../providers/super-tabs-controller';
import { SuperTabsContainer } from './super-tabs-container';
import { SuperTabsToolbar } from './super-tabs-toolbar';
var SuperTabsComponent = (function () {
    function SuperTabsComponent(parent, viewCtrl, _app, el, rnd, superTabsCtrl, linker, domCtrl, _plt) {
        var _this = this;
        this.viewCtrl = viewCtrl;
        this._app = _app;
        this.el = el;
        this.rnd = rnd;
        this.superTabsCtrl = superTabsCtrl;
        this.linker = linker;
        this.domCtrl = domCtrl;
        this._plt = _plt;
        /**
           * Color of the slider that moves based on what tab is selected
           */
        this.indicatorColor = 'primary';
        /**
           * Badge color
           */
        this.badgeColor = 'primary';
        /**
           * Configuration
           */
        this.config = {};
        /**
           * Tab buttons placement. Can be `top` or `bottom`.
           * @type {string}
           */
        this.tabsPlacement = 'top';
        /**
           * Emits event when tab dragging is activated
           */
        this.tabDragStart = new EventEmitter();
        /**
           * Emits event when tab dragging is stopped (when a user lets go)
           */
        this.tabDragEnd = new EventEmitter();
        /**
           * Emits the tab index when the selected tab changes
           * @type {EventEmitter<Object>}
           */
        this.tabSelect = new EventEmitter();
        /**
           * Indicates whether the toolbar is visible
           * @private
           */
        this._isToolbarVisible = true;
        /**
           * @private
           */
        this._tabs = [];
        /**
           * Indicates whether the tab buttons should scroll
           * @type {boolean}
           * @private
           */
        this._scrollTabs = false;
        /**
           * Indicates whether the views should scroll
           * @type {boolean}
           * @private
           */
        this._scrollViews = true;
        /**
           * Selected tab index
           * @type {number}
           * @private
           */
        this._selectedTabIndex = 0;
        /**
           * Any observable subscriptions that we should unsubscribe from when destroying this component
           * @type {Array<Subscription>}
           * @private
           */
        this.watches = [];
        /**
           * Indicates whether any of the tabs has an icon
           * @type {boolean}
           * @private
           */
        this.hasIcons = false;
        /**
           * Indicates whether any of the tabs has a title
           * @type {boolean}
           * @private
           */
        this.hasImg = false;
        /**
           * Indicates whether any of the tabs has a image
           * @type {boolean}
           * @private
           */
        this.hasTitles = false;
        /**
           * Indicates whether the component has finished initializing
           * @type {boolean}
           * @private
           */
        this.init = false;
        this.parent = parent;
        if (this.parent) {
            this.parent.registerChildNav(this);
        }
        else if (viewCtrl && viewCtrl.getNav()) {
            this.parent = viewCtrl.getNav();
            this.parent.registerChildNav(this);
        }
        else if (this._app) {
            this._app.registerRootNav(this);
        }
        var obsToMerge = [
            Observable.fromEvent(window, 'orientationchange'),
            Observable.fromEvent(window, 'resize')
        ];
        if (viewCtrl) {
            obsToMerge.push(viewCtrl.didEnter);
            // This causes lifecycle events to be passed through to the active tab
        }
        // re-adjust the height of the slider when the orientation changes
        var $windowResize = Observable.merge
            .apply(this, obsToMerge)
            .debounceTime(100);
        var windowResizeSub = $windowResize.subscribe(function () {
            _this.resize();
        });
        this.watches.push(windowResizeSub);
    }
    Object.defineProperty(SuperTabsComponent.prototype, "height", {
        get: function () {
            return this.el.nativeElement.offsetHeight;
        },
        set: /**
           * Height of the tabs
           */
        function (val) {
            this.rnd.setStyle(this.el.nativeElement, 'height', val + 'px');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuperTabsComponent.prototype, "selectedTabIndex", {
        get: function () {
            return this._selectedTabIndex;
        },
        set: /**
           * The initial selected tab index
           * @param val {number} tab index
           */
        function (val) {
            this._selectedTabIndex = Number(val);
            this.init && this.alignIndicatorPosition(true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuperTabsComponent.prototype, "scrollTabs", {
        get: function () {
            return this._scrollTabs;
        },
        set: /**
           * Set to true to enable tab buttons scrolling
           * @param val
           */
        function (val) {
            this._scrollTabs = typeof val !== 'boolean' || val === true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuperTabsComponent.prototype, "scrollViews", {
        get: function () {
            return this._scrollViews;
        },
        set: /**
           * Set to true to enable view scrolling
           * @param val
           */
        function (val) {
            this._scrollViews = typeof val !== 'boolean' || val === true;
        },
        enumerable: true,
        configurable: true
    });
    SuperTabsComponent.prototype.ngOnInit = function () {
        var _this = this;
        var defaultConfig = {
            dragThreshold: 10,
            allowElementScroll: false,
            maxDragAngle: 40,
            sideMenuThreshold: 50,
            transitionDuration: 300,
            transitionEase: 'cubic-bezier(0.35, 0, 0.25, 1)',
            shortSwipeDuration: 300
        };
        for (var prop in this.config) {
            defaultConfig[prop] = this.config[prop];
        }
        this.config = defaultConfig;
        if (this.config.allowElementScroll === true) {
            if (this.config.dragThreshold < 110) {
                this.config.dragThreshold = 110;
            }
        }
        this.id = this.id || "super-tabs-" + ++superTabsIds;
        this.superTabsCtrl.registerInstance(this);
        if (this.tabsPlacement === 'bottom') {
            this.rnd.addClass(this.getElementRef().nativeElement, 'tabs-placement-bottom');
        }
        if (this.passthroughLifecycle && this.viewCtrl) {
            this.viewCtrl.willEnter.subscribe(function () {
                _this.fireLifecycleEvent(['willEnter']);
            });
            this.viewCtrl.didEnter.subscribe(function () {
                _this.fireLifecycleEvent(['didEnter']);
            });
            this.viewCtrl.willLeave.subscribe(function () {
                _this.fireLifecycleEvent(['willLeave']);
            });
            this.viewCtrl.didLeave.subscribe(function () {
                _this.fireLifecycleEvent(['didLeave']);
            });
        }
    };
    SuperTabsComponent.prototype.ngAfterContentInit = function () {
        this.updateTabWidth();
        this.toolbar.tabs = this._tabs;
    };
    SuperTabsComponent.prototype.ngAfterViewInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var tabsSegment;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        tabsSegment = this.linker.getSegmentByNavIdOrName(this.id, this.name);
                        if (tabsSegment) {
                            this.selectedTabIndex = this.getTabIndexById(tabsSegment.id);
                        }
                        this.linker.navChange(DIRECTION_SWITCH);
                        if (!this.hasTitles && !this.hasIcons) {
                            this._isToolbarVisible = false;
                        }
                        this.tabsContainer.slideTo(this.selectedTabIndex, false);
                        return [4 /*yield*/, this.refreshTabStates()];
                    case 1:
                        _a.sent();
                        this.fireLifecycleEvent(['willEnter', 'didEnter']);
                        this.setFixedIndicatorWidth();
                        // we need this to make sure the "slide" thingy doesn't move outside the screen
                        this.setMaxIndicatorPosition();
                        setTimeout(function () { return _this.alignIndicatorPosition(); }, 100);
                        this.refreshContainerHeight();
                        this.init = true;
                        return [2 /*return*/];
                }
            });
        });
    };
    SuperTabsComponent.prototype.ngOnDestroy = function () {
        this.watches.forEach(function (watch) {
            watch.unsubscribe && watch.unsubscribe();
        });
        this.parent.unregisterChildNav(this);
        this.superTabsCtrl.unregisterInstance(this.id);
    };
    SuperTabsComponent.prototype.getType = function () {
        return;
    };
    SuperTabsComponent.prototype.getSecondaryIdentifier = function () {
        return;
    };
    SuperTabsComponent.prototype.getAllChildNavs = function () {
        return this._tabs;
    };
    SuperTabsComponent.prototype.resize = function () {
        if (this.el.nativeElement.offsetParent === null) {
            return;
        }
        this.setMaxIndicatorPosition();
        this.updateTabWidth();
        this.setFixedIndicatorWidth();
        this.refreshTabWidths();
        this.tabsContainer.refreshDimensions();
        this.tabsContainer.slideTo(this.selectedTabIndex);
        this.alignIndicatorPosition();
        this.refreshContainerHeight();
    };
    /**
     * Sets the badge number for a specific tab
     * @param tabId {string} tab ID
     * @param value {number} badge number
     */
    /**
       * Sets the badge number for a specific tab
       * @param tabId {string} tab ID
       * @param value {number} badge number
       */
    SuperTabsComponent.prototype.setBadge = /**
       * Sets the badge number for a specific tab
       * @param tabId {string} tab ID
       * @param value {number} badge number
       */
    function (tabId, value) {
        this.getTabById(tabId).setBadge(value);
    };
    /**
     * Clears the badge for a specific tab
     * @param tabId {string} tab ID
     */
    /**
       * Clears the badge for a specific tab
       * @param tabId {string} tab ID
       */
    SuperTabsComponent.prototype.clearBadge = /**
       * Clears the badge for a specific tab
       * @param tabId {string} tab ID
       */
    function (tabId) {
        this.getTabById(tabId).clearBadge();
    };
    /**
     * Increases the badge value for a specific tab
     * @param tabId {string} tab ID
     * @param increaseBy {number} the number to increase by
     */
    /**
       * Increases the badge value for a specific tab
       * @param tabId {string} tab ID
       * @param increaseBy {number} the number to increase by
       */
    SuperTabsComponent.prototype.increaseBadge = /**
       * Increases the badge value for a specific tab
       * @param tabId {string} tab ID
       * @param increaseBy {number} the number to increase by
       */
    function (tabId, increaseBy) {
        this.getTabById(tabId).increaseBadge(increaseBy);
    };
    SuperTabsComponent.prototype.decreaseBadge = function (tabId, decreaseBy) {
        this.getTabById(tabId).decreaseBadge(decreaseBy);
    };
    SuperTabsComponent.prototype.enableTabsSwipe = function (enable) {
        this.tabsContainer.enableTabsSwipe(enable);
    };
    SuperTabsComponent.prototype.enableTabSwipe = function (tabId, enable) {
        this.tabsContainer.enableTabSwipe(this.getTabIndexById(tabId), enable);
    };
    SuperTabsComponent.prototype.showToolbar = function (show) {
        this._isToolbarVisible = show;
        this.refreshContainerHeight();
    };
    SuperTabsComponent.prototype.slideTo = function (indexOrId, fireEvent) {
        if (fireEvent === void 0) { fireEvent = true; }
        typeof indexOrId === 'string' &&
            (indexOrId = this.getTabIndexById(indexOrId));
        fireEvent && this.onToolbarTabSelect(indexOrId);
    };
    SuperTabsComponent.prototype.getActiveChildNavs = function () {
        if (this.selectedTabIndex < 0) {
            this.selectedTabIndex = 0;
        }
        return [this._tabs[this.selectedTabIndex]];
    };
    SuperTabsComponent.prototype.addTab = function (tab) {
        tab.rootNavCtrl = this.parent;
        tab.rootParams = tab.rootParams || {};
        tab.tabId = tab.tabId || "super-tabs-" + this.id + "-tab-" + this._tabs.length;
        this._tabs.push(tab);
        if (tab.icon) {
            this.hasIcons = true;
        }
        if (tab.img) {
            this.hasImg = true;
        }
        if (tab.title) {
            this.hasTitles = true;
        }
        tab.setWidth(this.el.nativeElement.offsetWidth);
    };
    /**
     * We listen to drag events to move the "slide" thingy along with the slides
     */
    /**
       * We listen to drag events to move the "slide" thingy along with the slides
       */
    SuperTabsComponent.prototype.onDrag = /**
       * We listen to drag events to move the "slide" thingy along with the slides
       */
    function () {
        var _this = this;
        if (!this._isToolbarVisible) {
            return;
        }
        this.domCtrl.write(function () {
            var singleSlideWidth = _this.tabsContainer.tabWidth, slidesWidth = _this.tabsContainer.containerWidth;
            var percentage = Math.abs(_this.tabsContainer.containerPosition / slidesWidth);
            if (_this.scrollTabs) {
                var originalSlideStart = singleSlideWidth * _this.selectedTabIndex, originalPosition = _this.getRelativeIndicatorPosition(), originalWidth = _this.getSegmentButtonWidth();
                var nextPosition = void 0, nextWidth = void 0, indicatorPosition = void 0, indicatorWidth = void 0;
                var deltaTabPos = originalSlideStart - Math.abs(_this.tabsContainer.containerPosition);
                percentage = Math.abs(deltaTabPos / singleSlideWidth);
                if (deltaTabPos < 0) {
                    // going to next slide
                    nextPosition = _this.getRelativeIndicatorPosition(_this.selectedTabIndex + 1);
                    nextWidth = _this.getSegmentButtonWidth(_this.selectedTabIndex + 1);
                    indicatorPosition =
                        originalPosition + percentage * (nextPosition - originalPosition);
                }
                else {
                    // going to previous slide
                    nextPosition = _this.getRelativeIndicatorPosition(_this.selectedTabIndex - 1);
                    nextWidth = _this.getSegmentButtonWidth(_this.selectedTabIndex - 1);
                    indicatorPosition =
                        originalPosition - percentage * (originalPosition - nextPosition);
                }
                var deltaWidth = nextWidth - originalWidth;
                indicatorWidth = originalWidth + percentage * deltaWidth;
                if ((originalWidth > nextWidth && indicatorWidth < nextWidth) ||
                    (originalWidth < nextWidth && indicatorWidth > nextWidth)) {
                    // this is only useful on desktop, because you are able to drag and swipe through multiple tabs at once
                    // which results in the indicator width to be super small/big since it's changing based on the current/next widths
                    indicatorWidth = nextWidth;
                }
                _this.alignTabButtonsContainer();
                _this.toolbar.setIndicatorProperties(indicatorWidth, indicatorPosition);
            }
            else {
                _this.toolbar.setIndicatorPosition(Math.min(percentage * singleSlideWidth, _this.maxIndicatorPosition));
            }
        });
    };
    /**
     * Runs when the user clicks on a segment button
     * @param index
     */
    /**
       * Runs when the user clicks on a segment button
       * @param index
       */
    SuperTabsComponent.prototype.onTabChange = /**
       * Runs when the user clicks on a segment button
       * @param index
       */
    function (index) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        index = Number(index);
                        if (index === this.selectedTabIndex) {
                            this.tabSelect.emit({
                                index: index,
                                id: this._tabs[index].tabId,
                                changed: false
                            });
                            return [2 /*return*/];
                        }
                        if (!(index <= this._tabs.length)) return [3 /*break*/, 2];
                        this.fireLifecycleEvent(['willLeave', 'didLeave']);
                        this.selectedTabIndex = index;
                        this.linker.navChange(DIRECTION_SWITCH);
                        return [4 /*yield*/, this.refreshTabStates()];
                    case 1:
                        _a.sent();
                        this.fireLifecycleEvent(['willEnter', 'didEnter']);
                        this.tabSelect.emit({
                            index: index,
                            id: this._tabs[index].tabId,
                            changed: true
                        });
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    SuperTabsComponent.prototype.onToolbarTabSelect = function (index) {
        if (index !== this.selectedTabIndex) {
            this.tabsContainer.slideTo(index);
        }
        return this.onTabChange(index);
    };
    SuperTabsComponent.prototype.onContainerTabSelect = function (ev) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!ev.changed) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.onTabChange(ev.index)];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        this.alignIndicatorPosition(true);
                        return [2 /*return*/];
                }
            });
        });
    };
    SuperTabsComponent.prototype.fireLifecycleEvent = function (events) {
        var activeView = this.getActiveTab().getActive();
        if (activeView) {
            events.forEach(function (event) {
                switch (event) {
                    case 'willEnter':
                        activeView._willEnter();
                        break;
                    case 'didEnter':
                        activeView._didEnter();
                        break;
                    case 'willLeave':
                        activeView._willLeave(false);
                        break;
                    case 'didLeave':
                        activeView._didLeave();
                        break;
                }
            });
        }
    };
    SuperTabsComponent.prototype.refreshTabStates = function () {
        var _this = this;
        return Promise.all(this._tabs.map(function (tab, i) {
            tab.setActive(i === _this.selectedTabIndex);
            return tab.load(Math.abs(_this.selectedTabIndex - i) < 2);
        }));
    };
    SuperTabsComponent.prototype.updateTabWidth = function () {
        this.tabsContainer.tabWidth = this.el.nativeElement.offsetWidth;
    };
    SuperTabsComponent.prototype.refreshContainerHeight = function () {
        var heightOffset = this._isToolbarVisible ? this.toolbar.height : 0;
        this.rnd.setStyle(this.tabsContainer.getNativeElement(), 'height', "calc(100% - " + heightOffset + "px)");
    };
    SuperTabsComponent.prototype.refreshTabWidths = function () {
        var width = this.el.nativeElement.offsetWidth;
        this._tabs.forEach(function (tab) { return tab.setWidth(width); });
    };
    SuperTabsComponent.prototype.alignTabButtonsContainer = function (animate) {
        var mw = this.el.nativeElement.offsetWidth, 
        // max width
        iw = this.toolbar.indicatorWidth, 
        // indicator width
        ip = this.toolbar.indicatorPosition, 
        // indicatorPosition
        sp = this.toolbar.segmentPosition; // segment position
        if (mw === 0) {
            return;
        }
        if (this.toolbar.segmentWidth <= mw) {
            if (this.toolbar.segmentPosition !== 0) {
                this.toolbar.setSegmentPosition(0, animate);
            }
            return;
        }
        var pos;
        if (ip + iw + (mw / 2 - iw / 2) > mw + sp) {
            // we need to move the segment container to the left
            var delta = ip + iw + (mw / 2 - iw / 2) - mw - sp, max = this.toolbar.segmentWidth - mw;
            pos = sp + delta;
            pos = pos < max ? pos : max;
        }
        else if (ip - (mw / 2 - iw / 2) < sp) {
            // we need to move the segment container to the right
            pos = ip - (mw / 2 - iw / 2);
            // pos = pos >= 0? pos : 0;
            pos = pos < 0 ? 0 : pos > ip ? ip - mw + iw : pos;
            // pos = pos < 0? 0 : pos > maxPos? maxPos : pos;
        }
        else {
            // no need to move the segment container
            return;
        }
        this.toolbar.setSegmentPosition(pos, animate);
    };
    SuperTabsComponent.prototype.getRelativeIndicatorPosition = function (index) {
        if (index === void 0) { index = this.selectedTabIndex; }
        var position = 0;
        for (var i = 0; i < this.toolbar.segmentButtonWidths.length; i++) {
            if (index > Number(i)) {
                position += this.toolbar.segmentButtonWidths[i];
            }
        }
        return position;
    };
    SuperTabsComponent.prototype.getAbsoluteIndicatorPosition = function () {
        var position = (this.selectedTabIndex * this.tabsContainer.tabWidth) / this._tabs.length;
        return position <= this.maxIndicatorPosition
            ? position
            : this.maxIndicatorPosition;
    };
    /**
     * Gets the width of a tab button when `scrollTabs` is set to `true`
     */
    /**
       * Gets the width of a tab button when `scrollTabs` is set to `true`
       */
    SuperTabsComponent.prototype.getSegmentButtonWidth = /**
       * Gets the width of a tab button when `scrollTabs` is set to `true`
       */
    function (index) {
        if (index === void 0) { index = this.selectedTabIndex; }
        if (!this._isToolbarVisible) {
            return;
        }
        return this.toolbar.segmentButtonWidths[index];
    };
    SuperTabsComponent.prototype.setMaxIndicatorPosition = function () {
        if (this.el && this.el.nativeElement) {
            this.maxIndicatorPosition =
                this.el.nativeElement.offsetWidth -
                    this.el.nativeElement.offsetWidth / this._tabs.length;
        }
    };
    SuperTabsComponent.prototype.setFixedIndicatorWidth = function () {
        if (this.scrollTabs || !this._isToolbarVisible) {
            return;
        }
        // the width of the "slide", should be equal to the width of a single `ion-segment-button`
        // we'll just calculate it instead of querying for a segment button
        this.toolbar.setIndicatorWidth(this.el.nativeElement.offsetWidth / this._tabs.length, false);
    };
    /**
     * Aligns slide position with selected tab
     */
    /**
       * Aligns slide position with selected tab
       */
    SuperTabsComponent.prototype.alignIndicatorPosition = /**
       * Aligns slide position with selected tab
       */
    function (animate) {
        if (animate === void 0) { animate = false; }
        if (!this._isToolbarVisible) {
            return;
        }
        if (this.scrollTabs) {
            this.toolbar.alignIndicator(this.getRelativeIndicatorPosition(), this.getSegmentButtonWidth(), animate);
            this.alignTabButtonsContainer(animate);
        }
        else {
            this.toolbar.setIndicatorPosition(this.getAbsoluteIndicatorPosition(), animate);
        }
    };
    SuperTabsComponent.prototype.tabDragStarted = function () {
        this.tabDragStart.emit();
    };
    SuperTabsComponent.prototype.tabDragStopped = function () {
        this.tabDragEnd.emit();
    };
    SuperTabsComponent.prototype.getTabIndexById = function (tabId) {
        return this._tabs.findIndex(function (tab) { return tab.tabId === tabId; });
    };
    SuperTabsComponent.prototype.getTabById = function (tabId) {
        return this._tabs.find(function (tab) { return tab.tabId === tabId; });
    };
    SuperTabsComponent.prototype.getActiveTab = function () {
        return this._tabs[this.selectedTabIndex];
    };
    // needed since we're implementing RootNode
    // needed since we're implementing RootNode
    SuperTabsComponent.prototype.getElementRef = 
    // needed since we're implementing RootNode
    function () {
        return this.el;
    };
    // needed since we're implementing RootNode
    // needed since we're implementing RootNode
    SuperTabsComponent.prototype.initPane = 
    // needed since we're implementing RootNode
    function () {
        return true;
    };
    // needed since we're implementing RootNode
    // needed since we're implementing RootNode
    SuperTabsComponent.prototype.paneChanged = 
    // needed since we're implementing RootNode
    function () { };
    // needed to make Ionic Framework think this is a tabs component... needed for Deeplinking
    // needed to make Ionic Framework think this is a tabs component... needed for Deeplinking
    SuperTabsComponent.prototype.getSelected = 
    // needed to make Ionic Framework think this is a tabs component... needed for Deeplinking
    function () { };
    // needed to make Ionic Framework think this is a tabs component... needed for Deeplinking
    // needed to make Ionic Framework think this is a tabs component... needed for Deeplinking
    SuperTabsComponent.prototype.setTabbarPosition = 
    // needed to make Ionic Framework think this is a tabs component... needed for Deeplinking
    function () { };
    // update segment button widths manually
    // update segment button widths manually
    SuperTabsComponent.prototype.indexSegmentButtonWidths = 
    // update segment button widths manually
    function () {
        var _this = this;
        this._plt.raf(function () { return _this.toolbar.indexSegmentButtonWidths(); });
    };
    SuperTabsComponent.decorators = [
        { type: Component, args: [{
                    selector: 'super-tabs',
                    template: "\n    <super-tabs-toolbar [tabsPlacement]=\"tabsPlacement\" [hidden]=\"!_isToolbarVisible\" [config]=\"config\"\n                        [color]=\"toolbarBackground\"\n                        [tabsColor]=\"toolbarColor\" [indicatorColor]=\"indicatorColor\" [badgeColor]=\"badgeColor\"\n                        [scrollTabs]=\"scrollTabs\"\n                        [selectedTab]=\"selectedTabIndex\"\n                        (tabSelect)=\"onToolbarTabSelect($event)\"></super-tabs-toolbar>\n    <super-tabs-container [config]=\"config\" [tabsCount]=\"_tabs.length\" [selectedTabIndex]=\"selectedTabIndex\" [scrollViews]=\"scrollViews\"\n                          (tabSelect)=\"onContainerTabSelect($event)\" (onDrag)=\"onDrag()\" (onDragStart)=\"tabDragStart.emit()\" (onDragEnd)=\"tabDragEnd.emit()\">\n      <ng-content></ng-content>\n    </super-tabs-container>\n  ",
                    encapsulation: ViewEncapsulation.None,
                    providers: [
                        {
                            provide: RootNode,
                            useExisting: forwardRef(function () { return SuperTabsComponent; })
                        }
                    ]
                },] },
    ];
    /** @nocollapse */
    SuperTabsComponent.ctorParameters = function () { return [
        { type: NavController, decorators: [{ type: Optional },] },
        { type: ViewController, decorators: [{ type: Optional },] },
        { type: App, },
        { type: ElementRef, },
        { type: Renderer2, },
        { type: SuperTabsController, },
        { type: DeepLinker, },
        { type: DomController, },
        { type: Platform, },
    ]; };
    SuperTabsComponent.propDecorators = {
        "toolbarBackground": [{ type: Input },],
        "toolbarColor": [{ type: Input },],
        "indicatorColor": [{ type: Input },],
        "badgeColor": [{ type: Input },],
        "config": [{ type: Input },],
        "id": [{ type: Input },],
        "name": [{ type: Input },],
        "passthroughLifecycle": [{ type: Input },],
        "height": [{ type: Input },],
        "selectedTabIndex": [{ type: Input },],
        "scrollTabs": [{ type: Input },],
        "scrollViews": [{ type: Input },],
        "tabsPlacement": [{ type: Input },],
        "tabDragStart": [{ type: Output },],
        "tabDragEnd": [{ type: Output },],
        "tabSelect": [{ type: Output },],
        "toolbar": [{ type: ViewChild, args: [SuperTabsToolbar,] },],
        "tabsContainer": [{ type: ViewChild, args: [SuperTabsContainer,] },],
    };
    return SuperTabsComponent;
}());
export { SuperTabsComponent };
var superTabsIds = -1;
//# sourceMappingURL=super-tabs.js.map