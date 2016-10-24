angular.module('starter.controllers')

// ==================== Controller Search ==================================
.controller('SearchCtrl', function ($scope, $state,$cordovaOauth, $localStorage, $log, $location,$http,$ionicPopup, $firebaseObject, $firebaseAuth, Auth, FURL, Utils) {

  $scope.$on('$ionicView.loaded', function(){

  });


  $scope.$on('$ionicView.enter', function(){
    $scope.userData = Auth.get.user.id()

  });

  $scope.$on('$ionicView.leave', function(){

  });

  
  // id dos checkbox
      var produtosLista = $('.buscaPage .produtoBusca').length;
      var produto = $('.buscaPage .produtoBusca');
      var i = 1;
      produto.each(function(){
        $('.check', this).attr('id', 'check'+i);
        $("label", this).attr('for', 'check'+i);
        i++;
      });
  //


})