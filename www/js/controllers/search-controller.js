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

        // buscar minha Lista
        Auth.get.user.list($scope.userId).then(function(data) {
          $scope.$apply(function() {
            $scope.userList = data;
            lista = $scope.userList

            console.log($scope.userList)
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
  };

  // ======================= Add Item =======================================

    $scope.addItem = function(id,quantidade,search){


     var newItemIndex = $scope.userList.length;
     

     console.log(search)

      
      firebase.database().ref('/users/' + $scope.userId + '/minhaLista/' + newItemIndex)
      .update({
        "checked" : false,
        "data" : "01/01/01",
        "idProduto" : id,
        "quantidade" : quantidade,
        "index": newItemIndex
      });

      // buscar minha Lista
      Auth.get.user.list($scope.userId).then(function(data) {
        $scope.$apply(function() {
          $scope.userList = data;
          lista = $scope.userList
        });
      });

    };

  // ******************************************** LAST REPEAT ************************************************************************
    $scope.$on('onRepeatLastSearch', function(){
  
      // evitar inserir texto no input
      $('.check').keypress(function(event) {
        if(event.which < 44 || event.which > 59) {
            event.preventDefault();
        } // prevent if not number/coma

        if(event.which == 44
        && $(this).val().indexOf(',') != -1) {
            event.preventDefault();
        } // prevent if already coma
      });

      // id dos checkbox
        var produtosLista = $('.buscaPage .produtoBusca').length;
        var produto = $('.buscaPage .produtoBusca');
        var i = 1;
        produto.each(function(){
          $('.check', this).attr('id', 'checkBusca'+i);
          $("label", this).attr('for', 'checkBusca'+i);
          i++;
        });

    })


})

.directive('onLastRepeatSearch', function() {
    return function(scope, element, attrs) {
        if (scope.$last) setTimeout(function(){
            scope.$emit('onRepeatLastSearch', element, attrs);
        }, 1);
    };
});