$(document).ready(function() {
    alert("!!! IMPORTANT ALERT !!!\n\nThis website is still undergoing SERIOUS CRUCIAL DEVELOPMENT! Bugs WILL occur. Please read the list below of current errors & ways around them.\n\n- How to play game?\n   + We have only two current functioning games... but when you select one, press the first card in the games section that reads 'view current game' to play.\n\n- How to view tabs/sections?\n   + Use navbar on the left of your screen... the home screen buttons dont work, gotta work on that.\n\n- Whats the catalog/store?\n   + i dunno, gotta wait until people sponsor me (which will be after development is finished unfortunately..)\n\nOk go have fun now i guess with the two games. the themes are pretty cool tho too i think :)")
    $('#games').hide();
    $('#current').hide();
    $('#store').hide();
    $('#settings').hide();
    $('#proxy1').hide();
    $('#home').show();
});

$(document).ready(function() {
    $('#games-btn').click(function() {
        if ($('#games').is(':visible')) {
            return;
        }
        $('#current, #home, #store, #settings').addClass('disabled').stop(true, true).fadeOut('slow', function() {
            $(this).removeClass('disabled');
            $('#games').addClass('disabled').fadeIn('slow', function() {
                $(this).removeClass('disabled');
            });
        });
    });

    $('#home-btn').click(function() {
        if ($('#home').is(':visible')) {
            return;
        }
        $('#games, #current, #store, #settings').addClass('disabled').stop(true, true).fadeOut('slow', function() {
            $(this).removeClass('disabled');
            $('#home').addClass('disabled').fadeIn('slow', function() {
                $(this).removeClass('disabled');
            });
        });
    });
  
    $('#play-btn').click(function() {
        if ($('#store').is(':visible')) {
            return;
        }
        $('#games, #home, #current, #settings').addClass('disabled').stop(true, true).fadeOut('slow', function() {
            $(this).removeClass('disabled');
            $('#store').addClass('disabled').fadeIn('slow', function() {
                $(this).removeClass('disabled');
            });
        });
    });
  
    $('#settings-btn').click(function() {
        if ($('#settings').is(':visible')) {
            return;
        }
        $('#games, #home, #store, #current').addClass('disabled').stop(true, true).fadeOut('slow', function() {
            $(this).removeClass('disabled');
            $('#settings').addClass('disabled').fadeIn('slow', function() {
                $(this).removeClass('disabled');
            });
        });
    });
});

function changeNoodleGuy(gamename, url) {
  $('#noodleguy').text(gamename);
  $('#gameFrame').attr('src', url);
  $('#games, #home', '#store, #settings').addClass('disabled').stop(true, true).fadeOut('slow', function() {
      $(this).removeClass('disabled');
      $('#current').addClass('disabled').fadeIn('slow', function() {
          $(this).removeClass('disabled');
      });
  });
}

$('.card').click(function() {
  const gamename = $(this).find('.title').text();
  const url = $(this).data('url');
  changeNoodleGuy(gamename, url);
});

$('.card1').click(function() {
  $('#games, #home, #store, #settings').addClass('disabled').stop(true, true).fadeOut('slow', function() {
      $(this).removeClass('disabled');
      $('#current').addClass('disabled').fadeIn('slow', function() {
          $(this).removeClass('disabled');
      });
  });
});

$('.fullscreen-btn').click(function() {
  

  if (document.fullscreenElement) {
    document.exitFullscreen();
  } else {
    document.getElementById('gameFrame').requestFullscreen();
  }
});

$('.resize-btn').click(function() {
  alert("We Apologize...\n\nThis feature is currently unavailable, and is undergoing development(s). Please try again later.")
});

$('.cloak-btn').click(function() {
  
  
  // Open a new tab with the URL: "about:blank":
  var newTab = window.open("about:blank", "_blank");

  // Embed an iframe(100vh, 100vw), on the new tab with the body having margin: 0;.
  newTab.document.body.style.margin = "0";
  newTab.document.body.title = "Learning | Curriculum"
  var iframe = newTab.document.createElement("iframe");
  iframe.style.width = "100vw";
  iframe.style.height = "100vh";
  iframe.src = document.getElementById("gameFrame").src;
  newTab.document.body.appendChild(iframe);

  // The source/website embedded into the iFrame will be the src value under the gameFrame element
  

  // Set a message on the new tab's console to confirm the URL is correct.
  newTab.console.log("The URL of the embedded iframe is: " + iframe.src);

  // Close the game page and return to the homepage.
  $('#current').hide();
  $('#games').fadeIn('slow');

  // Return false to prevent the default behavior of the click event.
  return false;

});

document.getElementById("proxy-input")
    .addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            document.getElementById("proxy-launch").click();
        }
    });

document.getElementById("proxy-launch").onclick = function (event) {
    event.preventDefault();

    let url = document.getElementById("proxy-input").value; // if no periods are detected in the input, search google instead
    let searchUrl = "https://www.google.com/search?q=";

    if (!url.includes(".")) {
        url = searchUrl + encodeURIComponent(url);
    } else {
        if (!url.startsWith("http://") && !url.startsWith("https://")) { // if no http or https is detected, add https automatically
            url = "https://" + url;
        }
    }

    document.getElementById("proxyFrame").src = __uv$config.prefix + __uv$config.encodeUrl(url);
};

/*********************************************************************

                          SECTION_SETTINGS

*********************************************************************/

document.getElementById('save-func').addEventListener('click', function() {
  localStorage.setItem('theme', document.getElementById('theme-select').value.toLowerCase());
  localStorage.setItem('icon', document.getElementById('icon-url').value);
  localStorage.setItem('title', document.getElementById('tab-title').value);
  applySettings();
});

function applySettings() {
  // Get the settings from local storage
  var theme = localStorage.getItem('theme');
  var icon = localStorage.getItem('icon');
  var title = localStorage.getItem('title');

  document.body.classList.remove('default', 'ocean', 'midnight', 'hacker', 'light', 'azure');

  var themedElements = document.querySelectorAll('body, .navbar, .container, .desc, .title, .save-btn, .settings-container, .settings-option, .settings-content, .settings-content select, .card, .game-container, settings-container, proxy-container');
  themedElements.forEach(function(element) {
    element.classList.remove('default', 'ocean', 'midnight', 'hacker', 'light', 'azure');
  });

  // Apply the theme setting
  if (theme) {
    // Add the selected theme class to the body, navbar, and container
    themedElements.forEach(function(element) {
      element.classList.add(theme);
    });
  }

  // Apply the icon setting
  if (icon) {
    var link = document.querySelector("link[rel*='icon']") || document.createElement('link');
    link.type = 'image/x-icon';
    link.rel = 'shortcut icon';
    link.href = icon;
    document.getElementsByTagName('head')[0].appendChild(link);
  }

  // Apply the title setting
  if (title) {
    document.title = title;
  }

  // Set the dropdowns and input fields to the saved settings
  document.getElementById('theme-select').value = theme || 'default';
  document.getElementById('cheat-select').value = cheats || 'disabled';
  document.getElementById('icon-url').value = icon || '';
  document.getElementById('tab-title').value = title || '';
}

// Run the function to apply the settings
applySettings();