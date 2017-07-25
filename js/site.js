function getSite(url) {
	return url.split('/').pop();
}

$(window).on('load', function() {
	var site = getSite(window.location.href);
	console.log(site);
	$('#content').load('src/' + site, function() {
		$('#preloader').delay(350).fadeOut('slow');
	});
});

function changeSite(site, replace) {
	$('#content').fadeOut('normal', function() {
		$('#content').load('src/' + site, function() {
			$('#content').fadeIn('normal');
			if(replace === true) window.history.replaceState(site, "Spacehuhn " + site, '/' + site);
			else window.history.pushState(site, "Spacehuhn " + site, '/' + site);
		});
	});
}

$(window).on('popstate', function(event) {
	console.log("go to: '"+getSite(window.location.href)+"'");
	changeSite(getSite(window.location.href), true);
});

function changeImage(){
	document.getElementById("spacehuhngallery").src = "img/gallery/"+(Math.floor(Math.random() * 15))+".jpg";
}