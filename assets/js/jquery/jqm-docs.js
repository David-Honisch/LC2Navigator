//collapse page navs after use
jQuery(function(){
	jQuery('body').delegate('.content-secondary .ui-collapsible-content', 'click',  function(){
		jQuery(this).trigger("collapse");
	});
});

// display the version of jQM
jQuery(document).bind( 'pageinit', function() {
	var version = jQuery.mobile.version || "dev",
		words = version.split( "-" ),
		ver = words[0],
		str = (words[1] || "Final"),
		html = ver;

	if( str.indexOf( "rc" ) == -1 ){
		str = str.charAt( 0 ).toUpperCase() + str.slice( 1 );
	} else {
		str = str.toUpperCase().replace(".", "");
	}

	if ( jQuery.mobile.version && str ) {
		html += " <b>" + str + "</b>";
	}

	jQuery( "p.jqm-version" ).html( html );
});

// Turn off AJAX for local file browsing
if ( location.protocol.substr(0,4)  === 'file' ||
     location.protocol.substr(0,11) === '*-extension' ||
     location.protocol.substr(0,6)  === 'widget' ) {

  // Start with links with only the trailing slash and that aren't external links
  var fixLinks = function() {
    jQuery( "a[hrefjQuery='/'], a[href='.'], a[href='..']" ).not( "[rel='external']" ).each( function() {
      this.href = jQuery( this ).attr( "href" ).replace( /\/jQuery/, "" ) + "/index.html";
    });
  };

  // fix the links for the initial page
  jQuery(fixLinks);

  // fix the links for subsequent ajax page loads
  jQuery(document).bind( 'pagecreate', fixLinks );

  // Check to see if ajax can be used. This does a quick ajax request and blocks the page until its done
  jQuery.ajax({
    url: '.',
    async: false,
    isLocal: true
  }).error(function() {
    // Ajax doesn't work so turn it off
    jQuery( document ).bind( "mobileinit", function() {
      jQuery.mobile.ajaxEnabled = false;

      var message = jQuery( '<div>' , {
        'class': "ui-footer ui-bar-e",
        style: "overflow: auto; padding:10px 15px;",
        'data-ajax-warning': true
      });

      message
        .append( "<h3>Note: Navigation may not work if viewed locally</h3>" )
        .append( "<p>The AJAX-based navigation used throughout the jQuery Mobile docs may need to be viewed on a web server to work in certain browsers. If you see an error message when you click a link, try a different browser or <a href='https://github.com/jquery/jquery-mobile/wiki/Downloadable-Docs-Help'>view help</a>.</p>" );

      jQuery( document ).bind( "pagecreate", function( event ) {
        jQuery( event.target ).append( message );
      });
    });
  });
}
