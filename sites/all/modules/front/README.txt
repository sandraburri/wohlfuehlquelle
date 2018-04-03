
Introduction
================

This module is for people who want a custom front page to their Drupal sites dependant on role.

This module is intended for Drupal Version 7.x


Key Functionality
=====================

- Allows you to specify a custom front page based on role type.

- Allows 4 different page types:
    FULL - Allows you to separate the front page from Drupal. This option will
        output what you have set directly to the screen without running it through Drupal.
    THEMED - Allows you to show a customised drupal page in much the same way you
        would create a normal Drupal page.
    REDIRECT - Allows you to 301 redirect the user to another URL.
    ALIAS - Allows you to alias another Drupal path as the front page. This works
        in much the same way that standard Drupal URL path aliasing works.

- Override your HOME and Breadcrumb links on your site.
    e.g. you might have a splash front page that you don't want visitors already
    on your site returning to when they click on HOME.

- When using the Full or Themed options the data is run through Drupal's
    filtering system using whatever input filter you want. This could be the PHP
    filter if it is defined in your input filter.



Installation
===============

1. Upload and Enable the Front Page module.

2. Go to the Front Page Settings section at /admin/config/front.

3. Choose the roles you want to override the default site front page and select
    the mode you want it to use (eg. Full, Themed, Redirect or Alias). Either
    set the data section or path dependant on what option you choose.
    Save the settings.

4. Go to /admin/config/front/settings/arrange and drag and drop the roles into
    the order in which you want them to run. Roles that are higher will be
    processed first. Save the settings

5. Go back to /admin/config/front and check the box at the top titled
    'Front Page Override'. Once you have saved this page again the front page
    overrides will be working.
   
############################################
IMPORTANT NOTE FOR THOSE USING PATH.MODULE (URL ALIAS):
Please ensure you have no other pages 
setup with the URL ALIAS 'front_page' when
installing the front_page.module which uses the
'front_page' URL Alias by default.
############################################