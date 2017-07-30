/**
 * GlobalVars
 * Class designed to allow access to "global" variables from other classes
 */

class GlobalVars {
    constructor() {
        this.webApps = [];
        this.webAppsCount = 0;

        this.kinectApps = [];
        this.kinectAppsCount = 0;
        this.reset();
    }

    reset() {

    }
}

module.exports = new GlobalVars();