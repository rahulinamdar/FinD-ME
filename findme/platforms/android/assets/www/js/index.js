(function ($) {
    $(function () {

        $('.button-collapse').sideNav({
            closeOnClick: true
        });
        
        $('.addBTN').on('click',function(event){
        	console.log('hi');
        });
        $('.showfirst').on('click',function(event){
        	console.log('hi');
        	$('#slider1').hide();
    		$('#homesSCR').show();
    		 $(this).hide();
        });


    }); // end of document ready
})(jQuery);

function showBusy(){
$("#busyIN").show();
}
function hideBusy(){
$("#busyIN").hide();
}

