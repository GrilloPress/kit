# Kit

Welcome to Kit. Kit is an express.js prototyping tool that allows you to create Heroku friendly apps to demo features to users and developers

## Features

Kit is based on the express.js generator and the structure remains identical apart from a couple of features:

1. Any .html files in the static directory will be served as is. Be sure to avoid naming your .html things like '''index.html'''
2. We use Nunjucks instead of Pug/Jade
3. We have a pre-established way of creating new versions within the app by adding '''.html''' files within the '''v1''' directory