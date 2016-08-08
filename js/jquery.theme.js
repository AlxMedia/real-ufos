jQuery(document).ready(function($) {

/*---------------------------------------------------------------------------*
 * Scroll to top
/*---------------------------------------------------------------------------*/
	$('#footer a#top').click(function() {
		$('html, body').animate({scrollTop:0},'slow');
		return false;
	});
	$('a.toggle-button').click(function() {
		$('html, body').animate({scrollTop:0},'slow');
		return false;
	});

/*---------------------------------------------------------------------------*
 * Scrollspy Animated
/*---------------------------------------------------------------------------*/	
	$(function() {
		$('#header').scrollSpy()			
		$('#header ul.nav li a').bind('click', function(e) {
			e.preventDefault();
			target = this.hash;
			console.log(target);
			$.scrollTo(target, 1000);
		});
	});
	
/*---------------------------------------------------------------------------*
 * prettyPhoto
/*---------------------------------------------------------------------------*/	
	$("a[rel^='prettyPhoto']").prettyPhoto({
		default_width: 640,
		default_height: 390
	});

/*---------------------------------------------------------------------------*
 * Smooth scroll link to anchor
/*---------------------------------------------------------------------------*/	
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
	
});