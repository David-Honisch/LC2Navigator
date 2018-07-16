jQuery.noConflict();
jQuery(document).ready(function(){

	// IE6 background image flicker fix
	try {
		document.execCommand("BackgroundImageCache", false, true);
	} catch(e) {}

	jQuery('li.headlink').hover(
				function() { jQuery('ul', this).css('display', 'block'); },
				function() { jQuery('ul', this).css('display', 'none'); });		
		
	jQuery(function() {
		jQuery("#tabs").tabs();
	});
	
	var	prev = null;
	
	jQuery('.showhide').bind('click', null,function(event) {
		var	next = jQuery(event.target).next();		
		next.toggle();				
		
		if (next.is(':visible') )
		{					
			jQuery(event.target).removeClass('showhide');
			jQuery(event.target).addClass('showhideopen');						
		}else
		{			
			jQuery(event.target).removeClass('showhideopen');
			jQuery(event.target).addClass('showhide');
			
		}
		
		
		return false;
	});
	
	var elements = jQuery('.showhide');
	for( var i = 0; i < elements.length; i++ )
	{			
		ele = jQuery(elements[i]);
		ele.next().hide();
	}

});