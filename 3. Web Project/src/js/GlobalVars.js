/**
 * GlobalVars
 * Class designed to allow access to "global" variables from other classes
 */

class GlobalVars {
    constructor() {
        this._appId = null;
        this._sock = null;

        this._frameCountBeforeRemoveBody = 120;

        this._bodyJointsColor = {
            0: "#0000ff",
            1: "#00ff00",
            2: "#ff0000",
            3: "#ff00c9",
            4: "#ffac00",
            5: "#8507ff",
            6: "#00ffc0",
            7: "#ebff00",
        };


        this.reset();
        Object.seal(this);
    }

    reset() {
        this._animationFrameCount = 0;
        this._bodies = [];
    }

    get appId() {
        return(this._appId);
    }

    set appId(nAppId) {
        this._appId = nAppId;
    }

    get sock() {
        if (this._sock != null) {
            return this._sock;
        } else {
            throw new Error('Sock undefined');
        }
    }

    set sock(nSock){
        if(nSock){
            this._sock = nSock;
        }
    }

    get frameCountBeforeRemoveBody() {
        return(this._frameCountBeforeRemoveBody);
    }

    set frameCountBeforeRemoveBody(nFrameCountBeforeRemoveBody) {
        this._frameCountBeforeRemoveBody = nFrameCountBeforeRemoveBody;
    }

    get animationFrameCount() {
        return(this._animationFrameCount);
    }

    set animationFrameCount(nAnimationFrameCount) {
        this._animationFrameCount = nAnimationFrameCount;
    }

    get bodies() {
        return(this._bodies);
    }

    set bodies(nBodies) {
        this._bodies = nBodies;
    }

    getBodyJointsColor() {
        let length = Object.keys(this._bodies).length;
        if (length > 8) {
            return '#'+Math.floor(Math.random()*16777215).toString(16);
        } else {
            return this._bodyJointsColor[length];
        }
    }

    removeBody(id) {
        console.log('body not displayed anymore');
        delete this._bodies[id];
    }
}

export default new GlobalVars();