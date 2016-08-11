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
	$("a[rel^='prettyPhoto']").prettyPhoto({
		default_width: 640,
		default_height: 390
	});


/*---------------------------------------------------------------------------*
 * Scrollspy Animated
/*---------------------------------------------------------------------------*/		
	
	// Add scrollspy to <body>
	$('body').scrollspy({target: ".nav", offset: 50});   

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
	
	
/*---------------------------------------------------------------------------*
 * Smooth scroll link to anchor
/*---------------------------------------------------------------------------	
	function filterPath(string) {
	return string
	.replace(/^\//,'')
	.replace(/(index|default).[a-zA-Z]{3,4}$/,'')
	.replace(/\/$/,'');
	}
	var locationPath = filterPath(location.pathname);
	var scrollElem = scrollableElement('html', 'body');

	$('a[href*=#]').each(function() {
	var thisPath = filterPath(this.pathname) || locationPath;
	if (  locationPath == thisPath
	&& (location.hostname == this.hostname || !this.hostname)
	&& this.hash.replace(/#/,'') ) {
	  var $target = $(this.hash), target = this.hash;
	  if (target) {
		var targetOffset = $target.offset().top;
		$(this).click(function(event) {
		  event.preventDefault();
		  $(scrollElem).animate({scrollTop: targetOffset}, 400, function() {
			location.hash = target;
		  });
		});
	  }
	}
	});

	// use the first element that is "scrollable"
	function scrollableElement(els) {
	for (var i = 0, argLength = arguments.length; i <argLength; i++) {
	  var el = arguments[i],
		  $scrollElement = $(el);
	  if ($scrollElement.scrollTop()> 0) {
		return el;
	  } else {
		$scrollElement.scrollTop(1);
		var isScrollable = $scrollElement.scrollTop()> 0;
		$scrollElement.scrollTop(0);
		if (isScrollable) {
		  return el;
		}
	  }
	}
	return [];
	}
	*/
});