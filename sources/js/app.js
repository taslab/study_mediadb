angular.module('usemediadb', []);


window.addEventListener('load', function() {
  // Set the 'lang' and 'dir' attributes to < html > when the page is translated
  document.documentElement.lang = navigator.mozL10n.language.code;
  document.documentElement.dir = navigator.mozL10n.language.direction;

});
// const MEDIADB_TYPE = 'music';
// var app = angular.module('useMediaDBApp', []);
// app.controller('mediadbCtrl', ['$scope',
//     function($scope) {
//         $scope.mediadb = {
//             status: 'aaaasssaa'
//         };
//     }
// ]);

// var musicdb;

// window.addEventListener('localized', onLocalized);

// function onLocalized(event) {

//     // Set the 'lang' and 'dir' attributes to <html> when the page is translated
//     document.documentElement.lang = navigator.mozL10n.language.code;
//     document.documentElement.dir = navigator.mozL10n.language.direction;

//     if (!musicdb) {
//         initializeMediaDB();
//     }
// }

// function initializeMediaDB() {

// }
