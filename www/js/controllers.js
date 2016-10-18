angular.module('starter.controllers', [])
// ==================== Controller Home ==================================
.controller('HomeCtrl', function ($scope, $state,$cordovaOauth, $localStorage, $log, $location,$http,$ionicPopup, $firebaseObject, $firebaseAuth, Auth, FURL, Utils) {


  $scope.$on('$ionicView.loaded', function(){
      $scope.userId = Auth.get.user.id()
  });

  $scope.$on('$ionicView.enter', function(){
      $scope.database = Auth.get.data();

      $scope.userId = Auth.get.user.id();

      // $scope.sendName = Auth.send.user.name($scope.userId,'Leandro');

      setTimeout(function(){

        Auth.get.user.name($scope.userId).then(function(nomeUsuario) {
          $scope.getName = nomeUsuario;
        });
        Auth.get.user.amigos($scope.userId).then(function(resposta) {
          $scope.amigos = resposta;
        });
        
      }, 500);
  });

  $scope.$on('$ionicView.leave', function(){
    
  });

})

// ==================== Controller History ==================================
.controller('HistoryCtrl', function ($scope, $state,$cordovaOauth, $localStorage, $log, $location,$http,$ionicPopup, $firebaseObject, $firebaseAuth, Auth, FURL, Utils, userData) {


  $scope.$on('$ionicView.loaded', function(){
      $scope.userData = Auth.get.user.id()
  });


  $scope.$on('$ionicView.enter', function(){
    $scope.userData = Auth.get.user.id()
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

  $scope.$on('$ionicView.loaded', function(){
      $scope.userData = Auth.get.user.id()
  });


  $scope.$on('$ionicView.enter', function(){
    $scope.userData = Auth.get.user.id()
  });

  $scope.$on('$ionicView.leave', function(){
    
  });

})

// ==================== Controller List edit mode ===========================
.controller('ListEditModeCtrl', function ($scope, $state,$cordovaOauth, $localStorage, $log, $location,$http,$ionicPopup, $firebaseObject, $firebaseAuth, Auth, FURL, Utils, $cordovaBarcodeScanner) {

  $scope.scanBarcode = function() {
      $cordovaBarcodeScanner.scan().then(function(imageData) {
          alert(imageData.text);
          console.log("Barcode Format -> " + imageData.format);
          console.log("Cancelled -> " + imageData.cancelled);
      }, function(error) {
          alert("An error happened -> " + error);
      });
  };

  $scope.$on('$ionicView.loaded', function(){
      $scope.userData = Auth.get.user.id()
  });


  $scope.$on('$ionicView.enter', function(){
    $scope.userData = Auth.get.user.id()
  });

  $scope.$on('$ionicView.leave', function(){
    
  });

})

// ==================== Controller Product detail ==================================
.controller('ProductDetailCtrl', function ($scope, $state,$cordovaOauth, $localStorage, $log, $location,$http,$ionicPopup, $firebaseObject, $firebaseAuth, Auth, FURL, Utils) {

  $scope.$on('$ionicView.loaded', function(){
      $scope.userData = Auth.get.user.id()
  });


  $scope.$on('$ionicView.enter', function(){
    $scope.userData = Auth.get.user.id()
  });

  $scope.$on('$ionicView.leave', function(){
    
  });

  
})

// ==================== Controller Search ==================================
.controller('SearchCtrl', function ($scope, $state,$cordovaOauth, $localStorage, $log, $location,$http,$ionicPopup, $firebaseObject, $firebaseAuth, Auth, FURL, Utils) {

  $scope.$on('$ionicView.loaded', function(){
      $scope.userData = Auth.get.user.id()
  });


  $scope.$on('$ionicView.enter', function(){
    $scope.userData = Auth.get.user.id()
  });

  $scope.$on('$ionicView.leave', function(){
    
  });

  
})

// ==================== Controller Consumo (Pegada Hídrica Pessoal) ==================================
.controller('ConsumoCtrl', function ($scope, $state,$cordovaOauth, $localStorage, $log, $location,$http,$ionicPopup, $firebaseObject, $firebaseAuth, Auth, FURL, Utils, $ionicSlideBoxDelegate,$ionicScrollDelegate) {

    // scroll to top every time it changes the slide
    $scope.slideChanged = function(index) {
      $ionicScrollDelegate.scrollTop();
      $scope.slideIndex = index;

    };
      $scope.slideIndex = 0;
    // disable swipe to change slide-box
    $scope.disableSwipe = function() {
      $ionicSlideBoxDelegate.enableSlide(false);
    };

    // next slide-box + slide-box height
    $scope.nextSlide = function() {
      $ionicSlideBoxDelegate.next();
      var slider = $('.slider');
      var actualSlide;
      var actualSlideHeight;
      if (slider.hasClass('slide-0')){
        actualSlideHeight = $('.slidebox1').find('.pageWrapper').outerHeight();
        slider.height(actualSlideHeight);
      } else if (slider.hasClass('slide-1')){
        actualSlideHeight = $('.slidebox2').find('.pageWrapper').outerHeight();
        slider.height(actualSlideHeight);
      } else {
      }
    }

    // previous slide-box + slide-box height
    $scope.prevSlide = function() {
      $ionicSlideBoxDelegate.previous();
      var slider = $('.slider');
      var actualSlide;
      if (slider.hasClass('slide-0')){
      } else if (slider.hasClass('slide-1')){
        actualSlideHeight = $('.slidebox0').find('.pageWrapper').outerHeight();
        slider.height(actualSlideHeight);
      } else {
          actualSlideHeight = $('.slidebox1').find('.pageWrapper').outerHeight();
        slider.height(actualSlideHeight);
      }
    }

    // finish slide-box --- SUBMIT ALL FORMS
    $scope.submitAll = function() {
      console.log("submit");
    };

  $scope.$on('$ionicView.loaded', function(){
      $scope.userData = Auth.get.user.id()
  });

  $scope.$on('$ionicView.enter', function(){

    $scope.userData = Auth.get.user.id()


    var banhoVal = 0;
    var denteVal = 0;
    var roupaVal = 0;
    var loucaVal = 0;
    var carroVal = 0;
    var jardimVal = 0;
    var calcadaVal = 0;
    var cerealVal = 0;
    var carneVal = 0;
    var laticineoVal = 0;
    var ovoVal = 0;
    var vegetaisVal = 0;
    var frutaVal = 0;
    var raizVal = 0;
    var cafeVal = 0;
    var chaVal = 0;
    var banhoTotal = 0;
    var denteTotal = 0;
    var roupaTotal = 0;
    var loucaTotal = 0;
    var carroTotal = 0;
    var jardimTotal = 0;
    var calcadaTotal = 0;
    var cerealTotal = 0;
    var carneTotal = 0;
    var laticineoTotal = 0;
    var ovoTotal = 0;
    var vegetaisTotal = 0;
    var frutaTotal = 0;
    var raizTotal = 0;
    var cafeTotal = 0;
    var chaTotal = 0;

    // conta e exibição do total a partir dos inputs do usuário
    var multips = [4400, 7000, 7000, 44000, 8000, 11000, 525, 84, 404, 52, 540, 13, 34, 20, 41000, 9000];

      // onchange get id and value from input
      $('input').change(function(){
        var inputUser = $(this).val();
        var idElem = $(this).attr('id');

        //check the id and than add the results
        switch (idElem) {
          // higiene
          case "banho":
            banhoVal = inputUser;
            banhoTotal = banhoVal*multips[0];
            $(this).next('.resultadoItem').show().find('span').text(banhoTotal);
            break
          case "dente":
            denteVal = inputUser;
            denteTotal = denteVal*multips[1];
            $(this).next('.resultadoItem').show().find('span').text(denteTotal);
            break
          // limpeza
          case "roupa":
            roupaVal = inputUser;
            roupaTotal = roupaVal*multips[2];
            $(this).next('.resultadoItem').show().find('span').text(roupaTotal);
            break
          case "louca":
            loucaVal = inputUser;
            loucaTotal = loucaVal*multips[3];
            $(this).next('.resultadoItem').show().find('span').text(loucaTotal);
            break
          case "carro":
            carroVal = inputUser;
            carroTotal = carroVal*multips[4];
            $(this).next('.resultadoItem').show().find('span').text(carroTotal);
            break
          case "jardim":
            jardimVal = inputUser;
            jardimTotal = jardimVal*multips[5];
            $(this).next('.resultadoItem').show().find('span').text(jardimTotal);
            break
          case "calcada":
            calcadaVal = inputUser;
            calcadaTotal = calcadaVal*multips[6];
            $(this).next('.resultadoItem').show().find('span').text(calcadaTotal);
            break
          // alimentos
          case "cereal":
            cerealVal = inputUser;
            cerealTotal = cerealVal*multips[7];
            $(this).next('.resultadoItem').show().find('span').text(cerealTotal);
            break
          case "carne":
            carneVal = inputUser;
            carneTotal = carneVal*multips[8];
            $(this).next('.resultadoItem').show().find('span').text(carneTotal);
            break
          case "laticineo":
            laticineoVal = inputUser;
            laticineoTotal = laticineoVal*multips[9];
            $(this).next('.resultadoItem').show().find('span').text(laticineoTotal);
            break
          case "ovo":
            ovoVal = inputUser;
            ovoTotal = ovoVal*multips[10];
            $(this).next('.resultadoItem').show().find('span').text(ovoTotal);
            break
          case "vegetais":
            vegetaisVal = inputUser;
            vegetaisTotal = vegetaisVal*multips[11];
            $(this).next('.resultadoItem').show().find('span').text(vegetaisTotal);
            break
          case "fruta":
            frutaVal = inputUser;
            frutaTotal = frutaVal*multips[12];
            $(this).next('.resultadoItem').show().find('span').text(frutaTotal);
            break
          case "raiz":
            raizVal = inputUser;
            raizTotal = raizVal*multips[13];
            $(this).next('.resultadoItem').show().find('span').text(raizTotal);
            break
          case "cafe":
            cafeVal = inputUser;
            cafeTotal = cafeVal*multips[14];
            $(this).next('.resultadoItem').show().find('span').text(cafeTotal);
            break
          case "cha":
            chaVal = inputUser;
            chaTotal = chaVal*multips[15];
            $(this).next('.resultadoItem').show().find('span').text(chaTotal);
            break
          default:
            console.log("fudeu");
        }

        // add totals and than show them
        var totalHigiene = banhoTotal+denteTotal;
        var totalLimpeza = roupaTotal+loucaTotal+carroTotal+jardimTotal+calcadaTotal;
        var totalAlimento = cerealTotal+carneTotal+laticineoTotal+ovoTotal+vegetaisTotal+frutaTotal+raizTotal+cafeTotal+chaTotal;
        var totalPegadaPessoal = totalHigiene + totalAlimento + totalAlimento;
        $('.resultadoCategoria#totalHigiene').show().find('span').text(totalHigiene);
        $('.resultadoCategoria#totalLimpeza').show().find('span').text(totalLimpeza);
        $('.resultadoCategoria#totalAlimento').show().find('span').text(totalAlimento);
      });




  });

  $scope.$on('$ionicView.leave', function(){
    
  });

})

// ==================== Controller Consumo edit mode =============================
.controller('ConsumoEditModeCtrl', function ($scope, $state,$cordovaOauth, $localStorage, $log, $location,$http,$ionicPopup, $firebaseObject, $firebaseAuth, Auth, FURL, Utils) {
  
  $scope.$on('$ionicView.loaded', function(){
      $scope.userData = Auth.get.user.id()
  });

  $scope.$on('$ionicView.enter', function(){
     $scope.userData = Auth.get.user.id()
  });

  $scope.$on('$ionicView.leave', function(){
    
  });


})

// ==================== Controller Preferences ==================================
.controller('PreferencesCtrl', function ($scope, $state,$cordovaOauth, $localStorage, $log, $location,$http,$ionicPopup, $firebaseObject, $firebaseAuth, Auth, FURL, Utils) {

  $scope.$on('$ionicView.loaded', function(){
      $scope.userData = Auth.get.user.id()
  });
  
  $scope.$on('$ionicView.enter', function(){
     $scope.userData = Auth.get.user.id()
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
