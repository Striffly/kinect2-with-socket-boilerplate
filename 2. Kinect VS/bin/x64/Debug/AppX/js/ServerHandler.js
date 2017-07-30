(function () {
    "use strict";

    /**
     * ServerHandler
     * Management class for socket events (with socket message sending function)
     */

    var ServerHandler = WinJS.Class.define(
    function () {
    },
    {
        initServer: function (appId, nodeIp) {
            this.appId = appId;
            this.nodeIp = nodeIp;

            this.sock = new SockJS(this.nodeIp);
            this.sock.onopen = this._onOpen.bind(this);
        },

        send: function (message) {
            if (this.sockOpen) { 
                this.sock.send(JSON.stringify(message));
            }
        },

        _onOpen: function () {
            console.log('sock open');
            this.sockOpen = true;

            this.send({
                event: 'connect',
                type: 'kinectApp',
                appId: this.appId
            });
            this.sock.onmessage = (function (message) {
                this._onMessage(message);
            }).bind(this);
            this.sock.onclose = this._onClose.bind(this);
        },

        _onMessage: function(message) {
            let msg = JSON.parse(message.data);
            switch (msg.event) {
                case 'appConnected':
                    console.log("Application connectée");
                    break;
                case 'appDisconnected':
                    Sample.UIHandler.onCloseReader();
                    console.log("Application déconnectée");
                    break;
                case 'startApp':
                    Sample.UIHandler.onOpenReader();
                    console.log("Application lancée");
                    break;
            }
        },

        _onClose: function() {
            console.log('sock close');
            this.sockOpen = false;
        },

        sock: null,
        sockOpen: false,
        appId: null,
        nodeIp: null,
    }
    );

    WinJS.Namespace.define('Sample',
    {
        ServerHandler: new ServerHandler()
    }
);

})();