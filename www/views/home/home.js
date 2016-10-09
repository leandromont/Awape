'Use Strict';
angular.module('starter').controller('homeController', function ($scope, $state,$cordovaOauth, $localStorage, $log, $location,$http,$ionicPopup, $firebaseObject, $firebaseAuth, Auth, FURL, Utils) {
  var ref = firebase.database().ref();
  $scope.authObj = $firebaseAuth();

  $scope.logOut = function () {
      Auth.logout();
      $location.path("/login");
  }
  
  $scope.profile = function () {
      $location.path("/profile");
  }

  $scope.checkUser = function () {
    var firebaseUser = $scope.authObj.$getAuth();

    if (firebaseUser) {
    $log.log("Signed in as:", firebaseUser.uid);
    } else {
    $log.log("Signed out");
    $location.path("/login");
    }

  }
}
);
