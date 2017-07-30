import GlobalVars from './GlobalVars';

/**
 * ViewHandler
 * Management class for view events and actions
 */
export default class ViewHandler {
    constructor() {
        this.cBodyJoints = document.getElementById('canvasBodyJoints');
        this.cBodyJointsContext = this.cBodyJoints.getContext("2d");

        this.reset();
    }

    reset() {
        this.switchDrawJoints = false;
        this.cBodyJointsContext.clearRect(0, 0, 1920, 1080);
    }

    /**
     * Function to call when application start socket event is received
     */
    onStartApplication() {
        this.switchDrawJoints = true;
        this.animationFrame();
    }

    /**
     * Request animation frame for canvas drawing
     */
    animationFrame() {
        requestAnimationFrame(this.animationFrame.bind(this));
        if (this.switchDrawJoints) {
            GlobalVars.animationFrameCount++;
            this.drawBodyJoints();
        }

    }

    /**
     * Body joint drawing method
     */
    drawBodyJoints() {
        this.cBodyJointsContext.clearRect(0, 0, 1920, 1080);
        Object.keys(GlobalVars.bodies).forEach(function(i) {
            let body = GlobalVars.bodies[i];

            /** Check if current body is inactive **/
            if (body.removeFrame <= GlobalVars.animationFrameCount) {
                GlobalVars.removeBody(i);
                return;
            }

            /** Draw body joints into canvas **/
            Object.keys(body.joints).forEach(function(j) {
                this.cBodyJointsContext.beginPath();
                this.cBodyJointsContext.fillStyle = body.fillColor;
                this.cBodyJointsContext.arc(body.joints[j].x, body.joints[j].y, 20, 0, 2 * Math.PI, false);
                this.cBodyJointsContext.fill();
            }.bind(this));
        }.bind(this));
    }
}