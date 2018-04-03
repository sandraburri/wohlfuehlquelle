<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('index');
});


Route::get('/profil', function () {
    return view('profil');
});

Route::get('/kontakt', function () {
    return view('kontakt');
});

Route::get('/konditionen', function () {
    return view('konditionen');
});

Route::get('/impressum', function () {
    return view('impressum');
});

Route::get('/angebot', function () {
    return view('angebot/index');
});

Route::get('/angebot/massage', function () {
    return view('angebot/massage');
});

Route::get('/angebot/body-stempel-massage', function () {
    return view('angebot/body-stempel-massage');
});

Route::get('/angebot/reflexzonenmassage', function () {
    return view('angebot/reflexzonenmassage');
});

Route::get('/angebot/tiermassage', function () {
    return view('angebot/tiermassage');
});

Route::get('/angebot/ohrenkerzentherapie', function () {
    return view('angebot/ohrenkerzentherapie');
});

Route::get('/angebot/notfallbehandlung', function () {
    return view('angebot/notfallbehandlung');
});

Route::get('/angebot/jadewell-thermo-massageliege', function () {
    return view('angebot/jadewell-thermo-massageliege');
});
