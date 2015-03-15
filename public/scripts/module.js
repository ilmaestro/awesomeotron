(function () {
    app = angular.module("kidsApp", ['ngRoute', 'ngResource', 'toaster']);

    app.config(function($routeProvider){
    	$routeProvider
    		.when("/", {
    			templateUrl: "views/index.html",
    			controller: "indexCtrl"
    		})
    		.when("/playlist/:id", {
    			templateUrl: "views/playlist.html",
    			controller: "playlistCtrl"
    		})
    		.when("/playlist/admin", {
    			templateUrl: "views/admin.html",
    			controller: "adminCtrl"
    		})
    		.when("/playlist/edit/:id", {
    			templateUrl: "views/playlist.edit.html",
    			controller: "playlistEditCtrl"
    		})
    		.otherwise({redirectTo: "/"});
    })
})();