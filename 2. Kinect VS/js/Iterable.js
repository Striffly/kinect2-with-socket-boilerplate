(function () {
    "use strict";

    WinJS.Namespace.define(
      'Iterable',
      {
          forEach: function (iterable, lambda) {
              var iterator = iterable.first();

              while (iterator.hasCurrent) {
                  lambda(iterator.current);
                  iterator.moveNext();
              }
          }
      }
    );
})();