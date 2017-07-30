import SockJS from 'sockjs-client';
import GlobalVars from './GlobalVars';
import ServerHandler from './ServerHandler';

window.onload = function() {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            readConfigFile(this);
        }
    };
    xhttp.open("GET","config.xml", true);
    xhttp.send();
};


/**
 * Retrieves the parameters contained in the config file
 * @param xml
 */
function readConfigFile(xml) {
    let appId = null;
    let nodeIp = null;

    let parser = new DOMParser();
    let configFile = parser.parseFromString(xml.responseText,"text/xml");
    let configValues = configFile.getElementsByTagName('app')[0].childNodes;

    for (let i = 0; i < configValues.length; i++) {
        switch (configValues[i].nodeName) {
            case 'appId':
                appId = configValues[i].childNodes[0].nodeValue;
                break;
            case 'nodeIp':
                nodeIp = configValues[i].childNodes[0].nodeValue;
                break;
        }
    }
    if (appId !== null && nodeIp !== null) {
        initApp(appId, nodeIp);
    } else {
        console.log('Error : Incorrect config file');
    }
}

/**
 * Instantiate sock server connection from config datas
 * @param appId
 * @param nodeIp
 */
function initApp(appId, nodeIp) {
    console.log('InviApp initiated...');

    GlobalVars.sock = new SockJS(nodeIp);
    GlobalVars.appId = appId;

    let serverHandler = new ServerHandler();
    serverHandler.initServer();

    /**
     * For test purpose
     * With this, you can access these variables from your browser's console
     * */
    window.ServerHandler = serverHandler;
    window.ViewHandler = serverHandler.viewHandler;
    window.GlobalVars = GlobalVars;
}