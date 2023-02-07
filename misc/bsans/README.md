# [sans](https://grosserly.github.io/sans/)

A gotoanddie.github.io/c2-sans-fight but with less code

I want to use this with Wallpaper Engine and I have a hunch that the scripts that pause the game while not focused are keeping me from giving it inputs in certain scenarios. While I was I thought I might as well remove a lot of other things that won't be necessary for being a desktop background.

## Removed:
- Pause on focus lost scripts
- Service worker
- All icons smaller than 256px
- Google Analytics
- Compatibility code for old browsers
- File\:/// check
- appcache (that's deprecated anyway)
- `<meta>` tags for mobile support
- `<meta>` tags for everything except the favicon really
- CSS for mobile support
- Scripts for mobile support
- `<div id=fb-root></div>`

## Changed:
- Title from "Bad Time Simulator (Sans Fight)" to just "Bad Time Simulator"
- Some comments to be more consise

