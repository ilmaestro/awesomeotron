/// <reference path="module.js" />

(function(){
    var app = angular.module("kidsApp");
    
    app.controller('playlistCtrl', function ($scope, dbService, $routeParams, $timeout, $log) {
        $scope.yt = {
            width: 600, 
            height: 480, 
            videoid: "6eZ9miBIF_A",
        };
        $scope.currentVideo = null;

        $scope.isCurrentVideo = function(url){
        	return $scope.currentVideo.url == url;
        };

        var index = 0;
        
        $scope.next_video = function () {
            index++;
            if(index > ($scope.playlist.video.length - 1))
            	index = 0;
            $scope.currentVideo = $scope.playlist.video[index];
            $scope.yt.videoid = $scope.currentVideo.url;
        };
        
        $scope.play_video = function () {
            $scope.$broadcast("PLAY");
        };

        $scope.$on("YT.Player.OnReady", function(){
        	$scope.$broadcast("PLAY");
			//once the player is ready, get the selected playlist
	        $scope.playlist = dbService.playlists.get({id: $routeParams.id}, function(){
	        	$scope.currentVideo = $scope.playlist.video[0]; // start the first video
	        	//cue the video after 2 seconds
	        	$timeout(function(){
	        		$scope.yt.videoid = $scope.currentVideo.url;
	        	}, 500);
	        });
        });
        
        $scope.$on("YT.Player.StatusChange", function (event, data) {
            $scope.playerStatus = data;
            switch (data) {
                case "CUED":
                	if(index > 0){
	                	//wait a sec, then hit play
	                	$timeout(function(){
			        		console.log("broadcasting play signal...");
	                    	$scope.$broadcast("PLAY");
			        	}, 500);
					}                    
                    break;
                case "ENDED":
                    $scope.next_video();
                    break;
                default:
                    break;
            }
        });
    });
}());
