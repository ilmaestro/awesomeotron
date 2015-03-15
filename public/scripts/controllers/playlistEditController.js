/// <reference path="module.js" />

(function(){
    var app = angular.module("kidsApp");

    app.controller('playlistEditCtrl', ['$scope', '$routeParams', 'dbService', '$log', '$location', 'YouTubeData', '$timeout', 'toaster', 
    							function($scope, $routeParams, dbService, $log, $location, YouTubeData, $timeout, toaster){
    	$scope.id = $routeParams.id;

    	//get the selected playlist
        dbService.playlists.get({id: $scope.id}, function(playlist){
        	$scope.playlist = playlist;
        	if(!$scope.playlist.video)
        		$scope.playlist.video = [];
        }, function(response){
        	//failed to get
        	$scope.id = null;
        	$scope.playlist = new dbService.playlists({name: "New Playlist", video: []});
        });

        $scope.resetVideoOrder = function(){
        	$scope.playlist.video.sort(function(a, b){
        		if(a.order < b.order) return -1;
        		if(a.order > b.order) return 1;
        		return 0;
        	});
        };

        $scope.save = function(){
        	$scope.playlist.lastUpdated = Date.now;
        	if($scope.id) {
        		dbService.playlists.update({id: $scope.id}, $scope.playlist, function(){
	        		$log.info("playlist updated");
	        		toaster.pop('success', "Playlist", "Updated");
	        	});	
        	} else {
				dbService.playlists.save($scope.playlist, function(playlist){
					$scope.id = playlist._id;
	        		$log.info("playlist created");
	        		toaster.pop('success', "Playlist", "Created");
	        	});
        	}
        };

        $scope.addVideo = function(){
        	//give the ng-model time to update
        	$timeout(function(){
        		YouTubeData.getDataFromUrl($scope.newVideoUrl).success(function(data){
	        		//$log.info(data);
	        		$scope.youTubeData = data;
	        		$scope.newVideoUrl = "";
	        		$scope.playlist.video.push({title: data.title, url: data.videoId, order: $scope.playlist.video.length+1});
	        		$scope.save();
	        	}); 	
        	}, 500); 
        	$scope.resetVideoOrder();
        };

        $scope.removeVideo = function(index) {
           	var removedTitle = $scope.playlist.video[index].title;
		   	$scope.playlist.video.splice(index, 1);
			// renumber the the order
			for(i = 0; i < $scope.playlist.video.length; i ++){
				$scope.playlist.video[i].order = i+1; // update order	
			}
			toaster.pop('info', "Video", "Removed " + removedTitle);
		   	$scope.save();

		};

		$scope.removePlaylist = function(){
			if($scope.id){
				dbService.playlists.remove({id: $scope.id}, $scope.playlist, function(){
					$location.path("/");
				});
			}
		};

		$scope.moveVideo = function(index, direction){
			if((direction < 0 && index > 0) || (direction > 0 && index < $scope.playlist.video.length)) {
				//moving an item UP/DWN in the view, up/down in the array -- grab the index.. swap the two items, reset the order
				var to = index + direction;
				var from = index;
				var temp = $scope.playlist.video[to].order;
			    $scope.playlist.video[to].order = $scope.playlist.video[from].order;
			    $scope.playlist.video[from].order = temp;
				$scope.resetVideoOrder();
				$scope.save();
			}
		};

        
    }]);
}());