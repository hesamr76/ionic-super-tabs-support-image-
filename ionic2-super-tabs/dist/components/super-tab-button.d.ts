import { ElementRef, EventEmitter } from '@angular/core';
export declare class SuperTabButtonComponent {
    private eRef;
    selected: boolean;
    title: string;
    img: string;
    icon: string;
    badge: number;
    badgeColor: string;
    color: string;
    select: EventEmitter<SuperTabButtonComponent>;
    onClick(): void;
    constructor(eRef: ElementRef);
    getNativeElement(): HTMLElement;
}
