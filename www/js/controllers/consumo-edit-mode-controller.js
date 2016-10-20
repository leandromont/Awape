angular.module('starter.controllers')
// ==================== Controller Consumo edit mode =============================
.controller('ConsumoEditModeCtrl', function ($scope, $state,$cordovaOauth, $localStorage, $log, $location,$http,$ionicPopup, $firebaseObject, $firebaseAuth, Auth, FURL, Utils) {
  
  $scope.$on('$ionicView.loaded', function(){

  });

  $scope.$on('$ionicView.enter', function(){
     $scope.userData = Auth.get.user.id()
  });

  $scope.$on('$ionicView.leave', function(){
    
  });


})