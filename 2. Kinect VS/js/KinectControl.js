(function () {
    "use strict";

    var nsKinect = WindowsPreview.Kinect;

    // Laisser à 6 pour la Kinect V2, sinon erreur
    var constants = {
        bodyCount: 6
    };


    /**
     * KinectControl
     * Management class for Kinect
     */

    var kinectControl = WinJS.Class.define(
    function (bodyMapper) {
        this._bodyMapper = bodyMapper;
    },
    {
        getSensor: function () {
            var bodyCount = 6;

            this._sensor = nsKinect.KinectSensor.getDefault();
            this._sensor.open();

            this._bodies = new Array(constants.bodyCount);
            this._bodiesMapped = new Array(constants.bodyCount);

            // Instantiate BodyMapper objects
            for (bodyCount = 0; bodyCount < constants.bodyCount; bodyCount++) {
                this._bodiesMapped[bodyCount] = this._bodyMapper();
                this._bodiesMapped[bodyCount].init(bodyCount, this._sensor);
            }
        },
        openReader: function () {
            this._bodyReaderHandler = this._onBodyArrived.bind(this)
            this._bodyReader = this._sensor.bodyFrameSource.openReader();
            this._bodyReader.addEventListener('framearrived', this._bodyReaderHandler);
        },
        closeReader: function () {
            this._bodyReader.removeEventListener('framearrived', this._bodyReaderHandler);
            this._bodyReaderHandler = null;
            this._bodyReader.close();
            this._bodyReader = null;
        },
        releaseSensor: function () {
            this._bodies = null;
            this._bodiesMapped = null;
            this._sensor.close();
            this._sensor = null;
        },

        /**
         * Send body joints through socket
         */
        _onBodyArrived: function (e) {
            var frame = e.frameReference.acquireFrame();
            var i = 0;

            if (frame) {
                frame.getAndRefreshBodyData(this._bodies);
                for (i = 0; i < constants.bodyCount; i++) {
                    if (this._bodies[i].isTracked) {
                        var jointPositions = this._bodiesMapped[i].map(this._bodies[i]);
                        Sample.ServerHandler.send({
                            event: 'bodyJoints',
                            bodyId: this._bodies[i].trackingId,
                            joints: jointPositions
                        });
                    }
                }
                frame.close();
            }
        },
        _sensor: null,
        _bodyReader: null,
        _bodyReaderHandler: null,
        _bodies: null,
        _bodiesMapped: null
    }
    );

    WinJS.Namespace.define('Sample',
    {
        KinectControl: kinectControl
    }
);

})();