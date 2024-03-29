import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/debounceTime';
import { AfterContentInit, AfterViewInit, ElementRef, EventEmitter, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { App, DeepLinker, DomController, NavController, NavControllerBase, Platform, RootNode, ViewController } from 'ionic-angular';
import { NavigationContainer } from 'ionic-angular/navigation/navigation-container';
import { SuperTabsController } from '../providers/super-tabs-controller';
import { SuperTabComponent } from './super-tab';
export interface SuperTabsConfig {
    /**
     * Defaults to 40
     */
    maxDragAngle?: number;
    /**
     * Defaults to 20
     */
    dragThreshold?: number;
    /**
     * Allows elements inside tabs to be dragged, defaults to false
     */
    allowElementScroll?: boolean;
    /**
     * Defaults to ease-in-out
     */
    transitionEase?: string;
    /**
     * Defaults to 150
     */
    transitionDuration?: number;
    /**
     * Defaults to none
     */
    sideMenu?: 'left' | 'right' | 'both';
    /**
     * Defaults to 50
     */
    sideMenuThreshold?: number;
    /**
     * Defaults to 300
     */
    shortSwipeDuration?: number;
}
export declare class SuperTabsComponent implements OnInit, AfterContentInit, AfterViewInit, OnDestroy, RootNode, NavigationContainer {
    viewCtrl: ViewController;
    private _app;
    private el;
    private rnd;
    private superTabsCtrl;
    private linker;
    private domCtrl;
    private _plt;
    /**
     * Color of the toolbar behind the tab buttons
     */
    toolbarBackground: string;
    /**
     * Color of the tab buttons' text and/or icon
     */
    toolbarColor: string;
    /**
     * Color of the slider that moves based on what tab is selected
     */
    indicatorColor: string;
    /**
     * Badge color
     */
    badgeColor: string;
    /**
     * Configuration
     */
    config: SuperTabsConfig;
    /**
     * Tabs instance ID
     */
    id: string;
    name: string;
    /**
     * Allow Ionic NavController lifecycle events to pass through to child tabs
     */
    passthroughLifecycle: boolean;
    /**
     * Height of the tabs
     */
    height: number;
    /**
     * The initial selected tab index
     * @param val {number} tab index
     */
    selectedTabIndex: number;
    /**
     * Set to true to enable tab buttons scrolling
     * @param val
     */
    scrollTabs: boolean;
    /**
     * Set to true to enable view scrolling
     * @param val
     */
    scrollViews: boolean;
    /**
     * Tab buttons placement. Can be `top` or `bottom`.
     * @type {string}
     */
    tabsPlacement: string;
    /**
     * Emits event when tab dragging is activated
     */
    tabDragStart: EventEmitter<void>;
    /**
     * Emits event when tab dragging is stopped (when a user lets go)
     */
    tabDragEnd: EventEmitter<void>;
    /**
     * Emits the tab index when the selected tab changes
     * @type {EventEmitter<Object>}
     */
    tabSelect: EventEmitter<any>;
    /**
     * Indicates whether the toolbar is visible
     * @private
     */
    _isToolbarVisible: boolean;
    /**
     * @private
     */
    _tabs: SuperTabComponent[];
    private toolbar;
    private tabsContainer;
    private maxIndicatorPosition;
    /**
     * Indicates whether the tab buttons should scroll
     * @type {boolean}
     * @private
     */
    private _scrollTabs;
    /**
     * Indicates whether the views should scroll
     * @type {boolean}
     * @private
     */
    private _scrollViews;
    /**
     * Selected tab index
     * @type {number}
     * @private
     */
    private _selectedTabIndex;
    /**
     * Any observable subscriptions that we should unsubscribe from when destroying this component
     * @type {Array<Subscription>}
     * @private
     */
    private watches;
    /**
     * Indicates whether any of the tabs has an icon
     * @type {boolean}
     * @private
     */
    private hasIcons;
    /**
     * Indicates whether any of the tabs has a title
     * @type {boolean}
     * @private
     */
    private hasImg;
    /**
     * Indicates whether any of the tabs has a image
     * @type {boolean}
     * @private
     */
    private hasTitles;
    /**
     * Indicates whether the component has finished initializing
     * @type {boolean}
     * @private
     */
    private init;
    /**
     * Parent NavController
     * @type {NavControllerBase}
     */
    parent: NavControllerBase;
    constructor(parent: NavController, viewCtrl: ViewController, _app: App, el: ElementRef, rnd: Renderer2, superTabsCtrl: SuperTabsController, linker: DeepLinker, domCtrl: DomController, _plt: Platform);
    ngOnInit(): void;
    ngAfterContentInit(): void;
    ngAfterViewInit(): Promise<void>;
    ngOnDestroy(): void;
    getType(): string;
    getSecondaryIdentifier(): string;
    getAllChildNavs(): any[];
    resize(): void;
    /**
     * Sets the badge number for a specific tab
     * @param tabId {string} tab ID
     * @param value {number} badge number
     */
    setBadge(tabId: string, value: number): void;
    /**
     * Clears the badge for a specific tab
     * @param tabId {string} tab ID
     */
    clearBadge(tabId: string): void;
    /**
     * Increases the badge value for a specific tab
     * @param tabId {string} tab ID
     * @param increaseBy {number} the number to increase by
     */
    increaseBadge(tabId: string, increaseBy: number): void;
    decreaseBadge(tabId: string, decreaseBy: number): void;
    enableTabsSwipe(enable: boolean): void;
    enableTabSwipe(tabId: string, enable: boolean): void;
    showToolbar(show: boolean): void;
    slideTo(indexOrId: string | number, fireEvent?: boolean): void;
    getActiveChildNavs(): NavigationContainer[];
    addTab(tab: SuperTabComponent): void;
    /**
     * We listen to drag events to move the "slide" thingy along with the slides
     */
    onDrag(): void;
    /**
     * Runs when the user clicks on a segment button
     * @param index
     */
    onTabChange(index: number): Promise<void>;
    onToolbarTabSelect(index: number): Promise<void>;
    onContainerTabSelect(ev: {
        index: number;
        changed: boolean;
    }): Promise<void>;
    private fireLifecycleEvent(events);
    private refreshTabStates();
    private updateTabWidth();
    private refreshContainerHeight();
    private refreshTabWidths();
    private alignTabButtonsContainer(animate?);
    private getRelativeIndicatorPosition(index?);
    private getAbsoluteIndicatorPosition();
    /**
     * Gets the width of a tab button when `scrollTabs` is set to `true`
     */
    private getSegmentButtonWidth(index?);
    private setMaxIndicatorPosition();
    private setFixedIndicatorWidth();
    /**
     * Aligns slide position with selected tab
     */
    private alignIndicatorPosition(animate?);
    private tabDragStarted();
    private tabDragStopped();
    getTabIndexById(tabId: string): number;
    getTabById(tabId: string): SuperTabComponent;
    getActiveTab(): SuperTabComponent;
    getElementRef(): ElementRef;
    initPane(): boolean;
    paneChanged(): void;
    getSelected(): void;
    setTabbarPosition(): void;
    indexSegmentButtonWidths(): void;
}
