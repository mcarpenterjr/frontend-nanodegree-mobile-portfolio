## Website Performance Optimization portfolio project


#### [Live Optimized Version](http://pizza.mncarpenter.ninja)
#### ![ScreenShot](https://raw.githubusercontent.com/xXSirenSxOpusXx/frontend-nanodegree-mobile-portfolio/master/PGSpdScrn.png)
#### ![ScreenShot](https://raw.githubusercontent.com/xXSirenSxOpusXx/frontend-nanodegree-mobile-portfolio/master/PGSpdScrn2.png)

### Performance Changes

##### 1. Gulp Task Running
  This Project uses [gulp](http://www.http://gulpjs.com/) with gulp we do a number of
things to build our performant Site.

######* Minify All CSS Files 
######* Minify All JS Files
######* Minify All HTML Files
######* Concat All CSS Files
######* Concat All JS Files
######* Lint All JS Files
######* Resize Optimize and Compress all Images
######* Automatically Update our HTML to Asyncly Load Required CSS and JS Files.
######* Automatically Copy over our Server Config files. (Some user renaming post Copy
######  maybe reqiured)

##### 2. Hard Coded JS Changes
  In the `app/views/js/main.js` file some hard coded changes needed to be made
to prevent forced syncronous layouts from occurring, and speed up some functions.

######* resizePizzas function
  Stopped FSL from occurring by changing the method of changing the `style.width` attribute.
This was acheived by switching over to a percent based size, and moving the API call
to the elements outside the `for` loop that made the style updates. As well as removing 
some functions that were neither efficient or of value.

######* Paralaxing Pizzas 
  `513 function scrollingWoot()` this function updates our `constantForScrollY` variable
with the actual Y window scroll amount and fires off the `lookingForScroll` function.
  `523 function lookingForScroll()` this short function requests an animation frame and
sets off the updatePositions function, lookingForScrollY also holds a variable `looking` which
prevents it from being run when the updatePositions function is running, this prevents
FSL from occuring.
  `540 function updatePositions` updatePositions 

#### You Will Need Node.js and [gulp](http://www.http://gulpjs.com/) Installed on your system

### Getting up and running

##### 1. Check out the repository
###### 1. Clone or download the files into your working directory, and run...
```bash
$> cd /path/to/your-project-folder
$> npm install
```

This installs the required dependencies.

##### 2.  Using Gulp with This Project...
###### 1.  Serving From The Development Directory
Running this gulp command serves the app directly from the app development folder
and watching for changes, allowing you to live preview any changes you have made
after saving them.
```bash
$> gulp watch
```

###### 2. Building The Production App
Running this gulp command builds the production ready app to the `dist/` directory
you can then ftp this to your web server. This would be an ideal location to
add a task that ftp's the app right to its live destination.
```bash
$> gulp production
```

###### 3.  Previewing the Production App
Running this gulp command serves the app directly from `dist/` directory after
running all of the production build commands, this includes minification, uglification,
linting and optimizing images. 
```bash
$> gulp dist
```

## Contact
#### Student
* Homepage: mncarpenter.ninja
* e-mail: mark@mncarpenter.ninja
* Twitter: [@twitterhandle](https://twitter.com/xXSirenSxOpusXx "xXSirenSxOpusXx on twitter")