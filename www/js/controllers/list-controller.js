// ==================== Controller List ==================================
angular.module('starter.controllers')
.controller('ListCtrl', function ($scope, $state,$cordovaOauth, $localStorage, $log, $location,$http,$ionicPopup, $firebaseObject, $firebaseAuth, Auth, FURL, Utils, $cordovaBarcodeScanner) {
  

// ******************************************** LOAD DATA *************************************************************************

  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in and currentUser will no longer return null.
      // buscar ID do usuário
      $scope.userId = Auth.get.user.id();

      // buscar minha Lista
      Auth.get.user.list($scope.userId).then(function(data) {
        $scope.$apply(function() {
          $scope.userList = data;
        });
      });

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


// ******************************************** ENTER ON VIEW *********************************************************************

    $scope.$on('$ionicView.enter', function(){

     console.log('NICE TO HAVE: ARRUMAR BUG DOS VÁRIOS CLIQUES NO CHECKBOX');

    });

// ******************************************** VIEW LOADED ***********************************************************************

    $scope.$on('$ionicView.loaded', function(){
        // aparecer os subIcones ao clicar no +
        $('.icon#addItem').click(function(){

          $('.iconSmallHolder').show();
          $('.linkSmall').toggleClass('Active');
          if($('.linkSmall').hasClass('Active')){
            $('.paginaLista .scroll').animate({opacity: 0.25},200);
            $('.totalLista').animate({opacity: 0.25},200);
            $('.iconsWrapper .iconsHolder .icon#addItem .iconAdd').addClass('rotated');
            
          }else{
            $('.paginaLista .scroll').animate({opacity: 1},200);
            $('.totalLista').animate({opacity: 1},200);
            $('.iconsWrapper .iconsHolder .icon#addItem .iconAdd').removeClass('rotated');
          }
        });
        //

        // desaparecer os subIcones ao clicar fora
        $('.paginaLista').click(function(){
          $('.paginaLista .scroll').animate({opacity: 1},200);
          $('.totalLista').animate({opacity: 1},200);
          $('.linkSmall').removeClass('Active');
          $('.iconsWrapper .iconsHolder .icon#addItem .iconAdd').removeClass('rotated');
        });
        //

    });

// ******************************************** lEAVE VIEW ************************************************************************

    $scope.$on('$ionicView.leave', function(){

      // hide small Icons if aren't
      $('.iconSmallHolder').hide();
      $('.paginaLista .scroll').animate({opacity: 1},200);
      $('.totalLista').animate({opacity: 1},200);
      $('.linkSmall').removeClass('Active');
      $('.iconsWrapper .iconsHolder .icon#addItem .iconAdd').removeClass('rotated');

    });


// ******************************************** LAST REPEAT ************************************************************************

    $scope.$on('onRepeatLast', function(){
        $('.pecasLista input:checkbox:checked').closest('.produto').detach().hide().prependTo('.paginaLista .listaChecked').addClass('produtoChecked').show();
            $('.paginaLista .listaChecked .qntdInput').attr('disabled', 'disabled');
             $('.paginaLista .listaNotChecked .qntdInput').removeAttr('disabled');
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
                    $(this).closest('.produto').detach().hide().prependTo('.paginaLista .listaChecked').addClass('produtoChecked').show(200);
                    $('.paginaLista .listaChecked .qntdInput').attr('disabled', 'disabled');
                    $('.paginaLista .listaNotChecked .qntdInput').removeAttr('disabled');
                } else {
                    $(this).closest('.produto').detach().hide().prependTo('.paginaLista .listaNotChecked').removeClass('produtoChecked').show(200);
                    $('.paginaLista .listaNotChecked .qntdInput').removeAttr('disabled');
                }
              });
            });
          //

          // Esconder listaChecked se não tiver item nela
          if($('.paginaLista .listaChecked .produto').length === 0){
            $('.paginaLista .listaChecked').hide();
            $('.paginaLista .listaNotChecked').css({"margin-bottom": "80px", "border-bottom": "2px solid #d2d2d2", "border-radius": "10px"});
          } else {
            $('.paginaLista .listaChecked').show();
            $('.paginaLista .listaNotChecked').css({"margin-bottom": "0px", "border-bottom": "0", "border-radius": "10px 10px 0 0"});
          }
          //

          // evitar inserir texto no input
          $('.qntdInput').keypress(function(event) {
            if(event.which < 44
            || event.which > 59) {
                event.preventDefault();
            } // prevent if not number/coma

            if(event.which == 44
            && $(this).val().indexOf(',') != -1) {
                event.preventDefault();
            } // prevent if already coma
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

// ******************************************** CÓDIGO DE BARRAS ********************************************************************

  $scope.scanBarcode = function() {
    $cordovaBarcodeScanner.scan().then(function(imageData) {
      alert(imageData.text);
      console.log("Barcode Format -> " + imageData.format);
      console.log("Cancelled -> " + imageData.cancelled);
    }, function(error) {
      alert("An error happened -> " + error);
    });
  };


// ******************************************** GET DATA ************************************************************************

// ======================= get product name =======================================

$scope.productName = function(productId){

    var result = $.grep($scope.listItens || [], function(e){ 
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

$scope.waterFootprint = function(productId,quantidade,checked){

    var result = $.grep($scope.listItens || [], function(e){ 
      return e.id == productId  ; 
    });

    var retorno='';

    

    if (result.length == 0) {
      retorno = 'nao achei';
    } else if (result.length > 0) {

      var conteudo = result[0].conteudo;
      var pegada = result[0].pegada;


      retorno = quantidade * conteudo * pegada;

      if(checked){
        

      }

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

    var result = $.grep($scope.listItens || [], function(e){ 
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


})

.directive('onLastRepeat', function() {
    return function(scope, element, attrs) {
        if (scope.$last) setTimeout(function(){
            scope.$emit('onRepeatLast', element, attrs);
        }, 1);
    };
    




})