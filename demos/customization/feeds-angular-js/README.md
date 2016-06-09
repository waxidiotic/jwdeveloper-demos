# Example for using feeds within AngularJs

This example started from: https://github.com/angular/angular-seed

# Running the example
Setup environment
```shell
npm run prestart
```
Run the webserver
```shell
npm run start
```
Go to: [http://localhost:8000/app](http://localhost:8000/app)

# Files
## app/landing/landing.html
Base landing page template for the angular example

## app/landing/landing.js
Base landing page controller. This controller configures the seed video and sets the feed ID for the feed widget.

## app/feed/feed.js
Get the feed from based on what media is loaded into the player. The contoller will also load a new video in the player if the user clicks on an item in the feed.

## app/feed/feed.html
This template will list feed results, and load a new video in the player when the user clicks on the feed.

## app/player/player.js
Instantiates the player and sets the initial video.

## app/player/player.html
Template that anchors the player to the page.