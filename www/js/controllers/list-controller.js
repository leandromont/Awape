// ==================== Controller List ==================================
angular.module('starter.controllers')
.controller('ListCtrl', function ($scope, $state,$cordovaOauth, $localStorage, $log, $location,$http,$ionicPopup, $firebaseObject, $firebaseAuth, Auth, FURL, Utils, $cordovaBarcodeScanner) {
  
// =============================== View enter ===========================================
    $scope.$on('$ionicView.enter', function(){

     console.log('NICE TO HAVE: ARRUMAR BUG DOS VÁRIOS CLIQUES NO CHECKBOX');

    });

    $scope.$on('$ionicView.loaded', function(){

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
        
      }, 800);
      

        // aparecer os subIcones ao clicar no +
        $('.icon#addItem').click(function(){
          $('.iconSmallHolder').show();
          $('.linkSmall').toggleClass('Active');
        });
        //

        // desaparecer os subIcones ao clicar fora
        $('.paginaLista').click(function(){
          $('.linkSmall').removeClass('Active');
        });
        //

    });


    $scope.$on('$ionicView.leave', function(){

      // hide small Icons if aren't
      $('.iconSmallHolder').hide();
      $('.linkSmall').removeClass('Active');

    });



    $scope.$on('onRepeatLast', function(){
        $('input:checkbox:checked').closest('.produto').detach().hide().prependTo('.listaChecked').addClass('produtoChecked').show();
            $('.listaChecked .qntdInput').attr('disabled', 'disabled');
             $('.listaNotChecked .qntdInput').removeAttr('disabled');


              var produtosLista = $('.paginaLista .produto').length;
              var produto = $('.paginaLista .produto');
              var i = 1;
              produto.each(function(){
                $('.check', this).attr('id', 'check'+i);
                $("label", this).attr('for', 'check'+i);
                i++;
              });
          //

          // checked or not checked - Change parent Div and add class
            $(".paginaLista .produto").each(function(){
              var checks = $("input:checkbox", this);
              checks.click(function() {
                if (checks.is(':checked')){ 
                    $(this).closest('.produto').detach().hide().prependTo('.listaChecked').addClass('produtoChecked').show(200);
                    $('.listaChecked .qntdInput').attr('disabled', 'disabled');
                    $('.listaNotChecked .qntdInput').removeAttr('disabled');

                } else {
                    $(this).closest('.produto').detach().hide().prependTo('.listaNotChecked').removeClass('produtoChecked').show(200);
                    $('.listaNotChecked .qntdInput').removeAttr('disabled');
                    $('.listaNotChecked .qntdInput').removeAttr('disabled');
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

          // evitar inserir texto no input
          $('.qntdInput').keypress(function(event) {
            if(event.which < 44
            || event.which > 59) {
                event.preventDefault();
            } // prevent if not number/dot

            if(event.which == 44
            && $(this).val().indexOf(',') != -1) {
                event.preventDefault();
            } // prevent if already dot
          });

          // flip no ícone de editar
          $('input.qntdInput').focusin(function() {
            console.log('teste');
            $('.iconsHolder').addClass('flipped');
            $('.iconSmallHolder').hide();
          });
          $('input.qntdInput').focusout(function() {
            console.log('teste');
            $('.iconsHolder').removeClass('flipped');
          });
        //
  //
      });

// ======================= Código de barras =======================================

  $scope.scanBarcode = function() {
    $cordovaBarcodeScanner.scan().then(function(imageData) {
      alert(imageData.text);
      console.log("Barcode Format -> " + imageData.format);
      console.log("Cancelled -> " + imageData.cancelled);
    }, function(error) {
      alert("An error happened -> " + error);
    });
  };

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

$scope.waterFootprint = function(productId,quantidade){

    var result = $.grep($scope.listItens, function(e){ 
      return e.id == productId  ; 
    });

    var retorno='';

    

    if (result.length == 0) {
      retorno = 'nao achei';
    } else if (result.length > 0) {

      var conteudo = result[0].conteudo;
      var pegada = result[0].pegada;


      retorno = quantidade * conteudo * pegada;

      $scope.listTotal += retorno;

    }
    
    return retorno;
}

// ======================= get waterFootprint Total =======================================

$scope.getListTotal = function(){

    retorno = $scope.listTotal;

    $scope.listTotal = 0;
    
    return retorno;
}

// ======================= get Unit =======================================

$scope.getUnit = function(productId){

    var result = $.grep($scope.listItens, function(e){ 
      return e.id == productId  ; 
    });

    var retorno='';
    if (result.length == 0) {
      retorno = 'nao achei';
    } else if (result.length > 0) {

      var unidade = result[0].unidade;

      retorno = unidade;
    }
    
    return retorno;
}

// ======================= Click checkbox =======================================

$scope.checkboxClick = function(checked, productId){
      
      if(checked){
        console.log("checked");
        retorno = checked;

      } else {
        console.log("not checked");
        retorno = checked;
      }
    
    return retorno;
}

// ======================= get Product ID for detail =======================================

$scope.setProductDetailId = function(productId){

  Auth.set.productId(productId)

}

// =============================== funções da lista ===========================================


})
.directive('onLastRepeat', function() {
    return function(scope, element, attrs) {
        if (scope.$last) setTimeout(function(){
            scope.$emit('onRepeatLast', element, attrs);
        }, 1);
    };
    




})