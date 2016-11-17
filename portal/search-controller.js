function closeBusca(){
    $j('.buscaPage').hide();
    $j('.paginaLista').show();

  };

angular.module('starter.controllers')

// ==================== Controller Search ==================================
.controller('SearchCtrl', function ($scope, $state, $localStorage, $log, $location,$http, $firebaseObject, $firebaseAuth, Auth, Utils) {



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

          });
        });

      } else {
        // No user is signed in.
        // $location.path("/login");
      }
    });

  // ======================= get waterFootprint =======================================
    $scope.waterFootprint = function(productId,quantidade){

      var result = $j.grep($scope.listItens || [], function(e){ 
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

      var newItemIndex = moment().valueOf();
    
      firebase.database().ref('/users/' + $scope.userId + '/minhaLista/id' + newItemIndex)
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

      $route.reload();

      $j('.adicionaProdutoConfirmation').removeClass('zoomOut').addClass('animatedFast zoomIn').css({'opacity': '1', 'display': 'block'}).delay(1500).queue(function(){
        $j('.adicionaProdutoConfirmation').removeClass('zoomIn').addClass('zoomOut');
        $j(this).dequeue().delay(350).queue(function(){
          $j('.adicionaProdutoConfirmation').css({'opacity': '0', 'display': 'none'});
          $scope.$apply();
          $j(this).dequeue();
        });
      });

      

    };

  // ******************************************** LAST REPEAT ************************************************************************
    $scope.$on('onRepeatLastSearch', function(){
  
      // evitar inserir texto no input
      $j('.check').keypress(function(event) {
        if(event.which < 44 || event.which > 59) {
            event.preventDefault();
        } // prevent if not number/coma

        if(event.which == 44
        && $j(this).val().indexOf(',') != -1) {
            event.preventDefault();
        } // prevent if already coma
      });

      // id dos checkbox
        var produtosLista = $j('.buscaPage .produtoBusca').length;
        var produto = $j('.buscaPage .produtoBusca');
        var i = 1;
        produto.each(function(){
          $j('.check', this).attr('id', 'checkBusca'+i);
          $j("label", this).attr('for', 'checkBusca'+i);
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