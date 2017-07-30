let GlobalVars = require('./GlobalVars');

/**
 * SocketSender
 * Class used for sending socket message
 */
class SocketSender {
    constructor() {
    }

    sendMessage(params) {
        let group = null;
        switch(params.group) {
            case 'webApps':
                group = GlobalVars.webApps;
                break;
            case 'kinectApps':
                group = GlobalVars.kinectApps;
                break;
        }
        if (group!=null) {
            if (typeof params.key !== 'undefined' && params.key != null) {
                group[params.key].socket.write(JSON.stringify(params.msg));
            } else {
                for (let key in group) {
                    if (typeof params.exclude !== 'undefined') {
                        if (key!=params.exclude) {
                            group[key].socket.write(JSON.stringify(params.msg));
                        }
                    } else {
                        group[key].socket.write(JSON.stringify(params.msg));
                    }
                }
            }
        }
    }
}

module.exports = new SocketSender();