'use strict';
angular
    .module('tentacoolApp', ['ngRoute', 'ngMaterial', 'ng-slide-down', 'ngStorage', 'angularMoment'])
    .config(function($routeProvider, $locationProvider) {
        $routeProvider.when('/', {
                templateUrl: 'views/main.html',
                controller: 'MainCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });
        $locationProvider.html5Mode(true);
    });