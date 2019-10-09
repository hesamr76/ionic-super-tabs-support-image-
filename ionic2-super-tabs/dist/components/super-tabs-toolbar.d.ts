import { AfterViewInit, ElementRef, EventEmitter, OnDestroy, Renderer2 } from '@angular/core';
import { Platform } from 'ionic-angular';
import { SuperTabsConfig } from './super-tabs';
export declare class SuperTabsToolbar implements AfterViewInit, OnDestroy {
    private el;
    private plt;
    private rnd;
    color: string;
    tabsColor: string;
    badgeColor: string;
    scrollTabs: boolean;
    indicatorColor: string;
    selectedTab: number;
    config: SuperTabsConfig;
    tabsPlacement: string;
    indicatorPosition: number;
    indicatorWidth: number;
    tabSelect: EventEmitter<any>;
    private tabButtons;
    private tabButtonsContainer;
    private indicator;
    private tabButtonsBar;
    /**
     * @private
     */
    segmentPosition: number;
    /**
     * The width of each button
     */
    segmentButtonWidths: number[];
    /**
     * The segment width
     */
    segmentWidth: number;
    tabs: any[];
    private gesture;
    private animationState;
    constructor(el: ElementRef, plt: Platform, rnd: Renderer2);
    readonly height: number;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    onTabSelect(index: number): void;
    alignIndicator(position: number, width: number, animate?: boolean): void;
    setIndicatorPosition(position: number, animate?: boolean): void;
    setIndicatorWidth(width: number, animate?: boolean): void;
    setIndicatorProperties(width: number, position: number, animate?: boolean): void;
    setSegmentPosition(position: number, animate?: boolean): void;
    /**
     * Enables/disables animation
     * @param el
     * @param animate
     */
    private toggleAnimation(el, animate);
    /**
     * Indexes the segment button widths
     */
    indexSegmentButtonWidths(): void;
}
