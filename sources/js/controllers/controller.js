angular.module('usemediadb')
  .controller('MediaDBCtrl', function MediaDBCtrl($scope, $filter, mediaStorage) {

    $scope.state = '';
    $scope.items = [];
    $scope.itemCount = 0;

    $scope.$watch('items', (newValue, oldValue) => {
      $scope.itemCount = newValue.length || 0
    }, true);

    mediaStorage.registDBEventListener((state) => {

      $scope.$apply(() => $scope.state = state); // 変化が早いとerrorが発生する?

      switch (state) {
        case mediaStorage.Event.READY:
          mediaStorage.scan();
          break;
        case mediaStorage.Event.SCAN_END:
          mediaStorage.enumerateAll('metadata.title', null, null, (result) => {
            $scope.$apply(() => $scope.items = result);
          });
          break;
      }
    });

    $scope.scan = function() {
      $scope.items = [];
      mediaStorage.scan();
    };
  });
