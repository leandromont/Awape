angular.module('starter.controllers')

// ==================== Controller Search ==================================
.controller('SearchCtrl', function ($scope, $state,$cordovaOauth, $localStorage, $log, $location,$http,$ionicPopup, $firebaseObject, $firebaseAuth, Auth, FURL, Utils) {

// ******************************************** LOAD DATA *************************************************************************

  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in and currentUser will no longer return null.
      // buscar ID do usuário
      $scope.userId = Auth.get.user.id();


      // buscar itens da lista
      Auth.get.listItens().then(function(resposta) {
        $scope.$apply(function() {
          $scope.listItens = resposta;
        });
      });

    } else {
      // No user is signed in.
      $location.path("/login");
    }
  });

// ******************************************** LOADED VIEW *************************************************************************
  $scope.$on('$ionicView.loaded', function(){

  });

// ******************************************** ENTER VIEW *************************************************************************
  $scope.$on('$ionicView.enter', function(){

  });

// ******************************************** LEAVE VIEW *************************************************************************
  $scope.$on('$ionicView.leave', function(){

  });

  // ******************************************** FUNCTIONS *************************************************************************
  // id dos checkbox
      var produtosLista = $('.buscaPage .produtoBusca').length;
      var produto = $('.buscaPage .produtoBusca');
      var i = 1;
      produto.each(function(){
        $('.check', this).attr('id', 'checkBusca'+i);
        $("label", this).attr('for', 'checkBusca'+i);
        i++;
      });
  //


// ======================= get waterFootprint =======================================
  $scope.waterFootprint = function(productId,quantidade){

    var result = $.grep($scope.listItens || [], function(e){ 
      return e.id == productId  ; 
    });

    var retorno='';

    

    if (result.length == 0) {
      retorno = 'nao achei';
    } else if (result.length > 0) {

      var conteudo = result[0].conteudo;
      var pegada = result[0].pegada;
      var totalGasto = quantidade * conteudo * pegada;
      var totalZerado = totalGasto.toFixed(0);
      var totalNumeroZerado = parseInt(totalZerado);
      retorno = totalNumeroZerado;

    }
    
    return retorno;
}


})