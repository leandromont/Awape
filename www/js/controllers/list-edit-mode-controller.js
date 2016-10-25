angular.module('starter.controllers')

// ==================== Controller List edit mode ===========================
.controller('ListEditModeCtrl', function ($scope, $state,$cordovaOauth, $localStorage, $log, $location,$http,$ionicPopup, $firebaseObject, $firebaseAuth, Auth, FURL, Utils, $cordovaBarcodeScanner) {

  $scope.scanBarcode = function() {
    $cordovaBarcodeScanner.scan().then(function(imageData) {
      alert(imageData.text);
      console.log("Barcode Format -> " + imageData.format);
      console.log("Cancelled -> " + imageData.cancelled);
    }, function(error) {
      alert("An error happened -> " + error);
    });
  };


  $scope.$on('$ionicView.loaded', function(){

  });


  $scope.$on('$ionicView.enter', function(){
    // $scope.userData = Auth.get.user.id()

    //hide nav-bar and displau full height
    $('.tabs-striped .tabs').hide();
    $('.tutorial').css("height", "101vh");
    //
  });

  $scope.$on('$ionicView.leave', function(){

  });

})