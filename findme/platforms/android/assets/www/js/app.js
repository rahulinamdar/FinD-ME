var phonecatApp = angular.module('phonecatApp', [
                                                 'ngRoute',
                                                 'usersControllers',
                                                 'phonecatAnimations'
                                                 
                                                 ]);
phonecatApp.config(['$routeProvider',
                    function($routeProvider) {
	$routeProvider.
	when('/home', {
		templateUrl: 'html/home.html',
		controller: 'HomeCtrl'
	}).
	when('/about', {
		templateUrl: 'html/about.html',
		controller: 'aboutCtrl'
	}).
	when('/setting', {
		templateUrl: 'html/settings.html',
		controller: 'settingCtrl'
	}).
	otherwise({
		redirectTo: '/home'
	});
}]);
