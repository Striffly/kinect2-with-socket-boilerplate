import GlobalVars from '../GlobalVars';

/**
 * SocketSender
 * Class used for sending socket message
 */

class SocketSender {
    constructor() {

    }

    sendMessage(msg) {
        if (GlobalVars.sock !== null) {
            GlobalVars.sock.send(JSON.stringify(msg));
        }
    }
}

export default new SocketSender();