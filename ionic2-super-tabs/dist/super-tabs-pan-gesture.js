import { pointerCoord } from 'ionic-angular/util/dom';
var SuperTabsPanGesture = (function () {
    function SuperTabsPanGesture(plt, config, el, rnd) {
        this.plt = plt;
        this.config = config;
        this.leftThreshold = 0;
        this.rightThreshold = 0;
        this.listeners = [];
        this.listeners.push(rnd.listen(el, 'touchstart', this._onStart.bind(this)), rnd.listen(el, 'touchmove', this._onMove.bind(this)), rnd.listen(el, 'touchend', this._onEnd.bind(this)));
        if (config.sideMenu === 'both' || config.sideMenu === 'left') {
            this.leftThreshold = config.sideMenuThreshold;
        }
        if (config.sideMenu === 'both' || config.sideMenu === 'right') {
            this.rightThreshold = config.sideMenuThreshold;
        }
    }
    SuperTabsPanGesture.prototype.destroy = function () {
        this.listeners.forEach(function (fn) { return fn(); });
    };
    SuperTabsPanGesture.prototype._onStart = function (ev) {
        // check avoid this element
        var avoid = false;
        var element = ev.target;
        if (element) {
            do {
                if (element.getAttribute && element.getAttribute('avoid-super-tabs')) {
                    avoid = true;
                }
                element = element.parentElement;
            } while (element && !avoid);
        }
        if (avoid) {
            this.shouldCapture = false;
            return;
        }
        var coords = pointerCoord(ev), vw = this.plt.width();
        if (coords.x < this.leftThreshold || coords.x > vw - this.rightThreshold) {
            // ignore this gesture, it started in the side menu touch zone
            this.shouldCapture = false;
            return;
        }
        // the starting point looks good, let's see what happens when we move
        this.initialCoords = coords;
        if (this.config.shortSwipeDuration > 0) {
            this.initialTimestamp = Date.now();
        }
        this.lastPosX = coords.x;
    };
    SuperTabsPanGesture.prototype._onMove = function (ev) {
        var coords = pointerCoord(ev);
        if (!this.isDragging) {
            if (typeof this.shouldCapture !== 'boolean') {
                // we haven't decided yet if we want to capture this gesture
                this.checkGesture(coords);
            }
            if (this.shouldCapture === true) {
                // gesture is good, let's capture all next onTouchMove events
                this.isDragging = true;
                // emit value
                this.onStart && this.onStart();
            }
            else {
                return;
            }
        }
        // stop anything else from capturing these events, to make sure the content doesn't slide
        if (this.config.allowElementScroll !== true) {
            ev.stopPropagation();
            ev.preventDefault();
        }
        // get delta X
        var deltaX = this.lastPosX - coords.x;
        // emit value
        this.onMove && this.onMove(deltaX);
        // update last X value
        this.lastPosX = coords.x;
    };
    SuperTabsPanGesture.prototype._onEnd = function (ev) {
        var coords = pointerCoord(ev);
        if (this.shouldCapture === true) {
            if (this.config.shortSwipeDuration > 0) {
                var deltaTime = Date.now() - this.initialTimestamp;
                if (deltaTime <= this.config.shortSwipeDuration) {
                    this.onEnd && this.onEnd(true, coords.x - this.initialCoords.x);
                }
                else {
                    this.onEnd && this.onEnd(false);
                }
            }
            else {
                this.onEnd && this.onEnd(false);
            }
        }
        this.isDragging = false;
        this.shouldCapture = undefined;
    };
    SuperTabsPanGesture.prototype.checkGesture = function (newCoords) {
        if (!this.initialCoords) {
            return;
        }
        var radians = this.config.maxDragAngle * (Math.PI / 180), maxCosine = Math.cos(radians), deltaX = newCoords.x - this.initialCoords.x, deltaY = newCoords.y - this.initialCoords.y, distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        if (distance >= this.config.dragThreshold) {
            // swipe is long enough so far
            // lets check the angle
            var angle = Math.atan2(deltaY, deltaX), cosine = Math.cos(angle);
            this.shouldCapture = Math.abs(cosine) > maxCosine;
        }
    };
    return SuperTabsPanGesture;
}());
export { SuperTabsPanGesture };
//# sourceMappingURL=super-tabs-pan-gesture.js.map