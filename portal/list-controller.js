// ==================== Controller List ==================================
angular.module('starter.controllers')
.controller('ListCtrl', function ($scope, $rootScope, $state, $localStorage, $log, $location,$http, $firebaseObject, $firebaseAuth, Auth, Utils) {
  
  $rootScope.userList = [];
  $rootScope.productId;
  $rootScope.productIndex;

   function deleteAnimation(){  

      // click and hold to delete product + animation
      $j('.listaNotChecked .produto').each(function(){
        var timeoutId = 0;
        var produtoThis = $j(this);
        var itemNome = $j('.nomeProduto', this);
        var labelThis = $j('label', this);
        var qntdThis = $j('.qntdInput', this)
        var unidThis = $j('.unid', this);
        var gastoThis = $j('.gastoProduto', this);

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
            $j(this).dequeue();
            //
          });
          
          
        };

        $j('.deletaProduto .botao').click(function(){
        $j('.deletaProdutoWrapper').stop(false,true).hide(50);
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

      // buscar minha Lista
      Auth.get.user.list($scope.userId).then(function(data) {
        $rootScope.$apply(function() {

          var array = $j.map(data, function(value, index) {
              return [value];
          });

          $rootScope.userList = array;

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
      // $location.path("/login");
      console.log("fodeu");
    }
  });


// aparecer os subIcones ao clicar no +
$j('.icon#addItem').click(function(){
  // somente se não tiver a classe flipped no iconsHolder
  if($j('.iconsHolder').hasClass('flipped')){
  }else{
    $j('.paginaLista').hide();
    $j('.buscaPage').show();
  }
  //
});
//

// desaparecer os subIcones ao clicar fora
$j('.paginaLista').click(function(){
  $j('.paginaLista .scroll').animate({opacity: 1},200);
  $j('.totalLista').animate({opacity: 1},200);
  $j('.linkSmall').removeClass('Active');
  $j('.iconsWrapper .iconsHolder .icon#addItem .iconAdd').removeClass('rotated');
});
//

        

// ******************************************** LAST REPEAT ************************************************************************

    $scope.$on('onRepeatLast', function(){

      // Fazer o básico da lista funcionar
        $j('.pecasLista input:checkbox:checked').closest('.produto').detach().hide().prependTo('.paginaLista .listaChecked').addClass('produtoChecked').show();
            $j('.paginaLista .listaChecked .qntdInput').attr('disabled', 'disabled');
             $j('.paginaLista .listaNotChecked .qntdInput').removeAttr('disabled');
              var produtosLista = $j('.paginaLista .produto').length;
              var produto = $j('.paginaLista .produto');
              var i = 1;
              produto.each(function(){
                $j('.check', this).attr('id', 'check'+i);
                $j("label", this).attr('for', 'check'+i);
                i++;
              });
          //

          // Esconder listaChecked se não tiver item nela no ínicio de tudo
          if($j('.paginaLista .listaChecked .produto').length === 0){
            $j('.paginaLista .listaChecked').hide();
            $j('.paginaLista .listaNotChecked').css({"margin-bottom": "80px", "border-bottom": "2px solid #d2d2d2", "border-radius": "10px"});
          } else {
            $j('.paginaLista .listaChecked').show();
            $j('.paginaLista .listaNotChecked').css({"margin-bottom": "0px", "border-bottom": "0", "border-radius": "10px 10px 0 0"});
          }
          //

          // checked or not checked - Change parent Div and add class
            $j(".paginaLista .produto").each(function(){
              var checks = $j("input:checkbox", this);
              checks.click(function() {
                if (checks.is(':checked')){
                    $j(this).closest('.produto').detach().hide().prependTo('.paginaLista .listaChecked').removeClass('fadeInRight').addClass('produtoChecked animatedFast fadeInLeft').show()
                    $j('.paginaLista .listaChecked .qntdInput').attr('disabled', 'disabled');
                    $j('.paginaLista .listaNotChecked .qntdInput').removeAttr('disabled');
                    setTimeout(function(){ 
                      $j('.produto').removeClass('fadeInLeft');
                    }, 300);
                } else {
                    $j(this).closest('.produto').detach().hide().prependTo('.paginaLista .listaNotChecked').removeClass('fadeInLeft produtoChecked').addClass('animatedFast fadeInRight').show();
                    $j('.paginaLista .listaNotChecked .qntdInput').removeAttr('disabled');
                }
                // Esconder listaChecked se não tiver item nela a cada clique
                if($j('.paginaLista .listaChecked .produto').length === 0){
                  $j('.paginaLista .listaChecked').hide();
                  $j('.paginaLista .listaNotChecked').css({"margin-bottom": "80px", "border-bottom": "2px solid #d2d2d2", "border-radius": "10px"});
                } else {
                  $j('.paginaLista .listaChecked').show();
                  $j('.paginaLista .listaNotChecked').css({"margin-bottom": "0px", "border-bottom": "0", "border-radius": "10px 10px 0 0"});
                }
                deleteAnimation();
                //
              });
            });
          //

          // evitar inserir texto no input
          $j('.qntdInput').keypress(function(event) {
            if(event.which < 44
            || event.which > 59) {
                event.preventDefault();
            } // prevent if not number/coma

            if(event.which == 44
            && $j(this).val().indexOf(',') != -1) {
                event.preventDefault();
            } // prevent if already coma
          });

          // animacao para avermelhar se ficar acima de 4 itens
          $j('.qntdInput').keypress(function(){
            if ($j('.qntdInput').val().length === 4){
              $j(this).addClass('fullLength').delay(750).queue(function(){
                $j(this).removeClass('fullLength');
                $j(this).dequeue();
              })
          }
          });
          //

          // flip no ícone de editar e esconder
          $j('input.qntdInput').focusin(function() {
            $j('.iconsHolder').addClass('flipped');
            $j('.iconSmallHolder').hide();
            $j('.totalLista').hide();
            $j('.tabs-striped .tabs').hide();
          });
          $j('input.qntdInput').focusout(function() {
            $j('.iconsHolder').removeClass('flipped');
            $j('.totalLista').show();
            $j('.tabs-striped .tabs').show();
          });
        //     

       
        deleteAnimation();

        $j('.loader-app').hide();

      });


// ******************************************** GET DATA ************************************************************************

// ======================= get product name =======================================

$scope.productName = function(productId){

    var result = $j.grep($scope.listItens || [], function(e){ 
      return e.id == productId  ; 
    });

    var retorno='';
    if (result.length == 0) {
      retorno = '';
    } else if (result.length > 0) {
      retorno = result[0].produto;
    }

    return retorno;
}

// ======================= get waterFootprint =======================================

$scope.waterFootprint = function(productId,quantidade,checked){

    var result = $j.grep($scope.listItens || [], function(e){ 
      return e.id == productId  ; 
    });

    var retorno='';

    

    if (result.length == 0) {
      retorno = '';
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
  $j('.totalLista .litrosTotal span#litrosTotal').text('0 litros');
}
}

// ======================= get Unit =======================================

$scope.getUnit = function(productId){

    var result = $j.grep($scope.listItens || [], function(e){ 
      return e.id == productId  ; 
    });

    var retorno='';
    if (result.length == 0) {
      retorno = '';
    } else if (result.length > 0) {

      var unidade = result[0].unidade;

      retorno = unidade;
    }
    
    return retorno;
}

// ======================= get Unit =======================================

$scope.recomendationsLength = function(productId){

  console.log('recomendations length');

    var result = $j.grep($scope.listItens || [], function(e){ 
      return e.id == productId  ; 
    });

    var retorno='';
    if (result.length == 0) {
      retorno = '';
    } else if (result.length > 0) {

      var recomendations;

      if(result[0].tags){
          recomendations = result[0].tags.length;
      }

      if (recomendations > 0){

        retorno = {"recomendation": true};

      } else {

        retorno = {"recomendation": false};

      }

      
    }
    
    return retorno;
}

// ======================= Click checkbox =======================================

$scope.checkboxClick = function(checked, productId, index){

  console.log('checkbox Click');


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

  $j('.deletaProdutoWrapper').show(100);


  
}
// ======================= Delete Item =======================================

$scope.deleteItem = function(productId, index){
      
      console.log('delete Item');

    firebase.database().ref('/users/' + $scope.userId + '/minhaLista/id'+ index).remove();


    $scope.selectedItem.hide();
    $j('.deletaProdutoConfirmation').removeClass('zoomOut').addClass('animatedFast zoomIn').css({'opacity': '1', 'display': 'block'}).delay(1000).queue(function(){
      $j('.deletaProdutoConfirmation').removeClass('zoomIn').addClass('zoomOut');
        $j(this).dequeue().delay(350).queue(function(){
          $j('.deletaProdutoConfirmation').css({'opacity': '0', 'display': 'none'});
          $j(this).dequeue();
        });
      });

    retorno = index;

    
    return retorno;
}

// ======================= get Product ID for detail =======================================

$scope.setProductDetailId = function(productId, index){

  Auth.set.productId(productId , index);

  $rootScope.productId = productId;
  $rootScope.productIndex = index;

      console.log("list");
      console.log($rootScope.productId);

        

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
      $elm.bind('mousedown', function(evt) {

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