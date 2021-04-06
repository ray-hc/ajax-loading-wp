# ajax-loading-wp

The following Javascript code was designed to be inserted into the top of a Wordpress site in order to enable AJAX loading on all page links. It was specifically created for webdcr.com, an online radio station, so that users could navigate within the site without having to re-play the stream on each page.

The benefit of this code is that it allows other users to create and edit pages in Wordpress without taking extra steps to make AJAX work. AJAX loading is disabled on the Admin dashboard by default; additional links can have AJAX disabled by assigning the "noAJAX" class. To insert Javascript at the top of the page-body, I suggest a Wordpress plugin like "Insert Headers and Footers". 
