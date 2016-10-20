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


  // alterar a qntd ao clicar nos botões
  $('.produto').each(function(){
    var qntdDiv = $('span.qntd', this);
    var qntdProduto = qntdDiv.text();
    //botao mais
    $('#mais', this).click(function(){
      qntdProduto++;
      qntdDiv.text(qntdProduto);
    });
    //botao menos
    $('#menos', this).click(function(){
      qntdProduto--;
      qntdDiv.text(qntdProduto);
      // esconder o produto se chegar a 0
      if(qntdProduto === 0){
        $(this).closest('.produto').hide(300);
        console.log('saiu, fdp');
      }
    });
  });
  //


  $scope.$on('$ionicView.loaded', function(){

  });


  $scope.$on('$ionicView.enter', function(){
    $scope.userData = Auth.get.user.id()

  });

  $scope.$on('$ionicView.leave', function(){

  });

})