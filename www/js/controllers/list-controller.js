// ==================== Controller List ==================================
angular.module('starter.controllers')
.controller('ListCtrl', function ($scope, $state,$cordovaOauth, $localStorage, $log, $location,$http,$ionicPopup, $firebaseObject, $firebaseAuth, Auth, FURL, Utils) {
  
// =============================== View enter ===========================================
    $scope.$on('$ionicView.enter', function(){

      // buscas no banco de dados
      setTimeout(function(){
            // buscar ID do usuário
            $scope.userId = Auth.get.user.id();

            // buscar minha Lista
            Auth.get.user.list($scope.userId).then(function(data) {
              $scope.userList = data;
            });

            // buscar itens da lista
            Auth.get.listItens().then(function(resposta) {
              $scope.listItens = resposta;

            });
          
        }, 500);

    });

// ======================= get product name =======================================

$scope.productName = function(productId){

    var result = $.grep($scope.listItens, function(e){ 
      return e.id == productId  ; 
    });

    var retorno='';
    if (result.length == 0) {
      retorno = 'nao achei';
    } else if (result.length > 0) {
      retorno = result[0].produto;
    }

    return retorno;
}

// ======================= get waterFootprint =======================================

$scope.waterFootprint = function(productId){

    var result = $.grep($scope.listItens, function(e){ 
      return e.id == productId  ; 
    });

    var retorno='';
    if (result.length == 0) {
      retorno = 'nao achei';
    } else if (result.length > 0) {
      retorno = result[0].produto;
    }
    
    return retorno;
}


// =============================== funções da lista ===========================================

  // id dos checkbox
      var produtosLista = $('.produto').length;
      var produto = $('.produto');
      var i = 1;
      produto.each(function(){
        $('.check', this).attr('id', 'check'+i);
        $("label", this).attr('for', 'check'+i);
        i++;
      });
  //

  // checked or not checked - Change parent Div and add class
    $(".produto").each(function(){
      var checks = $("input:checkbox", this);
      checks.click(function() {
        if (checks.is(':checked')){ 
            $(this).closest('.produto').detach().hide().prependTo('.listaChecked').addClass('produtoChecked').show(200);
        } else {
            $(this).closest('.produto').detach().hide().prependTo('.listaNotChecked').removeClass('produtoChecked').show(200);
        }
        // Esconder listaChecked se não tiver item nela
        if($('.listaChecked .produto').length === 0){
          $('.listaChecked').hide();
          $('.listaNotChecked').css({"margin-bottom": "80px", "border-bottom": "2px solid #d2d2d2", "border-radius": "10px"});
        } else {
          $('.listaChecked').show();
          $('.listaNotChecked').css({"margin-bottom": "0px", "border-bottom": "0", "border-radius": "10px 10px 0 0"});
        }
        //
      });
    });
  //

  // flip no ícone de editar
    $('#icons').click(function() {
      $(this).toggleClass('flipped');
    });
  //

  

});