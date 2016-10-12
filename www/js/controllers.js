angular.module('starter.controllers', [])


// ==================== Controller Home ==================================
.controller('HomeCtrl', function ($scope, $state,$cordovaOauth, $localStorage, $log, $location,$http,$ionicPopup, $firebaseObject, $firebaseAuth, Auth, FURL, Utils) {
  var ref = firebase.database().ref();
  $scope.authObj = $firebaseAuth();

  $scope.checkUser = function () {
    var firebaseUser = $scope.authObj.$getAuth();

    if (firebaseUser) {
    $log.log("Signed in as:", firebaseUser.uid);
    } else {
    $log.log("Signed out");
    $location.path("/login");
    }

  }

  $scope.$on('$ionicView.enter', function(){
     
  });

  $scope.$on('$ionicView.leave', function(){
    
  });

})

// ==================== Controller History ==================================
.controller('HistoryCtrl', function ($scope, $state,$cordovaOauth, $localStorage, $log, $location,$http,$ionicPopup, $firebaseObject, $firebaseAuth, Auth, FURL, Utils) {

  $scope.$on('$ionicView.enter', function(){
     
  });

  $scope.$on('$ionicView.leave', function(){
    
  });

})

// ==================== Controller List ==================================
.controller('ListCtrl', function ($scope, $state,$cordovaOauth, $localStorage, $log, $location,$http,$ionicPopup, $firebaseObject, $firebaseAuth, Auth, FURL, Utils) {
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
.controller('ListEditModeCtrl', function ($scope, $state,$cordovaOauth, $localStorage, $log, $location,$http,$ionicPopup, $firebaseObject, $firebaseAuth, Auth, FURL, Utils) {

  $scope.$on('$ionicView.enter', function(){
    
  });

  $scope.$on('$ionicView.leave', function(){
    
  });

})

// ==================== Controller Product detail ==================================
.controller('ProductDetailCtrl', function ($scope, $state,$cordovaOauth, $localStorage, $log, $location,$http,$ionicPopup, $firebaseObject, $firebaseAuth, Auth, FURL, Utils) {

  $scope.$on('$ionicView.enter', function(){
     
  });

  $scope.$on('$ionicView.leave', function(){
    
  });

  
})

// ==================== Controller Consumo ==================================
.controller('ConsumoCtrl', function ($scope, $state,$cordovaOauth, $localStorage, $log, $location,$http,$ionicPopup, $firebaseObject, $firebaseAuth, Auth, FURL, Utils) {

  $scope.$on('$ionicView.enter', function(){
     
  });

  $scope.$on('$ionicView.leave', function(){
    
  });

})

// ==================== Controller Consumo edit mode =============================
.controller('ConsumoEditModeCtrl', function ($scope, $state,$cordovaOauth, $localStorage, $log, $location,$http,$ionicPopup, $firebaseObject, $firebaseAuth, Auth, FURL, Utils) {

  $scope.$on('$ionicView.enter', function(){
     
  });

  $scope.$on('$ionicView.leave', function(){
    
  });


})

// ==================== Controller Preferences ==================================
.controller('PreferencesCtrl', function ($scope, $state,$cordovaOauth, $localStorage, $log, $location,$http,$ionicPopup, $firebaseObject, $firebaseAuth, Auth, FURL, Utils) {

  $scope.$on('$ionicView.enter', function(){
     
  });

  $scope.$on('$ionicView.leave', function(){
   
  });


  $scope.logOut = function () {
    firebase.auth().signOut().then(function() {
      $location.path("/login");
    }, function(error) {
      console.error('Sign Out Error', error);
    });
  }
 



})

'Use Strict';
angular.module('starter').controller('loginController', function ($scope, $state,$cordovaOauth, $localStorage, $location,$http,$ionicPopup,$firebaseAuth, $firebaseObject,$log, Auth, FURL, Utils) {
  var auth = $firebaseAuth();
  var ref = firebase.database().ref();
  var userkey = "";
  $scope.signIn = function (user) {
    $log.log("Enviado");
    if(angular.isDefined(user)){
    Utils.show();
    Auth.login(user)
      .then(function(authData) {
      
      $log.log("id del usuario:" + authData);
      Utils.hide();
      $state.go('tab.home');
      $log.log("Starter page","Home");

      }, function(err) {
        Utils.hide();
         Utils.errMessage(err);
      });
    }
  };

  $scope.signInAnon = function () {
    $log.log("Enviado");
    Utils.show();
    auth.$signInAnonymously().then(function(firebaseUser) {
     console.log("Signed in as:", firebaseUser.uid);
     Utils.hide();
     $location.path("/tabs/tab-home.html");
    }).catch(function(error) {
      console.error("Authentication failed:", error);
    });
    
  };

  $scope.checkUser = function () {
    var firebaseUser = auth.$getAuth();

    if (firebaseUser) {
    $log.log("Signed in as:", firebaseUser.uid);
    $location.path("/tabs/tab-home.html");
    } else {
    $log.log("Signed out");
    $location.path("/login");
    }

  }

});
