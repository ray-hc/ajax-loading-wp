// JavaScript Document
// start AJAX functions below: 
function addSameSiteLinkClickEvent() {
	$("body").on("click", "a:not(.noAJAX)", function(clickEvent){
		console.log("Clicked! " + this.pathname);
		
		var path = this.pathname;
  
		if (this.hostname == window.location.hostname && !path.includes("wp-admin")) {
			clickEvent.preventDefault(); // don't do what normally happens when link gets clicked
			
			newEntryContent = path + " .site-content";
			ran = false;
			$(".site-content").load(newEntryContent, function() {
				if (!ran) { // prevents callback from running 2x (related to nnature of AJAX callbacks).
					actionsOnLoad(path);
					ran = true;
				}
			});
		}
	})
}

// when back button clicked, triggers AJAX for prior page.
function sameSiteLinkPopstate() {
	newEntryContent = window.location.pathname + " .site-content";
	$(".site-content").load(newEntryContent, function() {
		actionsOnLoad();
	})
}

// some pages have a '.posts-navigation' div outside '.site-content'
// this checks for that, adds if needed.
function managePostsNavigation(linkPath) {
	console.log("starting managePostsNavigation("+linkPath+")");
	var postsNav = document.getElementsByClassName("posts-navigation")[0];
	if (!postsNav) {
		$( "<div class='posts-navigation'></div>" ).insertAfter( ".site-content" );
	} else {
		$(".posts-navigation").html("");
		$(".posts-navigation").load(linkPath + " .posts-navigation");
	}
}

function actionsOnLoad(linkPath) {
	window.scrollTo(0, 0);
  	document.title = $(".entry-title:first a:first").html();
	if (linkPath) {
		history.pushState(null, null, linkPath); // make it look like we changed pages in page history
		managePostsNavigation(linkPath);
	}
}


// attaches all AJAX functions to the page
$(document).ready(function(){
	addSameSiteLinkClickEvent();
	window.addEventListener('popstate', function() {
		sameSiteLinkPopstate();
	});
});
