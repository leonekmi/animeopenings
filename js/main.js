// dem global vars
var isKonaming = false;

// Show the menu
function showMenu() {
  document.getElementById("site-menu").className = "";
  if (isKonaming) { // ko class if konami code is active
    document.getElementById("site-menu").className = "is-visible ko fa-spin";
  }
  else { // regular classes otherwise
    document.getElementById("site-menu").className = "is-visible ko";
  }
  // Hide the menu button
  document.getElementById("menubutton").className = "";
  document.getElementById("menubutton").className = "fa fa-bars quadbutton is-hidden";
}

// Hide the menu
function hideMenu() {
  document.getElementById("site-menu").className = "";
  if (isKonaming) { // ko class if konami code is active
    document.getElementById("site-menu").className = "is-hidden ko fa-spin";
  }
  else { // regular classes otherwise
    document.getElementById("site-menu").className = "is-hidden ko";
  }
  // Hide button
  document.getElementById("menubutton").className = "";
  document.getElementById("menubutton").className = "fa fa-bars quadbutton ko";
}

// Shit play/Pause button
function playPause() {
  // Set media player variable
  var mediaPlayer = document.getElementById('bgvid');

  // If video is paused
  if (mediaPlayer.paused) {
    mediaPlayer.play(); // Play video
    document.getElementById("pause-button").className = "";
    if (isKonaming) { // Konami class
      document.getElementById("pause-button").className = "fa fa-pause quadbutton ko fa-spin";
    }
    else { // Regular class
      document.getElementById("pause-button").className = "fa fa-pause quadbutton ko";
    }
  }
  // Otherwise
  else {
    mediaPlayer.pause(); // Pause the video
    document.getElementById("pause-button").className = "";
    if (isKonaming) { // Konami classes
      document.getElementById("pause-button").className = "fa fa-play quadbutton ko fa-spin";
    } else { // Regular classes
      document.getElementById("pause-button").className = "fa fa-play quadbutton ko";
    }
  }
}


// Lazy seeking funtion that might get implemented in the future
function skip(value) {
  var video = document.getElementById("bgvid"); // Get video
  video.currentTime += value; // Set time to current time + given value
}

// Autoplay by Howl
var autonext = false;
var toggleAutonext = function() {
  autonext = !autonext;
  if (autonext) {
    if (isKonaming) {
      $('#autonext').attr('class', 'fa fa-toggle-on quadbutton ko fa-spin');
    }
    else {
      $('#autonext').attr('class', 'fa fa-toggle-on quadbutton ko');
    }
    $('video').removeAttr('loop');
  } else {
    if (isKonaming) {
      $('#autonext').attr('class', 'fa fa-toggle-off quadbutton ko fa-spin');
    }
    else {
      $('#autonext').attr('class', 'fa fa-toggle-off quadbutton ko');
    }
    $('video').attr('loop', '');
  }
}
var onend = function() {
  if (autonext) {
    $.getJSON('nextvideo.php', function(data) {
      console.log(data);
      var videourl = data['videourl'];
      $('source').attr('src', videourl);
      $('video')[0].load();
      $('#title').html(data['videoname']['title']);
      $('#source').html("From " + data['videoname']['source']);
      $('#videolink').attr('href', 'http://openings.moe/?video=' + data['videofname']);
      document.title = data['videoname']['title'] + " from " + data['videoname']['source'];
    });
  }
};


// Lazy new video mod of Howl's code
var newvideo = function() {
  $.getJSON('nextvideo.php', function(data) {
    console.log(data); // Output to the console
    var videourl = data['videourl']; // Video url variable
    //Set all the shit
    $('source').attr('src', videourl);
    $('video')[0].load();
    $('#title').html(data['videoname']['title']);
    $('#source').html("From " + data['videoname']['source']);
    $('#videolink').attr('href', 'http://openings.moe/?video=' + data['videofname']);
    document.title = data['videoname']['title'] + " from " + data['videoname']['source'];
  });
};

// Shitty tooltip code
function showTooltip(content) {
  document.getElementById("tooltip").className = "is-visible";
  document.getElementById('tooltip').innerHTML = content;
}

function hideTooltip() {
  document.getElementById("tooltip").className = "is-hidden";
}

// Keyboard functions
$(document).keydown(function(e) {
    switch(e.which) {
        case 32: // Space
          playPause();
          break;
        case 37: // Left Arrow
          skip(-10);
          break;
        case 39: // Right Arrow
          skip(10);
          break;
        case 78: // N
          newvideo();
          break;
        default: return;
    }
    e.preventDefault();
});

/*
 * Konami Code For jQuery Plugin
 * 1.3.0, 7 March 2014
 *
 * Using the Konami code, easily configure and Easter Egg for your page or any element on the page.
 *
 * Copyright 2011 - 2014 Tom McFarlin, http://tommcfarlin.com
 * Released under the MIT License
 */

(function ( $ ) {
  "use strict";

  $.fn.konami = function( options ) {
    var opts, controllerCode;

    opts = $.extend({}, $.fn.konami.defaults, options);
    controllerCode = [];

    // note that we use the passed-in options, not the resolved options
    opts.eventProperties = $.extend({}, options,  opts.eventProperties);

    this.keyup(function( evt ) {
      var code = evt.keyCode || evt.which;

      if ( opts.code.length > controllerCode.push( code ) ) {
        return;
      } // end if

      if ( opts.code.length < controllerCode.length ) {
        controllerCode.shift();
      } // end if

      if ( opts.code.toString() !== controllerCode.toString() ) {
        return;
      } // end if

      opts.cheat(evt, opts);

    }); // end keyup

    return this;
  }; // end opts

  $.fn.konami.defaults = {
    code : [38,38,40,40,37,39,37,39,66,65],
    eventName : 'konami',
    eventProperties : null,
    cheat: function(evt, opts) {
      $(evt.target).trigger(opts.eventName, [ opts.eventProperties ]);
    }
  };

}( jQuery ));

// le konami code easter egg
// why fa-spin? Because it saves bandwith by not creating an identical class with the same stuff!!!
// (aka: i'm lazy)
// --howl

$(window).konami({
  cheat: function() {
    isKonaming = !isKonaming;
    $('.ko').toggleClass('fa-spin');
  }
});