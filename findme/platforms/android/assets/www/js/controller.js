var phonecatControllers = angular.module('usersControllers', []);

phonecatControllers.controller('HomeCtrl', ['$scope', function ($scope) {
	
	if(!localStorage['app']){
		localStorage['app'] =  "Initial";
		$('.slider').slider({full_width: true});
		$('#slider1').show();
		$('#homesSCR').hide();
		 $('.showfirst').show();
	}else{
		$('#slider1').hide();
		$('#homesSCR').show();
		 $('.showfirst').hide();
	}
	
	$scope.checked = false;
	$scope.getStarted = function(){
		console.log('hi');
		//hides the slider
		$('#slider1').hide();
		$('#homesSCR').show();
	};
	$scope.getlocation=function(){
		showBusy();
		cordova.plugins.diagnostic.isLocationEnabled(function(enabled){
			if(!enabled){
				cordova.plugins.diagnostic.switchToLocationSettings();
				navigator.app.exitApp();
			}else{
				navigator.geolocation.getCurrentPosition(function(position) {
					hideBusy();
					var url ="https://www.google.co.in/maps/search/"+position.coords.latitude+","+position.coords.longitude+"/@"+position.coords.latitude+","+position.coords.longitude+",21z";
					if($scope.checked){
						var Ps = [];
						for(var i =0; i<3; i++){
							/*var obj = {
									"phone":localStorage['phone'+i]
							};*/
							if(localStorage['phone'+i] != "" && localStorage['phone'+i])
								Ps.push(localStorage['phone'+i]); 
						}
						if(Ps.length > 0){
						window.plugins.socialsharing.shareViaSMS("Please find me "+url+" ",Ps.tostring(),function(msg) {
							Materialize.toast('Message has been sent successfully', 4000);
						}, function(msg) {
							Materialize.toast('Not Shared', 4000);
						}
						);
						
						}else{
							Materialize.toast('Store at least one Number in settings.', 4000);
						}
					}else{
						window.plugins.socialsharing.share('(Open this link chrome browser)Click to know where m I', null, null, url)
//						window.plugins.socialsharing.share("Click to know where m I "+url+" ", null /* img */,url, function() {Materialize.toast('Share Ok', 4000);}, function(errormsg){{Materialize.toast('Not Shared', 4000);});
					}

				},function onError(error) {
					hideBusy();
					alert('please enable GPS');
				},{enableHighAccuracy: true });
			}
		}, function(error){
			hideBusy();
			console.error("The following error occurred: "+error);
		});
		
	}
}]
);


phonecatControllers.controller('aboutCtrl', ['$scope', function ($scope) {

}]
);

phonecatControllers.controller('settingCtrl', ['$scope', function ($scope) {

	var Ps = [];
	for(var i =0; i<3; i++){
		var obj = {
				"phone":localStorage['phone'+i]
		};
		if(obj.phone != "" && obj.phone)
			Ps.push(obj); 
	} 


	$scope.phNums = Ps;
	$scope.addPh = function(){
		if($scope.phNums.length < 3)
			$scope.phNums.push({phone:""});
	};
	$scope.setPhones = function(){
		var Phs = $scope.phNums;
		console.log(Phs);
		if(Phs.length > 0){
			for(var i in Phs){
				localStorage['phone'+i] = Phs[i].phone;
			}
			Materialize.toast('Numbers Stored Successfully', 4000);
		}
		
	}

}]
);
