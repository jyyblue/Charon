<!DOCTYPE html>
<html lang="en" class="light-style">
  <head>
    <base href="./">
    <title>Charon</title>

    <meta charset="utf-8">
    <meta http-equiv="x-ua-compatible" content="IE=edge,chrome=1">
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0">
    <link rel="icon" type="image/x-icon" href="favicon.ico">

    <link href="https://fonts.googleapis.com/css?family=Roboto:300,300i,400,400i,500,500i,700,700i,900" rel="stylesheet">
    
    <!-- for product -->
    
    <link rel="stylesheet" href="/assets/angular/assets/vendor/fonts/fontawesome.css">
    <link rel="stylesheet" href="/assets/angular/assets/vendor/fonts/ionicons.css">
    <link rel="stylesheet" href="/assets/angular/assets/vendor/fonts/linearicons.css">
    <link rel="stylesheet" href="/assets/angular/assets/vendor/fonts/open-iconic.css">
    <link rel="stylesheet" href="/assets/angular/assets/vendor/fonts/pe-icon-7-stroke.css">

    <link rel="stylesheet" href="/assets/angular/vendor/styles/bootstrap.css" class="theme-settings-bootstrap-css">
    <link rel="stylesheet" href="/assets/angular/vendor/styles/appwork.css" class="theme-settings-appwork-css">
    <link rel="stylesheet" href="/assets/angular/vendor/styles/theme-corporate.css" class="theme-settings-theme-css">
    <link rel="stylesheet" href="/assets/angular/vendor/styles/colors.css" class="theme-settings-colors-css">
    <link rel="stylesheet" href="/assets/angular/vendor/styles/uikit.css">

    <script src="/assets/angular/assets/vendor/js/material-ripple.js"></script>
    <script src="/assets/angular/assets/vendor/js/layout-helpers.js"></script>

    <!-- for product  -->
    <!-- for dev -->

    <!-- <link rel="stylesheet" href="/assets/vendor/fonts/fontawesome.css">
    <link rel="stylesheet" href="/assets/vendor/fonts/ionicons.css">
    <link rel="stylesheet" href="/assets/vendor/fonts/linearicons.css">
    <link rel="stylesheet" href="/assets/vendor/fonts/open-iconic.css">
    <link rel="stylesheet" href="/assets/vendor/fonts/pe-icon-7-stroke.css">

    <link rel="stylesheet" href="/vendor/styles/bootstrap.css" class="theme-settings-bootstrap-css">
    <link rel="stylesheet" href="/vendor/styles/appwork.css" class="theme-settings-appwork-css">
    <link rel="stylesheet" href="/vendor/styles/theme-corporate.css" class="theme-settings-theme-css">
    <link rel="stylesheet" href="/vendor/styles/colors.css" class="theme-settings-colors-css">
    <link rel="stylesheet" href="/vendor/styles/uikit.css">

    <script src="/assets/vendor/js/material-ripple.js"></script>
    <script src="/assets/vendor/js/layout-helpers.js"></script> -->
    
    <!-- for dev -->
    <!-- Theme settings -->
    <!-- This file MUST be included after core stylesheets and layout-helpers.js in the <head> section -->
    <!-- <script src="assets/vendor/js/theme-settings.js"></script>
    <script>
      window.themeSettings = new ThemeSettings({
        cssPath: 'vendor/styles/',
        themesPath: 'vendor/styles/'
      });
    </script> -->

    <!-- Ace editor dependencies -->
    <!-- <link href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/styles/agate.min.css" rel="stylesheet"> -->

    <!-- Splash screen -->
    <style>
      .app-splash-screen { background: #fff; position: fixed; display: block; z-index: 99999999; top: 0; right: 0; bottom: 0; left: 0; opacity: 1; -webkit-transition: opacity .3s; transition: opacity .3s; }
      .dark-style .app-splash-screen { background: #25282E; }
      .app-splash-screen-content { position: absolute; top: 50%; left: 50%; transform: translate3d(0, 0, 0); -webkit-transform: translate3d(0, 0, 0); -webkit-animation: appSplashScreenAnimation 1.2s ease-in-out 0s infinite; animation: appSplashScreenAnimation 1.2s ease-in-out 0s infinite; }
      @-webkit-keyframes appSplashScreenAnimation {
        0%, 20% { -webkit-transform: translate3d(-50%, -50%, 0) rotateY(0); transform: translate3d(-50%, -50%, 0) rotateY(0); }
        50% { -webkit-transform: translate3d(-50%, -50%, 0) rotateY(180deg); transform: translate3d(-50%, -50%, 0) rotateY(180deg); }
        80%, 100% { -webkit-transform: translate3d(-50%, -50%, 0) rotateY(360deg); transform: translate3d(-50%, -50%, 0) rotateY(360deg); }
      }
      @keyframes appSplashScreenAnimation {
        0%, 20% { -webkit-transform: translate3d(-50%, -50%, 0) rotateY(0); transform: translate3d(-50%, -50%, 0) rotateY(0); }
        50% { -webkit-transform: translate3d(-50%, -50%, 0) rotateY(180deg); transform: translate3d(-50%, -50%, 0) rotateY(180deg); }
        80%, 100% { -webkit-transform: translate3d(-50%, -50%, 0) rotateY(360deg); transform: translate3d(-50%, -50%, 0) rotateY(360deg); }
      }
    </style>
    <!-- / Splash screen -->

    <!-- Custom elements polyfill -->
    <!-- <script>this.customElements||document.write('<script src="//unpkg.com/document-register-element"><\x2fscript>');</script> -->
  <link rel="stylesheet" href="/assets/angular/styles.adb9ed7581227550ef1c.css"></head>
  <body>

    <!-- Splash screen -->
    <div class="app-splash-screen">
      <div class="app-splash-screen-content">
        <div class="ui-w-60">
          <svg class="d-block" viewBox="0 0 148 80" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><defs><linearGradient id="a" x1="46.49" x2="62.46" y1="53.39" y2="48.2" gradientUnits="userSpaceOnUse"><stop stop-opacity=".25" offset="0"></stop><stop stop-opacity=".1" offset=".3"></stop><stop stop-opacity="0" offset=".9"></stop></linearGradient><linearGradient id="e" x1="76.9" x2="92.64" y1="26.38" y2="31.49" xlink:href="#a"></linearGradient><linearGradient id="d" x1="107.12" x2="122.74" y1="53.41" y2="48.33" xlink:href="#a"></linearGradient></defs><path class="fill-primary" transform="translate(-.1)" d="M121.36,0,104.42,45.08,88.71,3.28A5.09,5.09,0,0,0,83.93,0H64.27A5.09,5.09,0,0,0,59.5,3.28L43.79,45.08,26.85,0H.1L29.43,76.74A5.09,5.09,0,0,0,34.19,80H53.39a5.09,5.09,0,0,0,4.77-3.26L74.1,35l16,41.74A5.09,5.09,0,0,0,94.82,80h18.95a5.09,5.09,0,0,0,4.76-3.24L148.1,0Z"></path><path transform="translate(-.1)" d="M52.19,22.73l-8.4,22.35L56.51,78.94a5,5,0,0,0,1.64-2.19l7.34-19.2Z" fill="url(#a)"></path><path transform="translate(-.1)" d="M95.73,22l-7-18.69a5,5,0,0,0-1.64-2.21L74.1,35l8.33,21.79Z" fill="url(#e)"></path><path transform="translate(-.1)" d="M112.73,23l-8.31,22.12,12.66,33.7a5,5,0,0,0,1.45-2l7.3-18.93Z" fill="url(#d)"></path></svg>
        </div>
      </div>
    </div>
    <!-- / Splash screen -->

    <!-- App root -->
    <app-root></app-root>
    <!-- / App root -->

    <!-- Ace editor dependencies -->
    <!-- <link href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/styles/agate.min.css" rel="stylesheet">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/ace/1.2.9/ace.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/marked/0.3.7/marked.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/highlight.min.js"></script> -->

  <script src="/assets/angular/runtime.4fedbeb78f885a8bdc62.js" defer></script><script src="/assets/angular/polyfills-es5.01bd0cb07da97b63620c.js" nomodule defer></script><script src="/assets/angular/polyfills.8c3ac4f78fee9269a739.js" defer></script><script src="/assets/angular/scripts.886766c896dbef5ab292.js" defer></script><script src="/assets/angular/main.ca77d777a4631e4ece60.js" defer></script></body>
</html>
