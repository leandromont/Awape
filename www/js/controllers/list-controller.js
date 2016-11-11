// ==================== Controller List ==================================
angular.module('starter.controllers')
.controller('ListCtrl', function ($scope, $state,$cordovaOauth, $localStorage, $log, $location,$http,$ionicPopup, $firebaseObject, $firebaseAuth, Auth, FURL, Utils, $cordovaBarcodeScanner) {
  

   function deleteAnimation(){  

      // click and hold to delete product + animation
      $('.listaNotChecked .produto').each(function(){
        var timeoutId = 0;
        var produtoThis = $(this);
        var itemNome = $('.nomeProduto', this);
        var labelThis = $('label', this);
        var qntdThis = $('.qntdInput', this)
        var unidThis = $('.unid', this);
        var gastoThis = $('.gastoProduto', this);

        itemNome.mousedown(function() {
            timeoutId = setTimeout(deleteItem, 10);
        }).bind('mouseup mouseleave', function() {
            
            labelThis.removeClass('holding');
            produtoThis.removeClass('holding');
            itemNome.removeClass('holding');
            qntdThis.removeClass('holding');
            unidThis.removeClass('holding');
            gastoThis.removeClass('holding');
            clearTimeout(timeoutId);
        });

        function deleteItem() {
          $scope.selectedItem = produtoThis;
          labelThis.addClass('holding');
          produtoThis.addClass('holding');
          qntdThis.addClass('holding');
          unidThis.addClass('holding');
          gastoThis.addClass('holding');
          itemNome.addClass('holding').delay(1500).queue(function(){
            // remove classes after 1.5 seconds
            labelThis.removeClass('holding');
            produtoThis.removeClass('holding');
            itemNome.removeClass('holding');
            qntdThis.removeClass('holding');
            unidThis.removeClass('holding');
            gastoThis.removeClass('holding');
            clearTimeout(timeoutId);
            $(this).dequeue();
            //
          });
          
          
        };

        $('.deletaProduto .botao').click(function(){
        $('.deletaProdutoWrapper').stop(false,true).hide(50);
        });
      });
      //
    };


// ******************************************** LOAD DATA *************************************************************************

  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in and currentUser will no longer return null.
      // buscar ID do usuário
      $scope.userId = Auth.get.user.id();

      console.log($scope.userId)

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



    });

// ******************************************** VIEW LOADED ***********************************************************************

    $scope.$on('$ionicView.loaded', function(){
        

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










// aparecer os subIcones ao clicar no +
$('.icon#addItem').click(function(){
  // somente se não tiver a classe flipped no iconsHolder
  if($('.iconsHolder').hasClass('flipped')){
  }else{
    $('.iconSmallHolder').show();
    $('.linkSmall').toggleClass('Active');
    // animacoes ao clicar - ativo
    if($('.linkSmall').hasClass('Active')){
      $('.paginaLista .scroll').animate({opacity: 0.25},200);
      $('.totalLista').animate({opacity: 0.25},200);
      $('.iconsWrapper .iconsHolder .icon#addItem .iconAdd').addClass('rotated');
    //
    }else{
      // animacoes ao clicar - desativo
      $('.paginaLista .scroll').animate({opacity: 1},200);
      $('.totalLista').animate({opacity: 1},200);
      $('.iconsWrapper .iconsHolder .icon#addItem .iconAdd').removeClass('rotated');
      //
    }
  }
  //
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

        

// ******************************************** LAST REPEAT ************************************************************************

    $scope.$on('onRepeatLast', function(){

      // Fazer o básico da lista funcionar
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

          // Esconder listaChecked se não tiver item nela no ínicio de tudo
          if($('.paginaLista .listaChecked .produto').length === 0){
            $('.paginaLista .listaChecked').hide();
            $('.paginaLista .listaNotChecked').css({"margin-bottom": "80px", "border-bottom": "2px solid #d2d2d2", "border-radius": "10px"});
          } else {
            $('.paginaLista .listaChecked').show();
            $('.paginaLista .listaNotChecked').css({"margin-bottom": "0px", "border-bottom": "0", "border-radius": "10px 10px 0 0"});
          }
          //

          // checked or not checked - Change parent Div and add class
            $(".paginaLista .produto").each(function(){
              var checks = $("input:checkbox", this);
              checks.click(function() {
                if (checks.is(':checked')){
                    $(this).closest('.produto').detach().hide().prependTo('.paginaLista .listaChecked').removeClass('fadeInRight').addClass('produtoChecked animatedFast fadeInLeft').show();
                    $('.paginaLista .listaChecked .qntdInput').attr('disabled', 'disabled');
                    $('.paginaLista .listaNotChecked .qntdInput').removeAttr('disabled');
                } else {
                    $(this).closest('.produto').detach().hide().prependTo('.paginaLista .listaNotChecked').removeClass('fadeInLeft produtoChecked').addClass('animatedFast fadeInRight').show();
                    $('.paginaLista .listaNotChecked .qntdInput').removeAttr('disabled');
                }
                // Esconder listaChecked se não tiver item nela a cada clique
                if($('.paginaLista .listaChecked .produto').length === 0){
                  $('.paginaLista .listaChecked').hide();
                  $('.paginaLista .listaNotChecked').css({"margin-bottom": "80px", "border-bottom": "2px solid #d2d2d2", "border-radius": "10px"});
                } else {
                  $('.paginaLista .listaChecked').show();
                  $('.paginaLista .listaNotChecked').css({"margin-bottom": "0px", "border-bottom": "0", "border-radius": "10px 10px 0 0"});
                }
                deleteAnimation();
                //
              });
            });
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

          // animacao para avermelhar se ficar acima de 4 itens
          $('.qntdInput').keypress(function(){
            if ($('.qntdInput').val().length === 4){
              $(this).addClass('fullLength').delay(750).queue(function(){
                $(this).removeClass('fullLength');
                $(this).dequeue();
              })
          }
          });
          //

          // flip no ícone de editar e esconder
          $('input.qntdInput').focusin(function() {
            $('.iconsHolder').addClass('flipped');
            $('.iconSmallHolder').hide();
            $('.totalLista').hide();
            $('.tabs-striped .tabs').hide();
          });
          $('input.qntdInput').focusout(function() {
            $('.iconsHolder').removeClass('flipped');
            $('.totalLista').show();
            $('.tabs-striped .tabs').show();
          });
        //     

       
        deleteAnimation();

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
      var totalGasto = quantidade * conteudo * pegada;
      var totalZerado = totalGasto.toFixed(0);
      var totalNumeroZerado = parseInt(totalZerado);
      retorno = totalNumeroZerado;

      if(checked){
        
        $scope.listTotal += retorno;

      }


    }
    
    return retorno;
}

// ======================= get waterFootprint Total =======================================

$scope.getListTotal = function(){
  if($scope.listTotal != null || $scope.listTotal != undefined){

    // arrumar leitura dos números
      var textoTotal = $scope.listTotal.toString();
      var totalLength = textoTotal.length;
      // milhoes
      if(totalLength > 6){
        var totalMilhao = textoTotal.substring(0, totalLength-6);
        var totalMil = textoTotal.substring(totalMilhao.length, totalLength-5);
        if (totalMil === "0"){
          var totalEsquema = totalMilhao;
        } else {
          var totalEsquema = totalMilhao + "," + totalMil;
        }
        if (totalMilhao > 1){
          var totalAparecer = totalEsquema+" milhões de lts";
        } else {
          var totalAparecer = totalEsquema+" milhão de lts";
        }

      // mil
      } else if(totalLength > 3){
        var totalMil = textoTotal.substring(0, totalLength-3);
        var totalCem = textoTotal.substring(totalMil.length, totalLength-2);

        if (totalCem === "0"){
          var totalEsquema = totalMil;
        } else {
          var totalEsquema = totalMil + "," + totalCem;
        }
        var totalAparecer = totalEsquema+" mil litros";

      // cem
      } else {
        var totalEsquema = textoTotal;
        var totalAparecer = totalEsquema+" litros";
      }
      //

      retorno = totalAparecer;

    $scope.listTotal = 0;
    
    return retorno;
} else {
  $('.totalLista .litrosTotal span#litrosTotal').text('0 litros');
}
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

$scope.checkboxClick = function(checked, productId, index){


      var date = moment().format('L');
      
      if(checked){

        firebase.database().ref('/users/' + $scope.userId + '/minhaLista/id'+ index)
        .update({
          "checked": true,
          "data": date
        });

        retorno = checked;

      } else {

          firebase.database().ref('/users/' + $scope.userId + '/minhaLista/id'+ index)
          .update({
            "checked": false,
            "data": "01/01/01"
          });

        retorno = checked;
      }
    
    return retorno;
}

// ======================= Change Amount =======================================

$scope.changeAmount = function(amount, productId, index){
      
    firebase.database().ref('/users/' + $scope.userId + '/minhaLista/id'+ index).update({"quantidade": amount});



    retorno = amount+"2";

    
    return retorno;
}

// ======================= Select Item to delet =======================================

$scope.itemOnLongPress = function(nome,id,index) {

  $scope.deleteItemName = nome;
  $scope.deleteItemId = id;
  $scope.deleteItemIndex = index;

  $('.deletaProdutoWrapper').show(100);


  
}
// ======================= Delete Item =======================================

$scope.deleteItem = function(productId, index){
      

    firebase.database().ref('/users/' + $scope.userId + '/minhaLista/id'+ index).remove();


    $scope.selectedItem.hide();
    $('.deletaProdutoConfirmation').removeClass('zoomOut').addClass('animatedFast zoomIn').css({'opacity': '1', 'display': 'block'}).delay(1000).queue(function(){
      $('.deletaProdutoConfirmation').removeClass('zoomIn').addClass('zoomOut');
        $(this).dequeue().delay(350).queue(function(){
          $('.deletaProdutoConfirmation').css({'opacity': '0', 'display': 'none'});
          $(this).dequeue();
        });
      });

    retorno = index;

    
    return retorno;
}

// ======================= get Product ID for detail =======================================

$scope.setProductDetailId = function(productId, index){

  Auth.set.productId(productId , index)

}


})

// ==================== When repeat ends =========================
.directive('onLastRepeat', function() {
    return function(scope, element, attrs) {
        if (scope.$last) setTimeout(function(){
            scope.$emit('onRepeatLast', element, attrs);
        }, 1);
    };
})

// ===================== On long Press ========================
.directive('onLongPress', function($timeout) {
  return {
    restrict: 'A',
    link: function($scope, $elm, $attrs) {
      $elm.bind('touchstart', function(evt) {
        // Locally scoped variable that will keep track of the long press
        $scope.longPress = true;

        // We'll set a timeout for 600 ms for a long press
        $timeout(function() {
          if ($scope.longPress) {
            // If the touchend event hasn't fired,
            // apply the function given in on the element's on-long-press attribute
            $scope.$apply(function() {
              $scope.$eval($attrs.onLongPress)
            });
          }
        }, 1500);
      });

      $elm.bind('touchend', function(evt) {
        // Prevent the onLongPress event from firing
        $scope.longPress = false;
        // If there is an on-touch-end function attached to this element, apply it
        if ($attrs.onTouchEnd) {
          $scope.$apply(function() {
            $scope.$eval($attrs.onTouchEnd)
          });
        }
      });
    }
  };
})