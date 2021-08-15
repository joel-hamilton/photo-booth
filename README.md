# Photo Booth

Email photos as part of a tethered photo-booth setup. We use this for a Christmas event at church.

## TODO
- Can only send a single file per email, currently. AppleScript passes in all photos as args, so should be easy to fix.
- Mailgun stinks. In 2019 only ~70% of photos successfully went through. 
- Should get a better printer, or a backup printer. Selphy Problems:
	- randomly turns off
	- jams after each photo if you don't manually pull the finished photo out, needs manual restart after jamming
	- WiFi problems maybe, but photos take a long time to arrive at the printer and start printing

## Components
### premailer.js
Inlines styles for the email (uses email.html) 

### email_photos.js
Email the photo after being processed in Lightroom

### Email Photos.app
Simple Applescript that takes the photo passed, requests an email, and sends both to email_photos.js. Photos can be passed by drag-drop, or with 'send to' from another app.

## The Workflow
- Place Email Photos in /Applications
- Update email.html as needed
- Run premailer.js to inline the email styles
- Tether camera to Lightroom Classic
	- Camera + flash should probably be on manual, with manual focus for consistency
- Capture photo, automatically run through a User Preset that colour corrects, etc.
- Export photo (ctrl+shift+e), and send to Email Photos after (or drag-drop to the app icon)
- Print the exported photo (Printing straight from Lightroom sends a 12mb+ file, which usually causes the Selphy printer to go into shock)