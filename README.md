
Grunt template
==============

This is a personal fairly complete grunt template for personal use. It features:

* CSS with Stylus and the Axis lib.
* JS with browserify for *CommonJS* style modules on the browser.
  * Coffeescript files are compiled automatically
  * Livescript files are compiled automatically
  * Handlebars templates are compiled automatically
* JSHint JS validations, via local `.jshintrc` file.
* Static website generation from Handlebars templates, markdown files, and data
  from JSON or YML files.
* Preview server.
* Watch task to autoexec all the previous tasks and the ability to use
  livereload on the browser.

Usage
-----

### Download

Clone the template and remove the repo info:

    git clone https://github.com/joakin/agruntemplate.git
    mv agruntemplate my_super_secret_project
    cd my_super_secret_project
    rm -rf .git
    git init

And to develop!

### Compile

The default task handles all compiling:

    grunt

or

    grunt default

### Preview server

You can get a preview server up on port 9001 by default by doing: (it will
compile and run the server)

    grunt preview

### Watch and livereload

Then, with the server running, you may want to speed up development
autoexecuting the tasks when the files change and connecting the browser to the
livereload server. For that, just do (on another terminal, leave the server
running):

    grunt watch

That is all!
