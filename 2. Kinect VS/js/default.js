(function () {
    "use strict";

    var app = WinJS.Application;
    var activation = Windows.ApplicationModel.Activation;

    app.onactivated = function (args) {
        if (args.detail.kind === activation.ActivationKind.launch) {
            var promise = WinJS.UI.processAll();

            promise.done(
              function () {
                  Sample.UIHandler.onGetSensor();
              }
            );

            args.setPromise(promise);
        }
    };

    app.start();




    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            readConfigFile(this);
        }
    };
    xhttp.open("GET", "config.xml", false);
    xhttp.send();

    /**
     * Read the config file for getting parameters (appId et node server ip)
     **/
    function readConfigFile(xml) {
        var appId = null;
        var nodeIp = null;

        var parser = new DOMParser();
        var configFile = parser.parseFromString(xml.responseText,"text/xml");
        var configValues = configFile.getElementsByTagName('app')[0].childNodes;

        for (var i = 0; i < configValues.length; i++) {
            switch (configValues[i].nodeName) {
                case 'appId':
                    appId = configValues[i].childNodes[0].nodeValue;
                    break;
                case 'nodeIp':
                    nodeIp = configValues[i].childNodes[0].nodeValue;
                    break;
            }
        }
        if (appId!=null && nodeIp!=null) {
            Sample.ServerHandler.initServer(appId, nodeIp);
        } else {
            console.log('Error : Incorrect config file');
        }

    }

})();
