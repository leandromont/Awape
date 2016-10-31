angular.module('starter.controllers')

// ==================== Controller Preferences ==================================
.controller('PreferencesCtrl', function ($scope, $state,$cordovaOauth, $localStorage, $log, $location,$http,$ionicPopup, $firebaseObject, $firebaseAuth, Auth, FURL, Utils) {

  $scope.$on('$ionicView.loaded', function(){
      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          // User is signed in and currentUser will no longer return null.

        } else {
          // No user is signed in.
          $location.path("/login");
        }
      });
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