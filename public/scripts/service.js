/// <reference path="module.js" />
(function(){
    var app = angular.module("kidsApp");

    app.factory('YouTubeData', ['$http', function($http) {
        var getDataFromUrl = function(url){
            console.log(url);
            url = encodeURIComponent(url);

            return $http.get('/api/youtube/' + url);
        };

        return {
            getDataFromUrl: getDataFromUrl
        };
                
    }]);

    app.factory('dbService', ['$resource',function ($resource) {
        var playlists = $resource('/api/playlist/:id', null, {
            'update': {method: 'PUT'}
        });

        return {
            playlists: playlists
        };
    }]);

    app.factory('YouTubeLoader', ['$q','$window', function($q, $window) {
        var tag = document.createElement('script');
        tag.src = "https://www.youtube.com/iframe_api";
        var firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
        var delay = $q.defer();

        $window.onYouTubeIframeAPIReady = function() {
            delay.resolve();
        }

        return {
            whenLoaded : function() {
                return delay.promise;
            }
        };
    }]);

    
}());
