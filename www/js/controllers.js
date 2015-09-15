angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $auth, $window, $location, $ionicPopup) {
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
      var message = '';
      for (var i=0; i < response.errors.length; i++){
        message += response.errors[i] + ' <br> ';
      };
      $ionicPopup.alert({
        title: 'Please Try Again',
        template: 'Sorry, ' + message
      });
    });
  };

  $scope.logout = function() {
    $window.localStorage.removeItem('current-user');
    validateUser();
    $location.path("/mylullabies");
    $window.location.reload(true);
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
      var message = '';
      for (var i=0; i < response.data.errors.full_messages.length; i++){
        message += ' <br> ' + response.data.errors.full_messages[i];
      }
      $ionicPopup.alert({
        title: 'Please Try Again',
        template: 'Sorry, ' + message
      });
    });
  };

})

.controller('PlaylistsCtrl', function($scope, $cordovaMedia){
  var media;
  $scope.songPlaying = "";
  $scope.play = function(source) {
    if(window.Media) {
      if(media) media.stop();
      media = $cordovaMedia.newMedia(source);

      media.play({
        numberOfLoops: 2,
        playAudioWhenScreenIsLocked : true
      });

      $scope.songPlaying = source;
    }
  };

  $scope.stop = function(){
    media.stop($scope.songPlaying);
  };

  var customMedia;
  
  $scope.startRecord = function(){
    customMedia = $cordovaMedia.newMedia("documents://custom.wav");
    customMedia.startRecord();
  };

  $scope.stopRecord = function(){
    customMedia.stopRecord();
  };
})
