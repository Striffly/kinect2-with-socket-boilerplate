let http    = require('http'),
    express = require('express'),
    sockjs  = require('sockjs'),

    GlobalVars = require('./GlobalVars'),
    SocketSender = require('./SocketSender'),

    WebApp = require('./Models/WebApp'),
    KinectApp = require('./Models/KinectApp');

/**
 * ServerHandler
 * Management class for socket events
 */

class ServerHandler {
    constructor() {
        this.socketServer = null;
        this.reset();
    }

    reset() {
        GlobalVars.reset();
        this.isAppLaunched = false;
    }

    /**
     * Instantiate the Node server
     */
    initSockServer() {
        let sockjs_opts = {sockjs_url: "http://cdn.jsdelivr.net/sockjs/1.0.1/sockjs.min.js"};
        this.socketServer = sockjs.createServer(sockjs_opts);

        this.socketServer.on('connection', (function(socket) {
            socket.on('data', (function(message) {
                this.socketMessage(socket, message);
            }).bind(this));
            socket.on('close', (function() {
                this.socketClose(socket);
            }).bind(this));
        }).bind(this));
    }


    /**
     * Instantiate the Express server
     */
    initExpressServer() {
        let app = express(); /* express.createServer will not work here */
        let server = http.createServer(app);

        this.socketServer.installHandlers(server, {prefix:'/node'});

        console.log(' [*] Listening on 0.0.0.0:9999' );
        server.listen(9999, '0.0.0.0');

        app.get('/', function (req, res) {
            res.send('Socket server functionnal');
            //res.sendfile(__dirname + '/index.html');
        });
    }


    /**
     * Manage the received socket messages
     * @param socket
     * @param message
     */
    socketMessage(socket, message) {
        let msg = JSON.parse(message);
        if (!msg.event) throw "Invalid message format: " + msg;

        switch(msg.event) {

            case 'connect':
                console.log(msg.type+" connected");
                switch (msg.type) {

                    case 'webApp':
                        GlobalVars.webApps[socket.id] = new WebApp(socket, msg.appId);
                        GlobalVars.webAppsCount++;
                        if (GlobalVars.kinectAppsCount == 1) {
                            this.createKinectConnections();
                        }
                        //console.log(this.webApps);
                        break;

                    case 'kinectApp':
                        GlobalVars.kinectApps[socket.id] = new KinectApp(socket, msg.appId);
                        GlobalVars.kinectAppsCount++;

                        if (GlobalVars.webAppsCount == 1) {
                            this.createKinectConnections();
                        }
                        break;
                }
                break;

            case 'bodyJoints':
                msg.appId = GlobalVars.kinectApps[socket.id].appId;

                SocketSender.sendMessage({
                    group: "webApps",
                    msg: msg
                });
                break;

            case 'reset':
                this.reset();
                break;
        }

    }

    /**
     * Function called when the node server is closed
     * @param socket
     */
    socketClose(socket) {
        this.reset();
        this.isAppLaunched = false;

        if(GlobalVars.webApps.hasOwnProperty(socket.id)) {
            delete GlobalVars.webApps[socket.id];
            if (GlobalVars.webApps == -1) {
                GlobalVars.webApps = [];
            }
            GlobalVars.webAppsCount--;

            for (let key in GlobalVars.kinectApps) {
                if (GlobalVars.kinectApps[key].sendTo == socket.id) {
                    GlobalVars.kinectApps[key].sendTo == null;
                    SocketSender.sendMessage({
                        group: "kinectApps",
                        key: key,
                        msg: {
                            event: 'appDisconnected'
                        }
                    });
                }
            }
            console.log('webApp disconnected');
        }

        if(GlobalVars.kinectApps.hasOwnProperty(socket.id)) {
            delete GlobalVars.kinectApps[socket.id];
            if (GlobalVars.kinectApps == -1) {
                GlobalVars.kinectApps = [];
            }
            GlobalVars.kinectAppsCount--;

            console.log('kinectApp disconnected');
        }


        SocketSender.sendMessage({
            group: "webApps",
            msg: {
                event: 'appDisconnected'
            }
        });
    }


    /**
     * Assotiate the Kinect apps with the Web apps
     */
    createKinectConnections() {
        console.log('Creating kinect connections...');

        let kinectsOpCount = 0;
        for (let kinectKey in GlobalVars.kinectApps) {
            //console.log(GlobalVars.kinectApps[kinectKey]);
            if (GlobalVars.kinectApps[kinectKey].sendTo == null) {
                for (let webKey in GlobalVars.webApps) {
                    if (GlobalVars.webApps[webKey].appId == GlobalVars.kinectApps[kinectKey].appId) {
                        GlobalVars.kinectApps[kinectKey].sendTo = webKey;
                        kinectsOpCount++;
                        SocketSender.sendMessage({
                            group: "kinectApps",
                            key: kinectKey,
                            msg: {
                                event: 'appConnected'
                            }
                        });
                    }
                }
            } else {
                kinectsOpCount++;
            }
        }

        if (kinectsOpCount == 1) {
            this.kinectConnectState = true;
            console.log('Kinect connections OP');
            this.launchApp();
        } else {
            console.log("Error: Can't connect all Kinect to a WebApp.");
        }

    }

    /**
     * Launch applications when they are all associated (kinectApps with webApps)
     */
    launchApp() {
        if (!this.isAppLaunched && this.kinectConnectState) {
            this.isAppLaunched = true;

            SocketSender.sendMessage({
                group: "kinectApps",
                msg: {
                    event: 'startApp'
                }
            });
            SocketSender.sendMessage({
                group: "webApps",
                msg: {
                    event: 'startApp'
                }
            });
            console.log("Application launched");
        }
    }
}

module.exports = ServerHandler;