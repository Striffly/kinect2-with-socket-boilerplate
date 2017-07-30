import GlobalVars from './GlobalVars';
import Body from "./libs/Models/Body";

/**
 * EventsHandler
 * Management class for datas, event transmission and actions processing
 */
export default class EventsHandler {

    constructor() {
        this.reset();
    }

    reset() {

    }

    /**
     * Update bodies datas (joints and removeFrame number) from kinect datas
     * @param msg
     */
    onReceiveBodyJoints(msg) {
        //console.log(msg);
        if(typeof GlobalVars.bodies[msg.bodyId] === 'undefined') {
            GlobalVars.bodies[msg.bodyId] = new Body(GlobalVars.getBodyJointsColor());
        }
        GlobalVars.bodies[msg.bodyId].removeFrame = GlobalVars.animationFrameCount + GlobalVars.frameCountBeforeRemoveBody;
        GlobalVars.bodies[msg.bodyId].joints = msg.joints;
    }
}