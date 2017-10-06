# Kit

Welcome to Kit. 

Kit is an express.js prototyping tool that allows you to create Heroku friendly apps to demo features to users and developers.

## Features

Kit is based on the express.js generator and the structure remains identical apart from a couple of features:

1. Any ```.html``` files in the static directory will be served as is. Be sure to avoid naming your HTML things like ```index.html``` or anything that will interrupt your named routes in ```routes.js```.
2. We use Nunjucks instead of Pug/Jade but we use the ```.html``` file extension. ```.njk``` will not work!.
3. We have a pre-established way of creating new versions within the app by adding ```.html``` files within the ```v1``` directory. All routes will automatically appear to two levels!

If you want to set up another version, you copy the code for setting the v1 route with your new number.

## Adding a new version

Inside your app you need to do three things to set up a new version.

In ```/routes/router.js``` you need to copy the v1 box and replace all references with the version you have created. So, v1 is copied and turned into v2.

In ```/app.js``` you need to copy and create the v1 routes and replace all references with the version you have created.

In ```/views``` you need to create a subdirectory named after the version you have just created.

For example, if you now want to work on v2, you create within your ```/views``` directory a new subdirectory called v2 with a ```index.html``` file inside (a copy of what you find in v1).

## Warning

This is in a state of change. 

## How to download and use

Your machine needs to have node.js installed. 

It also needs git to be installed (You can get around this by installing the code via https://github.com/GrilloPress/kit/archive/master.zip)

After that, locate where you want it to live on your machine and run the following commands in your terminal:

```
git clone https://github.com/GrilloPress/kit.git name_of_project
cd name_of_project
npm install
npm devstart
```

#### Running this in development mode

This kit comes with nodemon, which restarts your server everytime you make a change. No need to stop your server manually everytime you add a route etc.

To run this with nodemon you run:

```
npm devstart
```

To run this in production mode, without nodemon watching your files and restarting your server on every change you make, run:

```
npm start 
```

## Macro Pattern Library

Inside the project is a macro pattern library. This is located in ```views/partials/_macros.html```

These are small snippets that allow you to quickly create elements on a page.

### Example

To include a page navigation system, at the bottom of your page you can add the following snippet:

```
{{ patterns.page_nav( "Previous Page Title", "Previous Page Link", "Next Page Title", "Next Page Link" ) }}
```

If you need to not include either a previous link or a next one... you just leave the bit blank... as in:

```
{{ patterns.page_nav( "", "", "Next Page Title", "Next Page Link" ) }}
```

### Further information

For more info about Nunjuck macros see: https://mozilla.github.io/nunjucks/templating.html