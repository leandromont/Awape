angular.module('starter.controllers')

// ==================== Controller Preferences ==================================
.controller('PreferencesCtrl', function ($scope, $state,$cordovaOauth, $localStorage, $log, $location,$http,$ionicPopup, $firebaseObject, $firebaseAuth, Auth, FURL, Utils) {

  $scope.$on('$ionicView.loaded', function(){

  });
  
  $scope.$on('$ionicView.enter', function(){
     $scope.userData = Auth.get.user.id()
  });

  $scope.$on('$ionicView.leave', function(){
   
  });


  $scope.logOut = function () {
    firebase.auth().signOut().then(function() {
      $location.path("/login");
    }, function(error) {
      console.error('Sign Out Error', error);
    });
  }


})