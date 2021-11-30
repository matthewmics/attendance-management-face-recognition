const mix = require("laravel-mix");

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel applications. By default, we are compiling the CSS
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.autoload({ jquery: ["$", "jQuery", "window.jQuery"] });
mix.js("resources/js/app.js", "public/js")
    .js("resources/vendor/bootstrap/js/bootstrap.bundle.min.js", "public/js")
    .js("resources/vendor/jquery-easing/jquery.easing.min.js", "public/js")
    .js("resources/js/sb-admin-2.min.js", "public/js")
    .vue()
    .postCss("resources/css/app.css", "public/css", [
        //
    ]);
