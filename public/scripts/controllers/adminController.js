/// <reference path="module.js" />
(function(){
	var app = angular.module("kidsApp");
	
	app.controller('adminCtrl', ['$scope', 'dbService',function ($scope, dbService) {
		$scope.playlists = dbService.playlists.query();

		$scope.add = function(){
			if(!$scope.newPlaylist || $scope.newPlaylist.length < 1)
				return;
			var playlist = new dbService.playlists({name: $scope.newPlaylist});
			playlist.$save(function(){
				$scope.playlists.push(playlist);
				$scope.newPlaylist = '';
			});
		};

		$scope.remove = function(index){
			var playlist = $scope.playlists[index];
			dbService.playlists.remove({id: playlist._id}, function(){
				$scope.playlists.splice(index,1);
			});
		};

	/*
	    dbService.getPlaylists().then(function (playlists) {
	        $scope.playlists = playlists;
	    }, function (error) {
	        console.log(error);
	    });*/
	}]);
}());
