## [Mulitple “apple-touch-startup-image” resolutions for iOS web app (esp. for iPad)?](http://stackoverflow.com/questions/4687698/mulitple-apple-touch-startup-image-resolutions-for-ios-web-app-esp-for-ipad)





definitive solution for **startup-image** and **touch-icons** for iPad and iPhone (landscape || portrait) and (retina || not):

```html
 
 <!-- iPhone ICON -->
 <link href="apple-touch-icon-57x57.png" sizes="57x57" rel="apple-touch-icon">
 <!-- iPad ICON-->
 <link href="apple-touch-icon-72x72.png" sizes="72x72" rel="apple-touch-icon">
 <!-- iPhone (Retina) ICON-->
 <link href="apple-touch-icon-114x114.png" sizes="114x114" rel="apple-touch-icon">
 <!-- iPad (Retina) ICON-->
 <link href="apple-touch-icon-144x144.png" sizes="144x144" rel="apple-touch-icon">

 <!-- iPhone SPLASHSCREEN-->
 <link href="apple-touch-startup-image-320x460.png" media="(device-width: 320px)" rel="apple-touch-startup-image">
 <!-- iPhone (Retina) SPLASHSCREEN-->
 <link href="apple-touch-startup-image-640x920.png" media="(device-width: 320px) and (-webkit-device-pixel-ratio: 2)" rel="apple-touch-startup-image">
 <!-- iPad (portrait) SPLASHSCREEN-->
 <link href="apple-touch-startup-image-768x1004.png" media="(device-width: 768px) and (orientation: portrait)" rel="apple-touch-startup-image">
 <!-- iPad (landscape) SPLASHSCREEN-->
 <link href="apple-touch-startup-image-748x1024.png" media="(device-width: 768px) and (orientation: landscape)" rel="apple-touch-startup-image">
 <!-- iPad (Retina, portrait) SPLASHSCREEN-->
 <link href="apple-touch-startup-image-1536x2008.png" media="(device-width: 1536px) and (orientation: portrait) and (-webkit-device-pixel-ratio: 2)" rel="apple-touch-startup-image">
 <!-- iPad (Retina, landscape) SPLASHSCREEN-->
 <link href="apple-touch-startup-image-2048x1496.png" media="(device-width: 1536px)  and (orientation: landscape) and (-webkit-device-pixel-ratio: 2)" rel="apple-touch-startup-image">
```