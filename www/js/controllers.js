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
      var message = response.errors.join('<br>');
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
      var message = response.data.errors.full_messages.join('<br>');
      $ionicPopup.alert({
        title: 'Please Try Again',
        template: 'Sorry, ' + message
      });
    });
  };

})

.controller('PlaylistsCtrl', function($scope, $cordovaMedia){


  // $scope.imageDefault ={};

  // for(var i=0; i < $scope.songNames.length; i++){
  //   $scope.imageDefault["image"+(i+1)] = {
  //     link1: "img/icon_"+$scope.imageDefaultArr[i]+".png",
  //     link2: "img/icon_"+$scope.imageDefaultArr[i]+"_selected.png"
  //   };
  // }

  // $scope.setImage = function (){
  //   for(var i=0; i < $scope.imageDefaultArr.length; i++){
  //     $scope.image
  //     $scope["image"+(i+1)] = $scope.imageDefault["image"+(i+1)].link1;
  //   }
  // };

  // $scope.setImage();

  // $scope.songs = [
  //   {
  //     name:
  //     inUse: 
  //     link1:
  //     link2:
  //   }
  // ]

  $scope.songNames = ["hairdryer", "stream", "rain", "forrain", "heart", "thunder", "fire"];

  $scope.songs = [];

  for (var i=0; i < $scope.songNames.length; i++){
    var songName = $scope.songNames[i];
    var tempHash = {
      name: songName,
      inUse: "",
      link1: "img/icon_"+songName+".png",
      link2: "img/icon_"+songName+"_selected.png",
      source: "mp3/"+songName+".mp3",
      selected: false
    }
    $scope.songs.push(tempHash);
  }
  console.log($scope.songs);

  $scope.setImage = function () {
    for (var i=0; i < $scope.songs.length; i++){
      $scope.songs[i].inUse = $scope.songs[i].link1;
    }
  }
  $scope.setImage();

  var media;
  $scope.songPlaying = "";
  $scope.play = function(source, index) {
    $scope.songs[index].inUse = $scope.songs[index].link2;
    if(window.Media) {
      if(media) media.stop();
      $scope.setImage();
      media = $cordovaMedia.newMedia(source);

      media.play({
        numberOfLoops: 'infinite',
        playAudioWhenScreenIsLocked : true
      });

      $scope.songPlaying = source;
    }
  };

  $scope.stop = function(){
    $scope.setImage();
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

