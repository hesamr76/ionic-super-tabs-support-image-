import { Renderer2 } from '@angular/core';
import { Platform } from 'ionic-angular';
import { SuperTabsConfig } from './components/super-tabs';
export declare class SuperTabsPanGesture {
    private plt;
    private config;
    onStart: () => void;
    onMove: (delta: number) => void;
    onEnd: (shortSwipe: boolean, shortSwipeDelta?: number) => void;
    private initialCoords;
    private initialTimestamp;
    private leftThreshold;
    private rightThreshold;
    private shouldCapture;
    private isDragging;
    private lastPosX;
    private listeners;
    constructor(plt: Platform, config: SuperTabsConfig, el: HTMLElement, rnd: Renderer2);
    destroy(): void;
    private _onStart(ev);
    private _onMove(ev);
    private _onEnd(ev);
    private checkGesture(newCoords);
}
