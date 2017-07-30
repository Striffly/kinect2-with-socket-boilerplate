(function () {
    "use strict";

    var nsKinect = WindowsPreview.Kinect;

    var constants =
    {

    };

    /**
     * BodyMapper
     * Class used for mapping joints (see CoordinateMapper from Kinect SDK)
     */

    var bodyMapper = WinJS.Class.define(
    function () {
    },
    {
        init: function (index, sensor) {
            this._index = index;
            this._sensor = sensor;
            //Sample.BodyDrawerBase.prototype.init.call(this, index, sensor);

            this._sensorColourFrameDimensions = {};
            this._sensorColourFrameDimensions.width = this._sensor.colorFrameSource.frameDescription.width;
            this._sensorColourFrameDimensions.height = this._sensor.colorFrameSource.frameDescription.height;
        },
        map: function (body) {
            var that = this;
            var jointPositions = {};

            Iterable.forEach(body.joints,
                function (keyValuePair) {
                    var jointType = keyValuePair.key;
                    var joint = keyValuePair.value;
                    var isTracked = joint.trackingState === nsKinect.TrackingState.tracked;
                    var mappedPoint = that._mapPoint(joint.position);

                    if (that._isJointForDrawing(joint, mappedPoint)) {
                        jointPositions[jointType] = mappedPoint;
                    }
                }
            );
            return (jointPositions);
        },
        _mapPoint: function (point) {
            var colourPoint = this._sensor.coordinateMapper.mapCameraPointToColorSpace(
              point);

            colourPoint.x *= 1920 / this._sensorColourFrameDimensions.width;
            colourPoint.y *= 1080 / this._sensorColourFrameDimensions.height;

            return (colourPoint);
        },
        _isJointForDrawing: function (joint, point) {
            return (
              (joint.trackingState !== nsKinect.TrackingState.notTracked) &&
              (point.x !== Number.NEGATIVE_INFINITY) &&
              (point.y !== Number.POSITIVE_INFINITY));
        },
        _index: -1,
        _sensor: null
    }
    );

    WinJS.Namespace.define('Sample',
    {
        BodyMapper: bodyMapper
    }
    );

})();