$(document).ready(function() {
	
	/* nav dropdown menu */
	if ($(window).width() > 768) {
		$('#navbar .nav').removeClass('animated bounceInDown');
		$('ul.nav li.dropdown').hover(function() {
			//$(this).find('.dropdown-menu').stop(true, true).fadeIn();
			//$(this).find('.dropdown-menu').stop(true, true).slideDown();
			$(this).find('.dropdown-menu').removeClass('animated flipOutY').addClass('animated rubberBand');
			$(this).addClass('open');
		}, function() {
			//$(this).find('.dropdown-menu').stop(true, true).fadeOut();
			//$(this).find('.dropdown-menu').stop(true, true).slideUp();
			//$(this).find('.dropdown-menu').removeClass('animated flipInY').addClass('animated flipOutY');
			$(this).removeClass('open');
		});
	} else {
		$('#navbar .nav').addClass('animated bounceInDown');
	}
	
	/* smooth scrolling for nav sections */
	$('.navbar-nav li > a').click(function() {
		var link = $(this).attr('href');
		var posi = $(link).offset().top;
		$('body,html').animate({
			scrollTop : posi
		}, 700);
	});

	/* highlight the navbar as scrolling occurs */
	$('body').scrollspy({
		target : '#navbar',
		offset: 50
	});

	/* affix the navbar after scroll below header */
	$('#nav').affix({
		offset : {
			top : $('#header').outerHeight() - $('#nav').height()
		}
	});

	/* scroll link */
	$(function() {
		$('a.page-scroll').bind('click', function(event) {
			var $anchor = $(this);
			$('html, body').stop().animate({
				scrollTop : $($anchor.attr('href')).offset().top - 75
			}, 1500, 'easeInOutExpo');
			event.preventDefault();
		});
	});
	
	/* remove focus from bootstrap btn */
	$('.btn').focus(function(event) {
		event.target.blur();
	});

	/* remove empty p tag */
	$('p').each(function() {
		var $this = $(this);
		if ($this.html().replace(/\s|&nbsp;/g, '').length == 0)
			$this.remove();
	});

	/* remove error image */
	$("img").error(function () { 
    	$(this).hide(); 
	});
	
	/* window scroll */
	// $fn.scrollSpeed(step, speed, easing);
	jQuery.scrollSpeed(100, 600);
	
	/* smoove */
	//$('#hero, #features, #storage, #services, #callback, #contact').smoove({ offset: '20%' });
	$('#contact').smoove({
		moveY: '200px',
		moveZ: '-500px',
		rotateX: '90deg'
	});
	
	/* map */
	$(document).on('click', '.map_link', function(e) {
		e.preventDefault();
		var directionsService = new google.maps.DirectionsService();
		var directionsDisplay = new google.maps.DirectionsRenderer();
	});

	$('.map-overlay').width($('#map_canvas').width());
	$('.map-overlay').height($('#map_canvas').height());

	$(window).resize(function() {
		$('.map-overlay').width($('#map_canvas').width());
		$('.map-overlay').height($('#map_canvas').height());
	});

	$('.toggle-map').on('click', function(e) {
		e.preventDefault();
		$('.hide-overlay').toggleClass('show-overlay');
		$('.map-overlay').toggleClass('overlay-hide');
	});
	
	/* disable right click */
	document.addEventListener("contextmenu", function(e) {
		e.preventDefault();
	}, false);

	/* disable developer mode (f12) */
	document.addEventListener("keydown", function(event) {
		event = (event || window.event);
		if (event.keyCode == 123) {
			return false;
		} else if (event.ctrlKey && event.shiftKey && event.keyCode == 73) {
			return false;
			// Prevent from ctrl+shift+i
		}
	}, false);
	
});

/* contact form verify */
function verify() {
	/* Reset modal content */
	$('.modal-title').html(null);
	$('.modal-body').html(null);
	/* Check form fields */
	var error = 0;
	var elm = ['name', 'email', 'message'];
	for (var i = 0; i < elm.length; i++) {
		if (document.getElementById(elm[i]).value.trim() == null || document.getElementById(elm[i]).value.trim() == '' || document.getElementById(elm[i]).value.trim() == '0') {
			/*document.getElementById(elm[i]).value = '';
			document.getElementById(elm[i]).classList.add('error');*/
			document.getElementById(elm[i]).style.outline = '1px solid red';
			error = 1;
			if (elm[i] == 'msg_type' || elm[i] == 'test') {
				$('#' + elm[i] + '').selectpicker('setStyle', 'btn-danger');
			}
		} else {
			document.getElementById(elm[i]).classList.remove('error');
			document.getElementById(elm[i]).style.outline = 'none';
			if (elm[i] == 'msg_type' || elm[i] == 'test') {
				$('#' + elm[i] + '').selectpicker('setStyle', 'btn-danger', 'remove');
				$('#' + elm[i] + '').selectpicker('refresh');
			}
		}
		if (elm[i] == 'email_address') {
			if (document.getElementById('email_address').value.trim() != '') {
				var emailReg1 = /(@.*@)|(\.\.)|(@\.)|(\.@)|(^\.)/;
				var emailReg2 = /^.+\@(\[?)[a-zA-Z0-9\-\.]+\.([a-zA-Z]{2,6}|[0-9]{1,3})(\]?)$/;
				if (!(!emailReg1.test(document.getElementById('email_address').value.trim()) && emailReg2.test(document.getElementById('email_address').value.trim()))) {
					/*document.getElementById(elm[i]).value = '';
					document.getElementById(elm[i]).classList.add('error');*/
					document.getElementById('email').style.outline = '1px solid red';
					error = 1;
				} else {
					//document.getElementById(elm[i]).classList.remove('error');
					document.getElementById(elm[i]).style.outline = 'none';
				}
			}
		}
	}
	if (error == 0) {
		//this.form.submit();
		//document.getElementById('kontakt').submit();
		var data = $('#contact_form').serialize();
		$.ajax({
			type : 'post',
			dataType : 'json',
			data : data,
			url : 'email.php',
			success : function(response) {
				if (response.error == 0) {
					$('.flip-container').toggleClass('hover');
				}
			}
		});
		return false;
	} else {
		//alert('All fields are requested!');
		$('.modal-title').html('Error!');
		$('.modal-body').html('* Please fill in the required fields.');
		$('#myModal').modal('show');
		return false;
	}
}