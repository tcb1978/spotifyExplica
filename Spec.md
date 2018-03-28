# Spec: Artist Page

This is a mobile-first design for a page detailing the work of a recording artist. The project spec is to design all the components of the attached mockup (`.JPG`), except for the section (see `Spec Mockup.PDF`).

> Read the sections below & reference the mockup to guide your development of the artist page. Guide your decisions around using public APIs to ideally source multimedia as well as data. The spec includes suggested API endpoints for the build.

----
## Get Started
Please use the following libraries & frameworks in your build. Avoid using wrapper libraries (ie. [`spotify-web-js`](https://github.com/jmperez/spotify-web-api-js)) for accessing API data, unless its justifiable for forward-compatibility. 

* **Bootstrap 3.3.7** (`CSS`,`JS`)
* **jQuery** (`JS`)
* **FontAwesome 4.7** (`CSS`)
* **Google Fonts** (`CSS`) - Work Sans, Oswald

----
## 1. Header
Components are as follows:

* Name & Social links (Facebook, Instagram, Twitter, YouTube...)
* Biography/description. Place in collapsible div with `...` link to expand.

API's that can provide this information include [Genius API](https://docs.genius.com/#artists-h2) or the Spotify API ([click here](http://jsfiddle.net/JMPerez/0u0v7e1b/) to see Artist Search demo). You may need to sign-in to generate API keys, or retrieve other authentication details.


## 2. Navigation
Going for a Material Design type navigation with horizontal scrolling overflow. Smooth scroll to anchors in-page. Open to one of two approaches to animation behavior: 

1. **Fixed collapse:** After user scrolls past header & nav, collapse into a smaller fixed header so the nav remains at the top the screen. 
2. **Fixed nav:** After scrolling past nav, just nav remains pinned at the top of the screen.

## 3. Popular
Get the top 6 tracks for an artist and place in a two-column grid. This grid should remain the same size on mobile devices (ie. `media-query < 480px`), as seen in the mockup.

Both [Genius API](https://docs.genius.com/#artists-h2) and the [Spotify's API](https://developer.spotify.com/web-api/get-artists-top-tracks/) offer most popular tracks. You may need to sign-in to generate API keys, or retrieve other authentication details.

## 4. Calendar
The calendar UI is self-explanatory as depicted in the mockup. The goal is to include both upcoming releases, as well as events for the given artist.

For events, we have the affiliate link API via VividSeats (see attached documentation & credentials `.PDF`).

For upcoming releases, [Spotify's API](https://developer.spotify.com/web-api/get-list-new-releases/) may be of use.


## 5. Album
See [Spotify's API](https://developer.spotify.com/web-api/get-artists-albums/). Attached `.HTML`, `.CSS` for vinyl animation may be helpful.


## 6. Related
Suggest 3 similar artists, either through another API endpoint, or interpolating genre data.