(function () {

  // Grab body node
  const bodyNode = document.querySelector('body');

  // Callback function to execute when mutations are observed
  const watchForBootstrap = function(mutationsList, observer) {
      for(let mutation of mutationsList) {
          if (mutation.type === 'attributes') {
            // only init if we're using a Synthwave 84 subtheme
            const isUsingSynthwave = document.querySelector('[class*="RobbOwen-synthwave-vscode-themes"]');
            const tokensLoaded = document.querySelector('.vscode-tokens-styles');
            const tokenStyles = document.querySelector('.vscode-tokens-styles').innerText;

            // Everything we need is ready, so initialise
            if (isUsingSynthwave && tokensLoaded && tokenStyles) {
                initNeonDreams([DISABLE_GLOW]);
            }
          }
      }
  };

  // Use a mutation observer to check when we can bootstrap the theme
  const observer = new MutationObserver(watchForBootstrap);
  observer.observe(bodyNode, { attributes: true });

  // Replace the styles with the glow theme
  const initNeonDreams = (disableGlow) => {
    var themeStyleTag = document.querySelector('.vscode-tokens-styles');

    var initialThemeStyles = themeStyleTag.innerText;
    
    var updatedThemeStyles = initialThemeStyles;
    
    const breathingEnabled = [BREATHING_EFFECT_ENABLE];

    if (!disableGlow) {
      const bfunction = [BREATHING_EFFECT_TIMING_FUNCTION];
      const bduration = [BREATHING_EFFECT_SPEED];
      let bStart, bFixed, bNeonRed, bNeonPink, bYellow, bGreen, bBlue; // breathing animation strings
      if(breathingEnabled) {
        //animation: breathing_neon_red 1s ease-in-out 0s infinite alternate;
        bStart = "animation: "
        bFixed = " " + bduration + "s " + bfunction + " 0s infinite alternate;";
        bNeonRed = bStart + "breathing_neon_red" + bFixed;
        bNeonPink = bStart + "breathing_neon_pink" + bFixed;
        bYellow = bStart + "breathing_yellow" + bFixed;
        bGreen = bStart + "breathing_green" + bFixed;
        bBlue = bStart + "breathing_blue" + bFixed;
      } else {
        bStart = bFixed = bNeonRed = bNeonPink = bYellow = bGreen = bBlue = "";
      }

      /* replace neon red */
      updatedThemeStyles = updatedThemeStyles.replace(/color: #fe4450;/g, "color: #fff5f6; text-shadow: 0 0 2px #000, 0 0 10px #fc1f2c[NEON_BRIGHTNESS], 0 0 5px #fc1f2c[NEON_BRIGHTNESS], 0 0 25px #fc1f2c[NEON_BRIGHTNESS];" + bNeonRed);
      
      /* replace neon pink */
      updatedThemeStyles = updatedThemeStyles.replace(/color: #ff7edb;/g, "color: #f92aad; text-shadow: 0 0 2px #100c0f, 0 0 5px #dc078e33, 0 0 10px #fff3;" + bNeonPink);
      
      /* replace yellow */
      updatedThemeStyles = updatedThemeStyles.replace(/color: #fede5d;/g, "color: #f4eee4; text-shadow: 0 0 2px #393a33, 0 0 8px #f39f05[NEON_BRIGHTNESS], 0 0 2px #f39f05[NEON_BRIGHTNESS];" + bYellow);
      
      /* replace green */
      updatedThemeStyles = updatedThemeStyles.replace(/color: #72f1b8;/g, "color: #72f1b8; text-shadow: 0 0 2px #100c0f, 0 0 10px #257c55[NEON_BRIGHTNESS], 0 0 35px #212724[NEON_BRIGHTNESS];" + bGreen);
      
      /* replace blue */
      updatedThemeStyles = updatedThemeStyles.replace(/color: #36f9f6;/g, "color: #fdfdfd; text-shadow: 0 0 2px #001716, 0 0 3px #03edf9[NEON_BRIGHTNESS], 0 0 5px #03edf9[NEON_BRIGHTNESS], 0 0 8px #03edf9[NEON_BRIGHTNESS];" + bBlue);
    }
    /* append keyframes for breathing effect */
    var animationThemeStyles = `
    @keyframes breathing_neon_red {
        from {
          text-shadow: 0 0 2px #00000000,
          0 0 10px #fc1f2c00,
          0 0 5px #fc1f2c00,
          0 0 25px #fc1f2c00;
        }
        to {
          text-shadow: 0 0 2px #000,
          0 0 10px #fc1f2c[NEON_BRIGHTNESS],
          0 0 5px #fc1f2c[NEON_BRIGHTNESS],
          0 0 25px #fc1f2c[NEON_BRIGHTNESS];
        }
    }

    @keyframes breathing_neon_pink {
      from {
        text-shadow: 0 0 2px #100c0f00, 0 0 5px #dc078e00, 0 0 10px #fff0;
      }
      to {
        text-shadow: 0 0 2px #100c0f, 0 0 5px #dc078e33, 0 0 10px #fff3;
      }
    }
    @keyframes breathing_yellow {
      from {
        text-shadow: 0 0 2px #393a3300,
        0 0 8px #f39f0500,
        0 0 2px #f39f0500;
      }
      to {
        text-shadow: 0 0 2px #393a33,
        0 0 8px #f39f05[NEON_BRIGHTNESS],
        0 0 2px #f39f05[NEON_BRIGHTNESS];
      }
    }
    @keyframes breathing_green {
      from {
        text-shadow: 0 0 2px #100c0f00,
        0 0 10px #257c5500,
        0 0 35px #21272400;
      }
      to {
        text-shadow: 0 0 2px #100c0f,
        0 0 10px #257c55[NEON_BRIGHTNESS],
        0 0 35px #212724[NEON_BRIGHTNESS];
      }
    }
    @keyframes breathing_blue {
      from {
        text-shadow: 0 0 2px #00171600,
        0 0 3px #03edf900,
        0 0 5px #03edf900,
        0 0 8px #03edf900;
      }
      to {
        text-shadow: 0 0 2px #001716,
        0 0 3px #03edf9[NEON_BRIGHTNESS],
        0 0 5px #03edf9[NEON_BRIGHTNESS],
        0 0 8px #03edf9[NEON_BRIGHTNESS];
      }
    }
    `;
    /* append the remaining styles */
    updatedThemeStyles = `${updatedThemeStyles}[CHROME_STYLES]`;
    if(breathingEnabled) updatedThemeStyles = `${animationThemeStyles}${updatedThemeStyles}`;

    themeStyleTag.innerText = updatedThemeStyles.replace(/(\r\n|\n|\r)/gm, '');
    
    console.log('Synthwave \'84: NEON DREAMS initialised!');
    // disconnect the observer because we don't need it anymore
    observer.disconnect();
  };

})();