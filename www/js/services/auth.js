angular.module('starter').factory('Auth', function( FURL, $log, $firebaseAuth, $firebaseArray, $firebaseObject, $translate, $state, Utils, $location, $q) {

	//var ref = new Firebase(FURL);

  firebase.initializeApp(FURL);
	//var auth = $firebaseAuth(ref);
  var ref = firebase.database().ref();
  //var auth = $firebaseObject(ref);
  var auth = $firebaseAuth();

	var Auth = {
		user: {},
    productDetail:{},


    login: function(user) {
      return auth.$signInWithEmailAndPassword(
        user.email, user.password
      );
    },

    createProfile: function(uid, user) {
      var profile = {
				id: uid,
        email: user.email,
				registered_in: Date()
      };

      // If you want insert more data should modify register.html and modify your object.

      /*
      var profile = {
				id: uid,
        name: user.name,
        lastname: user.lastname,
        address: user.address,
        email: user.email,
				registered_in: Date()
      };
      */

      var messagesRef = $firebaseArray(firebase.database().ref().child("users"));
      messagesRef.$add(profile);
      $log.log("User Saved");
    },

    register: function(user) {
      return auth.$createUserWithEmailAndPassword(user.email, user.password)
        .then(function(firebaseUser) {
          $log.log("User created with uid: " + firebaseUser.uid);
          Auth.createProfile(firebaseUser.uid,user);
        })
        .catch(function(error) {
          $log.log(error);
        });
    },

    logout: function() {
      auth.$signOut();
			$log.log("Usuario Sale.");
    },

		resetpassword: function(email) {
			return auth.$sendPasswordResetEmail(
				  email
				).then(function() {
					Utils.alertshow($translate.instant('MESSAGES.title_1'),$translate.instant('MESSAGES.success_message'));
				  //console.log("Password reset email sent successfully!");
				}).catch(function(error) {
					Utils.errMessage(error);
				  //console.error("Error: ", error.message);
				});
    },

		changePassword: function(user) {
			return auth.$changePassword({email: user.email, oldPassword: user.oldPass, newPassword: user.newPass});
		},

    signInWithProvider: function(provider) {
      return Auth.signInWithPopup('google');
    },

    get:{

      user:{

        currentUser: function(){
          return firebase.auth().currentUser
        },

        id: function(){
          return firebase.auth().currentUser.uid
            
        },

        name: function(userId){
           return firebase.database().ref('/users/' + userId).once('value')
           .then(function(snapshot) {
              return snapshot.val().username;
            })
           .catch(function(error) {
              $log.log(error);
            });
        },

        list:function(userId){
           return firebase.database().ref('/users/' + userId + '/minhaLista').once('value')
           .then(function(snapshot) {
              return snapshot.val();
            })
           .catch(function(error) {
              $log.log(error);
            });
        }
      },

      listItens: function(){
        return firebase.database().ref('/users/itens').once('value')
        .then(function(snapshot) {
          return snapshot.val();
        })
        .catch(function(error) {
          $log.log(error);
        });
      },

      productId: function(){
        return Auth.productDetail.id;
      },

      data: function(){
        return firebase.database().ref().once('value')
        .then(function(snapshot) {
          return snapshot;
        })
        .catch(function(error) {
          $log.log(error);
        });
      }
    },

    send:{
        user:{
          name:function(userId, name){
            firebase.database().ref('users/' + userId).set({
              username: name
              // amigos : [
              //   { nome: "Leandro", idade: 21 },
              //   { nome: "Shiroma", idade: 30 },
              //   { nome: "Érika", idade: 30 }
              // ]
            });
          }
        }      
    },

    set:{
      productId: function(id){
        Auth.productDetail.id = id;
        // $location.path("/tabs/product-detail");
        $state.go('tab.product-detail');
      } 
    }

    

	};


	return Auth;

});
