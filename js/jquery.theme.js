jQuery(document).ready(function($) {

/*---------------------------------------------------------------------------*
 * Scroll to top
/*---------------------------------------------------------------------------*/
	$('#footer a#top').click(function() {
		$('html, body').animate({scrollTop:0},'slow');
		return false;
	});

	
/*---------------------------------------------------------------------------*
 * Tabs
/*---------------------------------------------------------------------------*/
	(function() {
		var $tabsNav       = $('.alx-tabs-nav'),
			$tabsNavLis    = $tabsNav.children('li'),
			$tabsContainer = $('.alx-tabs-container');

		$tabsNav.each(function() {
			var $this = $(this);
			$this.next().children('.alx-tab').stop(true,true).hide()
			.siblings( $this.find('a').attr('href') ).show();
			$this.children('li').first().addClass('active').stop(true,true).show();
		});

		$tabsNavLis.on('click', function(e) {
			var $this = $(this);

			$this.siblings().removeClass('active').end()
			.addClass('active');
			
			$this.parent().next().children('.alx-tab').stop(true,true).hide()
			.siblings( $this.find('a').attr('href') ).show();
			e.preventDefault();
		}).children( window.location.hash ? 'a[href=' + window.location.hash + ']' : 'a:first' ).trigger('click');

	})();	

	
/*---------------------------------------------------------------------------*
 * prettyPhoto
/*---------------------------------------------------------------------------*/	
	$("a[data-gal^='prettyPhoto'").prettyPhoto({
		hook: 'data-gal',
		default_width: 640,
		default_height: 390
	});


/*---------------------------------------------------------------------------*
 * Parallax
/*---------------------------------------------------------------------------*/	
	if ($(window).width() >= 1024){
		
		$(window).scroll(function(e){
			parallax();
		});
		function parallax(){
			var scrolled = $(window).scrollTop();
			$('#subheader').css('top',-(scrolled*0.2)+'px');
			$('#earth').css('top',(scrolled*0.4)+'px');
		}
		
	}
	
/*---------------------------------------------------------------------------*
 * Scrollspy Animated
/*---------------------------------------------------------------------------*/		

	// Add smooth scrolling on all links inside the navbar
	$(".nav a").on('click', function(event) {
		// Make sure this.hash has a value before overriding default behavior
		if (this.hash !== "") {
			// Prevent default anchor click behavior
			event.preventDefault();

			// Store hash
			var hash = this.hash;

			// Using jQuery's animate() method to add smooth page scroll
			// The optional number (400) specifies the number of milliseconds it takes to scroll to the specified area
			$('html, body').animate({
				scrollTop: $(hash).offset().top
			}, 400, function(){
	   
			// Add hash (#) to URL when done scrolling (default click behavior)
			window.location.hash = hash;
			});
		}  // End if
	});

});