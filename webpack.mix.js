let mix = require('laravel-mix');

mix.disableNotifications();

mix.js('resources/assets/js/app.js', 'public/js');
mix.sass('resources/assets/sass/app.scss', 'public/css');

