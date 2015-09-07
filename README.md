## Website Performance Optimization portfolio project

Your challenge, if you wish to accept it (and we sure hope you will), is to optimize this online portfolio for speed! In particular, optimize the critical rendering path and make this page render as quickly as possible by applying the techniques you've picked up in the [Critical Rendering Path course](https://www.udacity.com/course/ud884).

To get started, check out the repository, inspect the code,

#### [Live Optimized Version](http://pizza.mncarpenter.ninja)
#### ![ScreenShot](https://raw.githubusercontent.com/xXSirenSxOpusXx/frontend-nanodegree-mobile-portfolio/master/PGSpdScrn.png)
#### ![ScreenShot](https://raw.githubusercontent.com/xXSirenSxOpusXx/frontend-nanodegree-mobile-portfolio/master/PGSpdScrn2.png)

#### You Will Need Node.js and Gulp Installed on your system
   

###  Getting up and running

#####1. Check out the repository
######    1. Clone or download the files into your working directory, and run...

        ```bash
        $> cd /path/to/your-project-folder
        $> npm install
        ```

        This installs the required dependencies.

#####2.  Using Gulp with This Project...
######      1.  Serving From The Development Directory
            Running this gulp command serves the app directly from the app development folder
            and watching for changes, allowing you to live preview any changes you have made
            after saving them.

        ```bash
        $> gulp watch
        ```

######      2. Building The Production App
            Running this gulp command builds the production ready app to the `dist/` directory
            you can then ftp this to your web server. This would be an ideal location to
            add a task that ftp's the app right to its live destination.

        ```bash
        $> gulp production
        ```    

######      3.  Previewing the Production App
            Running this gulp command serves the app directly from `dist/` directory after
            running all of the production build commands, this includes minification, uglification,
            linting and optimizing images. 

        ```bash
        $> gulp dist
        ```
