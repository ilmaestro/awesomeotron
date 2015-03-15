/// <reference path="module.js" />

(function(){
    var app = angular.module("kidsApp");
    
    app.controller('indexCtrl', function ($scope, dbService, $location) {
        $scope.playlists = dbService.playlists.query();        

        $scope.play = function(id){
            $location.path("/playlist/" + id);
        };
    });
}());