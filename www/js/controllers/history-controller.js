var teste;	

angular.module('starter.controllers')

// ==================== Controller History ==================================
.controller('HistoryCtrl', function ($scope, $state,$cordovaOauth, $localStorage, $log, $location,$http,$ionicPopup, $firebaseObject, $firebaseAuth, Auth, FURL, Utils, userData) {



	firebase.auth().onAuthStateChanged(function(user) {
      if (user) {

        // buscar ID do usuário
        $scope.userId = Auth.get.user.id();

        // buscar nome do usuário
        Auth.get.user.history($scope.userId).then(function(userHistory) {
          $scope.$apply(function() {

	        var year = parseInt(moment().format('Y'));
			var month = parseInt(moment().format('M'));
			var day = parseInt(moment().format('D'));

          	$scope.history = userHistory[year]; 


          });
        });

      }


  });

	// =========== Month name ========================================================================

	$scope.monthName= function(month){

		var monthName;

		switch (idElem) {
         

          case 1:
            banhoVal = inputUser;
            banhoTotal = banhoVal*multips[0];
            var totalZerado = banhoTotal.toFixed(0);
            var totalBanhoZerado = parseInt(totalZerado);
            $(element).next('.resultadoItem').show().find('span').text(totalBanhoZerado);
            break
          default:
            console.log("fudeu");
        };

	};

	$scope.$on('$ionicView.loaded', function(){


	});


	$scope.$on('$ionicView.enter', function(){

	});

	$scope.$on('$ionicView.leave', function(){
	    
	});

})