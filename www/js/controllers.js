angular.module('starter.controllers', [])


// ==================== Controller Home ==================================
.controller('HomeCtrl', function($scope) {

  $scope.$on('$ionicView.enter', function(){
     
  });

  $scope.$on('$ionicView.leave', function(){
    
  });

})

// ==================== Controller History ==================================
.controller('HistoryCtrl', function($scope, Chats) {

  $scope.$on('$ionicView.enter', function(){
     
  });

  $scope.$on('$ionicView.leave', function(){
    
  });

})

// ==================== Controller List ==================================
.controller('ListCtrl', function($scope) {
  //drag n drop
    // $( "#listaBox" ).sortable({
    //   delay: 250,
    //   placeholder: "ui-state-highlight",
    //   axis: "y"
    // });
    // $( "#listaBox" ).disableSelection();
  //

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
        } else {
          $('.listaChecked').show();
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
  $scope.$on('$ionicView.enter', function(){
     
  });

  $scope.$on('$ionicView.leave', function(){
    
  });

})

// ==================== Controller List edit mode ===========================
.controller('ListEditModeCtrl', function($scope) {

  $scope.$on('$ionicView.enter', function(){
    
  });

  $scope.$on('$ionicView.leave', function(){
    
  });

})

// ==================== Controller Product detail ==================================
.controller('ProductDetailCtrl', function($scope) {

  $scope.$on('$ionicView.enter', function(){
     
  });

  $scope.$on('$ionicView.leave', function(){
    
  });

  
})

// ==================== Controller Consumo ==================================
.controller('ConsumoCtrl', function($scope, $ionicSlideBoxDelegate) {
    $scope.nextSlide = function() {
      $ionicSlideBoxDelegate.next();
    }
    $scope.prevSlide = function() {
      $ionicSlideBoxDelegate.previous();
    }

  $scope.$on('$ionicView.enter', function(){
     
  });

  $scope.$on('$ionicView.leave', function(){
    
  });

})

// ==================== Controller Consumo edit mode =============================
.controller('ConsumoEditModeCtrl', function($scope) {

  $scope.$on('$ionicView.enter', function(){
     
  });

  $scope.$on('$ionicView.leave', function(){
    
  });


})

// ==================== Controller Preferences ==================================
.controller('PreferencesCtrl', function($scope) {

  $scope.$on('$ionicView.enter', function(){
     
  });

  $scope.$on('$ionicView.leave', function(){
   
  });

})

