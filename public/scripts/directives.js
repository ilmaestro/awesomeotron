/// <reference path="module.js" />
(function(){
    var app = angular.module('kidsApp');

    app.directive('resizable', function($window) {
      return function($scope) {
        $scope.initializeWindowSize = function() {
          $scope.windowHeight = $window.outerHeight;
          return $scope.windowWidth = $window.outerWidth;
        };
        $scope.initializeWindowSize();
        return angular.element($window).bind('resize', function() {
          $scope.initializeWindowSize();
          return $scope.$apply();
        });
      };
    });

    app.directive('youtube', function ($window, $log, YouTubeLoader) {
        return {
            restrict: "E",
            
            scope: {
                height: "@",
                width: "@",
                videoid: "@"
            },
            
            template: '<div></div>',
            
            link: function (scope, element) {
                $log.info("link function called");
                var player;

                YouTubeLoader.whenLoaded().then(function(){
                    player = new YT.Player(element.children()[0], {
                        playerVars: {
                            autoplay: 0,
                            html5: 1,
                            theme: "light",
                            playsinline: 1,
                            modestbranding: 1,
                            color: "white",
                            iv_load_policy: 3, //annotations to not be shown by default
                            showinfo: 1,
                            controls: 2
                        },
                        
                        height: scope.height,
                        width: scope.width,
                        videoId: scope.videoid, 
                        events: {
                            onReady: function(event){
                                $log.info("player onReady event called..");
                                var message = {
                                    event: "YT.Player.OnReady",
                                    data: ""
                                };
                                scope.$apply(function () {
                                    scope.$emit(message.event, message.data);
                                });
                            },
                            onStateChange: function (event) {
                                var message = {
                                    event: "YT.Player.StatusChange",
                                    data: ""
                                };
                                
                                switch (event.data) {
                                    case YT.PlayerState.PLAYING:
                                        message.data = "PLAYING";
                                        break;
                                    case YT.PlayerState.ENDED:
                                        message.data = "ENDED";
                                        break;
                                    case YT.PlayerState.UNSTARTED:
                                        message.data = "NOT PLAYING";
                                        break;
                                    case YT.PlayerState.PAUSED:
                                        message.data = "PAUSED";
                                        break;
                                    case YT.PlayerState.CUED:
                                        message.data = "CUED";
                                        break;
                                }                            ;
                                
                                scope.$apply(function () {
                                    scope.$emit(message.event, message.data);
                                });
                            }
                        }
                    });
                    $log.info("player created");
                });
                
                scope.$watch('videoid', function (newValue, oldValue) {
                    if (newValue == oldValue) {
                        return;
                    }
                    $log.info("cueing video by id: " + scope.videoid);
                    if(player.cueVideoById)
                        player.cueVideoById(scope.videoid);
                });
                
                scope.$watch('height + width', function (newValue, oldValue) {
                    if (newValue == oldValue) {
                        return;
                    }
                    if(player)
                        player.setSize(scope.width, scope.height);
                });
                
                //scope.$on(YT_event.STOP, function () {
                //    player.seekTo(0);
                //    player.stopVideo();
                //});
                
                scope.$on("PLAY", function () {
                    $log.info("On Play event..");
                    if(player.playVideo)
                        player.playVideo();
                    $log.info("On Play event..finished.");
                });
                
                //scope.$on(YT_event.PAUSE, function () {
                //    player.pauseVideo();
                //});
            }
        };
    });

}());
    