/*
* Greedy Navigation - DISABLED
* Links are always visible via CSS flex layout.
* Only masthead height padding is preserved.
*/

$(document).ready(function() {
  // Hide the hamburger button
  $('#site-nav button').addClass('hidden');

  // Make sure all links stay in visible-links
  $('#site-nav .hidden-links').children().appendTo($('#site-nav .visible-links'));
  $('#site-nav .hidden-links').addClass('hidden');

  // Still update body padding for masthead height
  var mastheadHeight = $('.masthead').height();
  $('body').css('padding-top', mastheadHeight + 'px');

  $(window).on('resize', function() {
    var mastheadHeight = $('.masthead').height();
    $('body').css('padding-top', mastheadHeight + 'px');
  });
});
