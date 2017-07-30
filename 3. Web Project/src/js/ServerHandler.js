import SockJS from 'sockjs-client';

import GlobalVars from './GlobalVars';
import SocketSender from './libs/SocketSender';

import EventsHandler from './EventsHandler';
import ViewHandler from './ViewHandler';

/**
 * ServerHandler
 * Management class for socket events
 */

export default class ServerHandler {
    constructor() {
        this.viewHandler = new ViewHandler();
        this.eventsHandler = new EventsHandler();
    }

    reset() {
        this.isSockOpen = false;
        this.viewHandler.reset();
        this.eventsHandler.reset();
    }

    /**
     * Listen socket events
     */
    initServer() {
        GlobalVars.sock.onopen = (function () {
            console.log('sock open');
            this.isSockOpen = true;

            SocketSender.sendMessage({
                event: 'connect',
                type: 'webApp',
                appId: GlobalVars.appId,
            });

            GlobalVars.sock.onmessage = (function (message) {
                this.socketMessage(message);
            }).bind(this);

            GlobalVars.sock.onclose = (function () {
                this.socketClose();
            }).bind(this);
        }).bind(this);
    }

    /**
     * Execute an action when a socket event is received
     * @param message
     */
    socketMessage(message) {

        let msg = JSON.parse(message.data);
        if (!msg.event) throw "Invalid message format: " + msg;

        switch (msg.event) {
            case 'startApp':
                console.log('Application launched')
                this.viewHandler.onStartApplication();
                break;

            case 'appDisconnected':
                console.log('app disconnected');

                GlobalVars.reset();
                this.reset();
                break;

            case 'bodyJoints':
                this.eventsHandler.onReceiveBodyJoints(msg);
                break;
        }
    }

    /**
     * Action executed when the socket server is closed
     */
    socketClose() {
        console.log('sock close');

        GlobalVars.reset();
        this.reset();

        this.reconnect();
    }

    reconnect() {
        GlobalVars.sock = new SockJS(GlobalVars.sock.url);
        let timeout = setTimeout(function(){
            if (!this.isSockOpen) {
                this.reconnect()
            }
        }.bind(this), 3000);
        clearTimeout(timeout);
    }

}