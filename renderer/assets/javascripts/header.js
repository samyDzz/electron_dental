const { ipcRenderer } = require('electron')


$('body').on('click','#tools-menu li',function(e){
	e.stopPropagation();
	var thiss = $(this);
	var img = thiss.find('.arrow-down');
	var box = thiss.find('.menu-expand');

	if( !img.hasClass('open-arrow') ){
		$('#tools-menu .arrow-down').removeClass('open-arrow');
		img.addClass('open-arrow');
		$('.menu-expand').hide();
		box.show();
	}else{
		img.removeClass('open-arrow');
		box.hide();
	}

});

$('body').click(function(){
	$('.menu-expand').hide();
	$('.arrow-down').removeClass('open-arrow');
});

$('body').on('click','#logout',function(){
	var args = {
	    
	};

	let response = ipcRenderer.sendSync( 'logout', args)
});

// $('body').click(funciton(){
	
// });













