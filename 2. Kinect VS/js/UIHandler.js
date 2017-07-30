(function () {
    "use strict";

    var UIHandler = WinJS.Class.define(
        function () {
        },
        {
            onGetSensor: function () {
                this._controller = new Sample.KinectControl(
                    function () {
                        return (
                            new Sample.BodyMapper
                        );
                    }
                );
                this._controller.getSensor();
            },
            onOpenReader: function () {
                this._controller.openReader();
            },
            onCloseReader: function () {
                this._controller.closeReader();
            },
            onReleaseSensor: function () {
                this._controller.releaseSensor();
            },
            _controller: null
        }
    );

    WinJS.Namespace.define('Sample',
    {
        UIHandler: new UIHandler()
    });

})();