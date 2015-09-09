angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $auth, $window) {
  var validateUser = function(){
    $scope.currentUser = JSON.parse($window.localStorage.getItem('current-user'));
    console.log("current user is: ", $scope.currentUser)
  };

  validateUser();

  $scope.loginData = {};

  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.loginModal = modal;
  });

  $scope.closeLogin = function() {
    $scope.loginModal.hide();
  };

  $scope.login = function() {
    $scope.loginModal.show();
  };


  $scope.doLogin = function() {
    $auth.submitLogin($scope.loginData).then(function(response){
      console.log(response);
      
      $window.localStorage.setItem('current-user', JSON.stringify(response));
      validateUser();
      $scope.closeLogin();
    }).catch(function(response){
      console.log(response);
    });
  };

  $scope.logout = function() {
    $window.localStorage.removeItem('current-user');
    validateUser();
  };

  $scope.signupData = {};

  $ionicModal.fromTemplateUrl('templates/signup.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.signupModal = modal;
  });

  $scope.closeSignup = function() {
    $scope.signupModal.hide();
  };

  $scope.signup = function() {
    $scope.signupModal.show();
  };


  $scope.doSignup = function() {
    $auth.submitRegistration($scope.signupData).then(function(response){
      console.log("The signup function:", response);
      
      $window.localStorage.setItem('current-user', JSON.stringify(response.data.data));
      validateUser();
      $scope.closeSignup();
    }).catch(function(response){
      console.log(response);
    });
  };

})

.controller('SoundCtrl', function($scope, $cordovaMedia, $ionicPlatform, $ionicLoading){

  $ionicPlatform.ready(function() {
    $scope.play = function(source) {
      var media = new Media(source);
      $cordovaMedia.play(media);
      $scope.$digest();
    }

  var mediaStatusCallback = function(status) {
    if(status == 1) {
        $ionicLoading.show({template: 'Loading...'});
    } else {
        $ionicLoading.hide();
    }
  }

  var iOSPlayOptions = {
    numberOfLoops: 2,
    playAudioWhenScreenIsLocked : false
  }
  });
})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
});
