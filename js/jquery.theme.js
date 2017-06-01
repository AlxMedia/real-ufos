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

/*---------------------------------------------------------------------------*
 * Animate On Scroll
/*---------------------------------------------------------------------------*/
	AOS.init({
		easing: 'ease-in-out-sine',
		// disable: 'mobile',
		once: true,
		offset: 50
	});

		
/*---------------------------------------------------------------------------*
 * Moving Pixies
/*---------------------------------------------------------------------------*/

// Drawing dimensions
var WIDTH = window.innerWidth,
    HEIGHT = window.innerHeight,
    MAX_PARTICLES = 150,
    DRAW_INTERVAL = 60,
    container = document.querySelector('#pixie-container'),
    canvas = document.querySelector('#pixie'),
    context = canvas.getContext('2d'),
    gradient = null,
    pixies = new Array();

function setDimensions(e) {
    WIDTH = window.innerWidth;
    HEIGHT = window.innerHeight;
    container.style.width = WIDTH+'px';
    container.style.height = '480px';
    canvas.width = WIDTH;
    canvas.height = HEIGHT;
}
setDimensions();
window.addEventListener('resize', setDimensions);

// Circle object
function Circle() {
    this.settings = {ttl:8000, xmax:5, ymax:2, rmax:10, rt:1, xdef:960, ydef:540, xdrift:4, ydrift: 4, random:true, blink:true};

    this.reset = function() {
        this.x = (this.settings.random ? WIDTH*Math.random() : this.settings.xdef);
        this.y = (this.settings.random ? HEIGHT*Math.random() : this.settings.ydef);
        this.r = ((this.settings.rmax-1)*Math.random()) + 1;
        this.dx = (Math.random()*this.settings.xmax) * (Math.random() < .5 ? -1 : 1);
        this.dy = (Math.random()*this.settings.ymax) * (Math.random() < .5 ? -1 : 1);
        this.hl = (this.settings.ttl/DRAW_INTERVAL)*(this.r/this.settings.rmax);
        this.rt = Math.random()*this.hl;
        this.settings.rt = Math.random()+1;
        this.stop = Math.random()*.2+.4;
        this.settings.xdrift *= Math.random() * (Math.random() < .5 ? -1 : 1);
        this.settings.ydrift *= Math.random() * (Math.random() < .5 ? -1 : 1);
    }

    this.fade = function() {
        this.rt += this.settings.rt;
    }

    this.draw = function() {
        if(this.settings.blink && (this.rt <= 0 || this.rt >= this.hl)) {
            this.settings.rt = this.settings.rt*-1;
        } else if(this.rt >= this.hl) {
            this.reset();
        }

        var newo = 1-(this.rt/this.hl);
        context.beginPath();
        context.arc(this.x, this.y, this.r, 0, Math.PI*2, true);
        context.closePath();

        var cr = this.r*newo;
        gradient = context.createRadialGradient(this.x, this.y, 0, this.x, this.y, (cr <= 0 ? 1 : cr));
        gradient.addColorStop(0.0, 'rgba(255,255,255,'+newo+')');
        gradient.addColorStop(this.stop, 'rgba(77,101,181,'+(newo*.6)+')');
        gradient.addColorStop(1.0, 'rgba(77,101,181,0)');
        context.fillStyle = gradient;
        context.fill();
    }

    this.move = function() {
        this.x += (this.rt/this.hl)*this.dx;
        this.y += (this.rt/this.hl)*this.dy;
        if(this.x > WIDTH || this.x < 0) this.dx *= -1;
        if(this.y > HEIGHT || this.y < 0) this.dy *= -1;
    }

    this.getX = function() { return this.x; }
    this.getY = function() { return this.y; }
}

// Animating particles
for (var i = 0; i < MAX_PARTICLES; i++) {
    pixies.push(new Circle());
    pixies[i].reset();
}

function draw() {
    context.clearRect(0, 0, WIDTH, HEIGHT);
    for(var i = 0; i < pixies.length; i++) {
        pixies[i].fade();
        pixies[i].move();
        pixies[i].draw();
    }
}

setInterval(draw, DRAW_INTERVAL);
