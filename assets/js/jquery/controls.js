var vcurrnet = 0;
var maks = 5;
var efekti = 'fadeIn';
rotate_delay = 7000;

var vnext = vcurrnet + 1;
var vprev = vcurrnet - 1;
	
	
	
	
	
	function rotate() {
		
			
		if(vnext == maks){
			vnext = 1;
		}
		
		
		if(vnext < maks){
			change(vnext);
		}
	
	window.setTimeout("rotate()", rotate_delay);
	}
	
	
	
	
	
	
	function next() {
		if(vcurrnet < maks){
			vnext = vnext + 1;
		}
		
		
		vcurrnet = vnext - 1;
		
		if(vcurrnet > 1){
		vprev = vcurrnet - 1;
		}
		
		
		if(vcurrnet > 1){
		$('#prev').show();
		}

		if(vcurrnet == 1){
		$('#prev').hide();
		}


		if(vnext > maks - 1){
		$('#next').hide();
		}
		else
		{
		$('#next').show();	
		}

		
		
		for(g = 1; g < maks; g++) {
			$('#int' + g).removeClass("active");
		}
		$('#int' + vcurrnet).addClass("active");

}

function change(d) {
	
	

	var d  = Number(d);
	var nxt = 0;
	
	nxt = d + 1;
	vnext =nxt;
	vprev = d - 1;
	vcurrnet = d;
	
		for(g = 1; g < maks; g++) {
			$('#int' + g).removeClass("active");
		}
		$('#int' + vcurrnet).addClass("active");
		
	
				//document.getElementById('pre').value = vprev;
										//document.getElementById('cur').value = vcurrnet;
										//document.getElementById('nxt').value = vnext;
		
		Effect();
		
		
		if(vnext > maks - 1){
		$('#next').hide();
		}
		else
		{
		$('#next').show();
		}
		
		if(vcurrnet == 1){
		$('#prev').hide();
		}
		else
		{
		$('#prev').show();
		}
}
	
	



	

	
	function prev() {
		
		
		if(vcurrnet > 1) {
		vnext = vnext - 1;
		}
			
	
		if(vprev > 0) {
		vcurrnet = vnext - 1;
		}
		
	
			if(vprev > 0) {
				vprev = vcurrnet - 1;
			}
			
			
		
		
		
		if(vcurrnet > 1){
		$('#prev').show();
		}

		if(vcurrnet == 1){
		$('#prev').hide();
		}
		
		
		if(vnext > maks - 1){
		$('#next').hide();
		}
		else
		{
		$('#next').show();	
		}
		
		
		for(g = 1; g < maks; g++) {
			$('#int' + g).removeClass("active");
		}
		$('#int' + vcurrnet).addClass("active");		
		
	}
	
	
	
	
	
		function Effect() {
		
			
			
			
				switch(efekti)
				{
				case 'fadeIn':
				  $('.images').hide();
				  $('#images' + vcurrnet).fadeIn();
				  break;
				
				
				
				case 'slideDown':
				
			
				  $('.images').hide();
				  $('#images' + vcurrnet).slideDown("slow");
			
				
				  break;
				default:
				  $('.images').hide();
				  $('#images' + vcurrnet).fadeIn();
				}
			
			
			

		}
					
					
					
					$(document).ready(function(){
											   
											   
										$('.images').hide();
										$('#images' + vcurrnet).show();
										
											
										
							
											var tpp = '';
											for(g = 1; g < maks; g++) {
											
												tpp = tpp + '<span id="int' + g + '" class="controls" onClick="change(\' ' + g + ' \' );">' + g + '</span>';
											}
							
							
											$('#myDiv').html(tpp);
											$('#int' + vcurrnet).addClass("active");
											
											
											rotate();
							
						

																
										//document.getElementById('pre').value = vprev;
										//document.getElementById('cur').value = vcurrnet;
										//document.getElementById('nxt').value = vnext;
										
										
										if(vprev == 0) {
											$('#prev').hide();
										}
										

							
								
								$('#next').click(function() {
										next();
									
										//document.getElementById('pre').value = vprev;
										//document.getElementById('cur').value = vcurrnet;
										//document.getElementById('nxt').value = vnext;
										
										Effect();

										
											
											
										
										
										});

								$('#prev').click(function() {
										prev();
												//document.getElementById('pre').value = vprev;
										//document.getElementById('cur').value = vcurrnet;
										//document.getElementById('nxt').value = vnext;
										
										Effect();
										
										});
								
								
								

							
								
								


});
					
					
			
	
