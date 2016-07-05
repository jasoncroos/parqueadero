// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs).
    // The reason we default this to hidden is that native apps don't usually show an accessory bar, at
    // least on iOS. It's a dead giveaway that an app is using a Web View. However, it's sometimes
    // useful especially with forms, though we would prefer giving the user a little more room
    // to interact with the app.
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      // Set the statusbar to use the default style, tweak this to
      // remove the status bar on iOS or change it to use white instead of dark colors.
      StatusBar.styleDefault();
    }
  });
});


angular.module('ionic.googleMapsEjemplo', ['ionic'])
 
.controller('MapaCtrl', function($scope) {
  function iniciarMapa() {
    var mapa = new google.maps.Map(
      document.getElementById("mapa"), 
      { 
        center: new google.maps.LatLng(-4.015664, -79.201834),
        zoom: 17, 
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }
    );
 
    // intentamos obtener la posicion actual del dispositivo
    navigator.geolocation.getCurrentPosition(
      onSuccess_HighAccuracy,
      onError_HighAccuracy,
       {
        maximumAge:0,
        timeout:10000,
        enableHighAccuracy: true
      }
    );
     
    function onSuccess_HighAccuracy(pos) { // dispositivo con GPS
      // centramos el mapa sobre la posicion devuelta por el dispositivo
      mapa.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
      //creamos un marcador en esa posición
      var myPosicion = new google.maps.Marker(
        {
          position: new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude),
          map: mapa
        }
      );
    }
 
    function onError_HighAccuracy(error) {// dispositivo sin GPS
      if (error.code == error.TIMEOUT){ // si no ha dado tiempo volvemos a intentarlo
        navigator.geolocation.getCurrentPosition(
          onSuccess_HighAccuracy,
          onError_LowAccuracy, // si ha dado error desistimos
          {
            maximumAge:0,
            timeout:10000,
            enableHighAccuracy: false
          }
        );
      }
      else{// mostramos una alerta con el error
        alert(JSON.stringify(error)); 
      }
    }
 
    function onError_LowAccuracy(error) { // mostramos una alerta con el error
      alert(JSON.stringify(error)); 
    }
    $scope.mapa = mapa;
  }
 
  // añadimos el evento al mapa para iniciar el proceso
  google.maps.event.addDomListener(window, 'load', iniciarMapa);
 
});