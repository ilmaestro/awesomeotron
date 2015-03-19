/// <reference path="module.js" />

(function(){
    var app = angular.module("kidsApp");
    
    app.controller('playlistCtrl', function ($scope, dbService, $routeParams, $timeout, $log) {
        //var ytWidth = $scope.windowWidth - 30, //angular.element(document.querySelector('#yt-display'))[0].offsetWidth - 30, //30 seems to be correct with the given theme...
        //    YTHeight = Math.min(480, Math.round(initialWidth / 1.77)); // 16:9 aspect, unless its greater than 480.

        $scope.currentVideo = null;
        var currentVideoIndex = 0;
        var widthOffset = .93;

        $scope.yt = {
            width: $scope.windowWidth - widthOffset, 
            height: Math.min(480, Math.round(($scope.windowWidth - widthOffset) / 1.77)), 
            videoid: "6eZ9miBIF_A", //TV TEST pattern by default.. in case of "off air"
        };

        $scope.YTWidth = function(){
            return Math.min(1134, $scope.windowWidth * widthOffset);
        };

        $scope.YTHeight = function(){
            return Math.min(480, Math.round(($scope.windowWidth * widthOffset) / 1.77));
        };

        var changeVideo = function(){
            $scope.currentVideo = $scope.playlist.video[currentVideoIndex];
            $scope.yt.videoid = $scope.currentVideo.url;
        };

        $scope.isCurrentVideo = function(url){
        	return $scope.currentVideo.url == url;
        };


        $scope.prev_video = function () {
            currentVideoIndex--;
            if(currentVideoIndex < 0)
                currentVideoIndex = ($scope.playlist.video.length - 1);
            changeVideo();
        };

        $scope.next_video = function () {
            currentVideoIndex++;
            if(currentVideoIndex > ($scope.playlist.video.length - 1))
            	currentVideoIndex = 0;
            changeVideo();
        };

        $scope.play = function(index){
            if(index < 0 || index > ($scope.playlist.video.length - 1))
                return;
            currentVideoIndex = index;
            changeVideo();
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
                	if(currentVideoIndex > 0){
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
