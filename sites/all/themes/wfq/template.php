<?php
/**
 * @file
 * Contains theme override functions and preprocess functions for the theme.
 *
 * ABOUT THE TEMPLATE.PHP FILE
 *
 *   The template.php file is one of the most useful files when creating or
 *   modifying Drupal themes. You can modify or override Drupal's theme
 *   functions, intercept or make additional variables available to your theme,
 *   and create custom PHP logic. For more information, please visit the Theme
 *   Developer's Guide on Drupal.org: http://drupal.org/theme-guide
 *
 * OVERRIDING THEME FUNCTIONS
 *
 *   The Drupal theme system uses special theme functions to generate HTML
 *   output automatically. Often we wish to customize this HTML output. To do
 *   this, we have to override the theme function. You have to first find the
 *   theme function that generates the output, and then "catch" it and modify it
 *   here. The easiest way to do it is to copy the original function in its
 *   entirety and paste it here, changing the prefix from theme_ to wfq_.
 *   For example:
 *
 *     original: theme_breadcrumb()
 *     theme override: wfq_breadcrumb()
 *
 *   where wfq is the name of your sub-theme. For example, the
 *   zen_classic theme would define a zen_classic_breadcrumb() function.
 *
 *   If you would like to override either of the two theme functions used in Zen
 *   core, you should first look at how Zen core implements those functions:
 *     theme_breadcrumbs()      in zen/template.php
 *     theme_menu_local_tasks() in zen/template.php
 *
 *   For more information, please visit the Theme Developer's Guide on
 *   Drupal.org: http://drupal.org/node/173880
 *
 * CREATE OR MODIFY VARIABLES FOR YOUR THEME
 *
 *   Each tpl.php template file has several variables which hold various pieces
 *   of content. You can modify those variables (or add new ones) before they
 *   are used in the template files by using preprocess functions.
 *
 *   This makes THEME_preprocess_HOOK() functions the most powerful functions
 *   available to themers.
 *
 *   It works by having one preprocess function for each template file or its
 *   derivatives (called template suggestions). For example:
 *     THEME_preprocess_page    alters the variables for page.tpl.php
 *     THEME_preprocess_node    alters the variables for node.tpl.php or
 *                              for node-forum.tpl.php
 *     THEME_preprocess_comment alters the variables for comment.tpl.php
 *     THEME_preprocess_block   alters the variables for block.tpl.php
 *
 *   For more information on preprocess functions and template suggestions,
 *   please visit the Theme Developer's Guide on Drupal.org:
 *   http://drupal.org/node/223440
 *   and http://drupal.org/node/190815#template-suggestions
 */


/**
 * Override or insert variables into the html templates.
 *
 * @param $variables
 *   An array of variables to pass to the theme template.
 * @param $hook
 *   The name of the template being rendered ("html" in this case.)
 */

function wfq_preprocess_html(&$variables, $hook) {
  //$variables['sample_variable'] = t('Lorem ipsum.');
  // The body tag's classes are controlled by the $classes_array variable. To
  // remove a class from $classes_array, use array_diff().
  //$variables['classes_array'] = array_diff($variables['classes_array'], array('class-to-remove'));
}
// */

/**
 * Override or insert variables into the page templates.
 *
 * @param $variables
 *   An array of variables to pass to the theme template.
 * @param $hook
 *   The name of the template being rendered ("page" in this case.)
 */
/* -- Delete this line if you want to use this function
function wfq_preprocess_page(&$variables, $hook) {
	$variables['sample_variable'] = t('Lorem ipsum.');
}
// */

/**
 * Override or insert variables into the node templates.
 *
 * @param $variables
 *   An array of variables to pass to the theme template.
 * @param $hook
 *   The name of the template being rendered ("node" in this case.)
 */
function wfq_preprocess_node(&$variables, $hook) {

	// Optionally, run node-type-specific preprocess functions, like
	// wfq_preprocess_node_page() or wfq_preprocess_node_story().
	$function = __FUNCTION__ . '_' . $variables['node']->type;
	if (function_exists($function)) {
		$function($variables, $hook);
	}

	// process carousel node.
	$regex = "/\{\{carousel dir=([a-z]+?)\}\}/";
	$body = $variables["content"]["body"][0]["#markup"];
	$newBody = preg_replace_callback( $regex, 'wfq_carousel_match', $body );

	$variables["content"]["body"][0]["#markup"] = $newBody;
}

function wfq_carousel_match( $match ) {
	$content = "";

	if (count($match) == 2 && strlen($match[1]) > 0) {
		$path = "/sites/default/files/" . $match[1];
		
		$files = wfq_carousel_getfiles( $path );
		$content .= wfq_carousel_render( $path, $files );
	}
	return $content;
}

function wfq_carousel_getfiles( $path ) {
	$fullpath = $_SERVER["DOCUMENT_ROOT"] . $path;

	$files = array();
	$handle = @opendir($fullpath);
	while ($file = @readdir($handle)) {
		if ($file != '.' && $file != 'full' && $file != '..')
			$files[] = $file;
	}
	@closedir($handler);

	return $files;
}
	
function wfq_carousel_render( $path, $files ) {
	$html = "";
	if (count($files) > 0) 
	{
		$html .= '<div id="mycarousel" class="carousel-component">';
		$html .= '	<div class="carousel-prev">';
		$html .= '		<img id="prev-arrow" class="left-button-image" src="/sites/all/themes/wfq/images/carousel/left-enabled.png" alt="" title="Zur&uuml;ck" />';
		$html .= '	</div>';
		$html .= '	<div class="carousel-next">';
		$html .= '		<img id="next-arrow" class="right-button-image" src="/sites/all/themes/wfq/images/carousel/right-enabled.png" alt="" title="Weiter" />';
		$html .= '	</div>';
		$html .= '	<div class="carousel-clip-region">';
		$html .= '		<ul class="carousel-list" id="carousel">';
		for( $i = 0; $i < count($files); $i++ ) {
			$thumb = $path . "/" . $files[$i];
			$image = $path . "/full/" . $files[$i];
			$html .= '				<li id="mycarousel-item-' . ($i+1) .'"><a href="'. $image .'" rel="lyteshow[group]"><img width="88" height="88" src="' . $thumb .'" alt="" /></a></li>';
		} 
		$html .= '		</ul>';
		$html .= '	</div>';
		$html .= '</div>';
	}
	return $html;
}