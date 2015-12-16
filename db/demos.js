var demos = [
  {
    "description": "Demo shows how to use ad pods", 
    "title": "Ad Pods Demo", 
    "license": "Ads",
    "version": "7.1.4",
    "source": "ad-pods", 
    "keywords": "ad pods, advertising, pods, scheduling, schedule", 
    "type": "advertising", 
    "documentations": "http://support.jwplayer.com/customer/en/portal/articles/1436999-example-adding-a-download-button",
    "id": "12345",
    "javascript": "jwplayer%28%27container%27%29.setup%28%7Bfile%3A%27myfile.mp4%27%7D%29"
  }, 
  {
    "description": "This embed shows how ad quartile tracking can be achieved.", 
    "title": "Ad Quartile Tracking", 
    "source": "quartile-tracking.html", 
    "keywords": "tracking, ads, ad, advertising, quartile", 
    "type": "advertising", 
    "id": "4a48a708b16ee654d353248fef0dd1b73bd36859"
  }, 
  {
    "description": "Shows how to use ad scheduling, featuring pre, mid, and postroll ads", 
    "title": "Ad Scheduling Demo", 
    "source": "ad-scheduling.html", 
    "keywords": "schedule, scheduling, ad, advertising, preroll, pre", 
    "type": "advertising", 
    "id": "aae400425c233a44d4acac5db2bd6f6562a01bf9"
  }, 
  {
    "description": "Here is how ad-waterfalling is achieved.", 
    "title": "Ad waterfall embed", 
    "source": "waterfall-demo.html", 
    "keywords": "ad, waterfall, ad-waterfalling, advertising", 
    "type": "advertising", 
    "id": "e10cb8f3df3966ca5f2538e494f70886388b6860"
  }, 
  {
    "description": "Here's a player with only an ad, no main video.", 
    "title": "Ad-only embed", 
    "source": "ad-only.html", 
    "keywords": "ad-only, only ad, ad only, adonly, advertising", 
    "type": "advertising", 
    "id": "75d70a925a9141abc6801fd8f4b0d12c5c71cb2f"
  }, 
  {
    "description": "This demo shows how to do async platform embeds", 
    "title": "Async Platform Embeds", 
    "source": "async-platform-embed.html", 
    "keywords": "async, platform embed, platform", 
    "type": "", 
    "id": "54df12936eaa19d2d9b2c746814ef598ab644852"
  }, 
  {
    "description": "Audio only embed with a custom play/pause toggle (player hidden)", 
    "title": "Audio Custom Controls", 
    "source": "audio-custom-controls.html", 
    "keywords": "api, audio, custom controls", 
    "type": "api", 
    "id": "e76522b62681901320deada7dca8cae02d42cc48"
  }, 
  {
    "description": "Here a workaround for autoplay on mobile devices.", 
    "title": "Autoplay workaround for mobile", 
    "source": "ios-autoplay.html", 
    "keywords": "workaround, mobile, ios, iphone, ipad, autoplay, autostart", 
    "type": "mobile", 
    "id": "0da58cbb449e9a4c941bcde997bf5d665af79839"
  }, 
  {
      "description": "Basic HLS demo with adaptive bitrate, multiple qualities", 
      "title": "Basic HLS Demo", 
      "source": "basic-hls-demo.html", 
      "keywords": "basic, hls, live, stream", 
      "type": "", 
      "id": "6c38494aa01fc94e4ab7c20b38fc11f5f7f8e3c0"
  }, 
  {
      "description": "Here is a basic vmap embed.", 
      "title": "Basic VMAP embed", 
      "source": "basic-vmap.html", 
      "keywords": "vmap, basic, ad, advertising", 
      "type": "", 
      "id": "d254fece4497cef4268c05e726b222eb326c88c4"
  }, 
  {
      "description": "The most basic setup with a pre-roll ad.", 
      "title": "Basic advertising embed", 
      "source": "basic-ad.html", 
      "keywords": "basic ad, ad, advertising", 
      "type": "advertising", 
      "id": "d0ee18b6bb42dcf814ff0597ed1f7225c9fe15d8"
  }, 
  {
      "description": "Here is a basic mp4 embed.", 
      "title": "Basic mp4 embed", 
      "source": "basic-demo.html", 
      "keywords": "mp4, basic", 
      "type": "", 
      "id": "e3a1ffe6a006bcf4144c4f1fd91d421e8c9cf6ef"
  }, 
  {
      "description": "Here is a basic playlist embed.", 
      "title": "Basic playlist embed", 
      "source": "basic-playlist.html", 
      "keywords": "playlist, basic", 
      "type": "", 
      "id": "f79bdd4dfca61c73e5c9f918ae639b40e4ca6d78"
  }, 
  {
      "description": "An example showing our player streaming brightcove content", 
      "title": "Brightcove HLS embed", 
      "source": "brightcove-hls.html", 
      "keywords": "brightcove, stream, hls", 
      "type": "", 
      "id": "1b5c6d4575a3af1cf8334c68cc68179464ba6fe5"
  }, 
  {
      "description": "Demo that uses cookies to remember where user left off- resumes playback at the same time offset if you revisit the page", 
      "title": "Cookie Resume Time", 
      "source": "resumetime.html", 
      "keywords": "cookie, resume, remember", 
      "type": "api", 
      "id": "a225db50f303ae50ca07bb9a3463f6258b326325"
  }, 
  {
      "description": "Demo shows a countdown before playback", 
      "title": "Countdown Demo", 
      "source": "countdown.html", 
      "keywords": "countdown, custom, api, timer", 
      "type": "api", 
      "id": "2184a8938f619335881610fc541396d6d3b1a851"
  }, 
  {
      "description": "Building a custom quality selector with platform HLS content", 
      "title": "Custom Quality Selector", 
      "source": "qualityselector.html", 
      "keywords": "HLS, custom, API, quality, platform", 
      "type": "api", 
      "id": "b8f8473fc57315d44c152b62dcf772edd3373294"
  }, 
  {
      "description": "This is an embed featuring a watermark using a custom logo.", 
      "title": "Custom logo embed", 
      "source": "custom-logo.html", 
      "keywords": "custom logo, logo, watermark", 
      "type": "", 
      "id": "fc13dd51b515b9a38d6d8bcfe5a3fbf3c2751bfc"
  }, 
  {
      "description": "Demo that shows the video for 3 seconds but requires email input (from overlay) to continue playback.", 
      "title": "Email Capture Overlay", 
      "source": "email-capture.html", 
      "keywords": "overlay,email capture, email", 
      "type": "", 
      "id": "f9ee3235b282839dc5bb132b6ce36a87e20e0fca"
  }, 
  {
      "description": "This embed shows basic event handlers with the JavaScript API.", 
      "title": "Embed using JavaScript API", 
      "source": "basic-api.html", 
      "keywords": "api, javascript, callback, event, handlers, onComplete, onPlay, onPause, onDisplayClick", 
      "type": "api", 
      "id": "ec627aafadcf2d84a50032a6354a55d63adaccd4"
  }, 
  {
      "description": "Demo that shows how to fallback to secondary streams if an HLS stream / RTMP stream is no longer live.", 
      "title": "Fallback Demo", 
      "source": "fall2source.html", 
      "keywords": "fallback, stream, onerror, event, hls, live", 
      "type": "api", 
      "id": "4afc86fa6ce9472ef9741dcbba2ae438c11a78d1"
  }, 
  {
      "description": "Here is a demo showing how to set primary to 'html5' on a single-line platform embed", 
      "title": "Force html5 on platform embed", 
      "source": "platform-html5.html", 
      "keywords": "api, custom, platform, embed", 
      "type": "api", 
      "id": "27d1e4e8d775ce99357850a4a0cd849dc9af8061"
  }, 
  {
      "description": "Shows how to parse URL and use video parameter to play video", 
      "title": "Grab Video From Url", 
      "source": "videofromurl.html", 
      "keywords": "url, parameters", 
      "type": "api", 
      "id": "28063510ce39a58a8adc5ab86dc2ceba0d10440e"
  }, 
  {
      "description": "Example of a couple ways to hide the license key. License key will still be accessible, but 'theif' will have to look hard for it", 
      "title": "Hiding the License Key", 
      "source": "hidekey.html", 
      "keywords": "misc, license, hide key", 
      "type": "", 
      "id": "1aad44475381ef63e38f503c21d76eee975c77f1"
  }, 
  {
      "description": "Play ad during HLS livestream (midroll)", 
      "title": "Midroll Livestream AD", 
      "source": "livestream-ad.html", 
      "keywords": "ad, advertising, live, livestream", 
      "type": "advertising", 
      "id": "e634e528cfbec45acd08ac7aa4dc18e97fed5a40"
  }, 
  {
      "description": "Here is how you can use a different ad for deskop vs mobile.", 
      "title": "Mobile Conditional Ad Demo", 
      "source": "mobile-conditional-ad.html", 
      "keywords": "ios, mobile, ad, advertisting", 
      "type": "mobile", 
      "id": "af1e3e0f9f97377fd615304c18b115ac3983d749"
  }, 
  {
      "description": "Here is an example of how to use a mobile-only ad tag being pulled from a platform video custom field.", 
      "title": "Mobile-only Ads From Platform Embed", 
      "source": "platform-mobileonly-ad.html", 
      "keywords": "platform, api, ad, advertising, mobile", 
      "type": "mobile", 
      "id": "167abf3f0d0a5feb30540adccf200d1c9d4a8d6e"
  }, 
  {
      "description": "Example of a muted player", 
      "title": "Muted player embed", 
      "source": "mute-demo.html", 
      "keywords": "muted, mute, no sound", 
      "type": "api", 
      "id": "c4fd0d8346a8c7f0fcb97587bc589afe8a625c03"
  }, 
  {
      "description": "Here is a demo showing playing/pausing the player on hovering", 
      "title": "Play on hover demo", 
      "source": "hoverplay.html", 
      "keywords": "hover, pause, play, api, custom", 
      "type": "api", 
      "id": "d247d716d16c51c350c3d13488af7162cc093bd9"
  }, 
  {
      "description": "This demo shows how to use the API to force the HLS bitrate", 
      "title": "Setting Default HLS Bitrate", 
      "source": "default-bitrate-hls.html", 
      "keywords": "api, hls, bitrate, default", 
      "type": "api", 
      "id": "470c7cac83ec99ec215e7a7cbb3f37ace199008b"
  }, 
  {
      "description": "This demo shows how to autoplay the video once it comes into view while scrolling down the page", 
      "title": "Video plays when visible", 
      "source": "viewport-play.html", 
      "keywords": "autoplay, viewport, scolling", 
      "type": "api", 
      "id": "dd221ed9641b768baf15ceb9b4f5495350044818"
  }, 
  {
      "description": "This demo shows the custom code required to handle a fallback to webm when using a single-line platform embed script.", 
      "title": "WebM Fallback for Firefox without Flash", 
      "source": "webm-fallback.html", 
      "keywords": "webm, fallback, flash, firefox", 
      "type": "mobile", 
      "id": "35da391348efcfd4d94c61f67497319a2692b255"
  }
]

module.exports = demos
