var app = angular.module('starter', ['ionic', 'ngStorage'])

app.run(function($ionicPlatform, $ionicPopup) {
  $ionicPlatform.ready(function() {
    if (window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      StatusBar.styleDefault();
    }
    if (ionic.Platform.isAndroid()) {
      admobid = { // for Android
        banner: 'ca-app-pub-2448092600279815/3093672681'
      };

      if (AdMob){
        AdMob.createBanner({
          adId: admobid.banner,
          position: AdMob.AD_POSITION.BOTTOM_CENTER,
          autoShow: true
        });
      }
    }
  });
});

app.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('index', {
      url: '/',
      templateUrl: 'views/home.html',
      controller: 'storage'
    })
    .state('add', {
      url: '/add',
      templateUrl: 'views/add.html',
      controller: 'storage'
    });
  $urlRouterProvider.otherwise('/');
});


app.controller("storage", ['$window', '$scope', '$localStorage', '$interval', '$timeout', function($window, $scope, $localStorage, $interval, $timeout) {

  $localStorage.$default({
    name: [{
      name: "fried chicked"
    }, {
      name: "French Fries"
    }]
  });


  $scope.listname = $localStorage.name || [];
  $scope.food = {};
  $scope.food.name = "Tap to random!"
  $scope.check = true;
  var interval;

  // Show hide Button text
  $scope.text = "Tap to random!";

  $scope.addName = function() {
    $scope.listname.push({
      name: $scope.name,
    });

    $scope.name = "";
    $localStorage.name = $scope.listname;
    $scope.listname = $localStorage.name;
  }

  $scope.remove = function(index) {
    $scope.listname.splice(index, 1);
    $localStorage.name = $scope.listname;

    $scope.listname = $localStorage.name;
  }

  $scope.random = function() {

    $scope.listname = $localStorage.name;

    if ($scope.check) {
      if ($scope.listname.length) {
        interval = $interval(function() {
          $scope.food = $scope.listname[Math.floor(Math.random() * $scope.listname.length)];
        }, 50);

        $scope.text = "Stop";
        $scope.check = false;

      } else {
        $scope.food = {
          name: "Add food please!"
        }
      }
    } else {
      $timeout(function() {
        //$scope.food = $scope.listname[Math.floor(Math.random() * $scope.listname.length)];
        $interval.cancel(interval);
      }, 0);

      $scope.text = "Tap to random!";
      $scope.check = true;
    }



  }

}]);
