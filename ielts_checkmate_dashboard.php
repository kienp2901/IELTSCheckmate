<?php
// ini_set('display_errors', 1);
// ini_set('display_startup_errors', 1);
// error_reporting(E_ALL);
/*
Plugin Name: Ielts checkmate dashboard
Plugin URI: https://freetuts.net
Description: Ielts checkmate
Author: kien
Version: 1.4
Author URI: https://freetuts.net
Text Domain:custom-form
*/
define('IELTS_CHECKMATE_PREFIX_PATH', 'wordpress');
// define('IELTS_CHECKMATE_PREFIX_PATH', '');
define('WIDGET_URL_CHECKMATE_DASHBOARD', plugins_url('/ielts_checkmate_dashboard'));
function add_my_custom_page_ielts_checkmate_dashboard()
{

    // Teacher ws v4
    $my_post3 = array(
        'post_title'    => wp_strip_all_tags('Ielts checkmate'),
        'post_status'   => 'publish',
        'post_author'   => 1,
        'post_type'     => 'page',
        'post_name' => 'ielts-checkmate-dashboard',
    );

    // Insert the post into the database
    $add3 = wp_insert_post($my_post3);
    update_option('ielts_checkmate_dashboard', $add3);

	$my_post4 = array(
        'post_title'    => wp_strip_all_tags('Ielts checkmate Contact'),
        'post_status'   => 'publish',
        'post_author'   => 1,
        'post_type'     => 'page',
        'post_name' => 'contact',
    );

    // Insert the post into the database
    $add4 = wp_insert_post($my_post4);
    update_option('ielts_checkmate_contact', $add4);

    $my_post5 = array(
        'post_title'    => wp_strip_all_tags('Ielts checkmate Register'),
        'post_status'   => 'publish',
        'post_author'   => 1,
        'post_type'     => 'page',
        'post_name' => 'register',
    );

    // Insert the post into the database
    $add5 = wp_insert_post($my_post5);
    update_option('ielts_checkmate_register', $add5);

    $my_post6 = array(
        'post_title'    => wp_strip_all_tags('Ielts checkmate Thankyou'),
        'post_status'   => 'publish',
        'post_author'   => 1,
        'post_type'     => 'page',
        'post_name' => 'thankyou',
    );

    // Insert the post into the database
    $add6 = wp_insert_post($my_post6);
    update_option('ielts_checkmate_thankyou', $add6);

    $my_post7 = array(
        'post_title'    => wp_strip_all_tags('Ielts checkmate Terms'),
        'post_status'   => 'publish',
        'post_author'   => 1,
        'post_type'     => 'page',
        'post_name' => 'terms',
    );

    // Insert the post into the database
    $add7 = wp_insert_post($my_post7);
    update_option('ielts_checkmate_terms', $add7);

    $my_post8 = array(
        'post_title'    => wp_strip_all_tags('Ielts checkmate Privacy'),
        'post_status'   => 'publish',
        'post_author'   => 1,
        'post_type'     => 'page',
        'post_name' => 'privacy',
    );

    // Insert the post into the database
    $add8 = wp_insert_post($my_post8);
    update_option('ielts_checkmate_privacy', $add8);

    $my_post9 = array(
        'post_title'    => wp_strip_all_tags('Ielts checkmate Payment'),
        'post_status'   => 'publish',
        'post_author'   => 1,
        'post_type'     => 'page',
        'post_name' => 'payment',
    );

    // Insert the post into the database
    $add9 = wp_insert_post($my_post9);
    update_option('ielts_checkmate_payment', $add9);
    
    // Add rewrite rules and flush
    checkmate_add_rewrite_rules();
    flush_rewrite_rules();
}

register_activation_hook(__FILE__, 'add_my_custom_page_ielts_checkmate_dashboard');

// Add custom rewrite rules for /dashboard
function checkmate_add_rewrite_rules() {
    add_rewrite_rule('^dashboard/?$', 'index.php?checkmate_dashboard=1', 'top');
}
add_action('init', 'checkmate_add_rewrite_rules');

// Add query var
function checkmate_query_vars($vars) {
    $vars[] = 'checkmate_dashboard';
    return $vars;
}
add_filter('query_vars', 'checkmate_query_vars');


add_filter( 'page_template', 'fw_reserve_page_template_ielts_checkmate_dashboard' );
function fw_reserve_page_template_ielts_checkmate_dashboard( $page_template )
{
    $page_id3 = get_option('ielts_checkmate_dashboard');
	$page_id4 = get_option('ielts_checkmate_contact');
    $page_id5 = get_option('ielts_checkmate_register');
    $page_id6 = get_option('ielts_checkmate_thankyou');
    $page_id7 = get_option('ielts_checkmate_terms');
    $page_id8 = get_option('ielts_checkmate_privacy');
    $page_id9 = get_option('ielts_checkmate_payment');
    if (  is_page( $page_id3 ) || 
    is_page( $page_id4 ) || 
    is_page( $page_id5 ) || 
    is_page( $page_id6 ) ||
    is_page( $page_id7 ) ||
    is_page( $page_id8 ) ||
    is_page( $page_id9 )) {

        $page_template = dirname( __FILE__ ) . '/index.php';
    }
    return $page_template;
}

function deactivate_plugin_ielts_checkmate_dashboard()
{
    $page_id3 = get_option('ielts_checkmate_dashboard');
    wp_delete_post($page_id3);

	$page_id4 = get_option('ielts_checkmate_contact');
    wp_delete_post($page_id4);

    $page_id5 = get_option('ielts_checkmate_register');
    wp_delete_post($page_id5);

    $page_id6 = get_option('ielts_checkmate_thankyou');
    wp_delete_post($page_id6);

    $page_id7 = get_option('ielts_checkmate_terms');
    wp_delete_post($page_id7);

    $page_id8 = get_option('ielts_checkmate_privacy');
    wp_delete_post($page_id8);

    $page_id9 = get_option('ielts_checkmate_payment');
    wp_delete_post($page_id9);
}
register_deactivation_hook(__FILE__, 'deactivate_plugin_ielts_checkmate_dashboard');

// Prevent WordPress from redirecting /dashboard to login
function checkmate_intercept_dashboard_redirect() {
    // Get the current URL path
    $request_uri = $_SERVER['REQUEST_URI'];
    $parsed_url = parse_url($request_uri);
    $path = isset($parsed_url['path']) ? rtrim($parsed_url['path'], '/') : '';
    
    // Remove any prefix path (for subdirectory installations)
    $path = str_replace('/wordpress', '', $path);
    
    // Check if accessing /dashboard
    if ($path === '/dashboard') {
        // Redirect to IELTS Checkmate Dashboard
        wp_redirect(home_url('/ielts-checkmate-dashboard'), 301);
        exit;
    }
}
// Use very early priority to intercept before WordPress processes admin redirects
add_action('init', 'checkmate_intercept_dashboard_redirect', 1);

// Handle the custom query var redirect
function checkmate_redirect_dashboard_template() {
    // Check if this is our custom dashboard query var
    if (get_query_var('checkmate_dashboard')) {
        wp_redirect(home_url('/ielts-checkmate-dashboard'), 301);
        exit;
    }
    
    // Also check direct URL access as backup
    $request_uri = $_SERVER['REQUEST_URI'];
    $parsed_url = parse_url($request_uri);
    $path = isset($parsed_url['path']) ? rtrim($parsed_url['path'], '/') : '';
    $path = str_replace('/wordpress', '', $path);
    
    if ($path === '/dashboard') {
        wp_redirect(home_url('/ielts-checkmate-dashboard'), 301);
        exit;
    }
}
add_action('template_redirect', 'checkmate_redirect_dashboard_template', 1);

// Custom 404 Template for IELTS Checkmate
function checkmate_custom_404_template($template) {
    if (is_404()) {
        $custom_404 = dirname(__FILE__) . '/templates/404-checkmate.php';
        if (file_exists($custom_404)) {
            return $custom_404;
        }
    }
    return $template;
}
add_filter('template_include', 'checkmate_custom_404_template', 99);

// Custom 403 Error Page for IELTS Checkmate
function checkmate_custom_403_page() {
    $custom_403 = dirname(__FILE__) . '/templates/403-checkmate.php';
    if (file_exists($custom_403)) {
        status_header(403);
        include($custom_403);
        exit;
    }
}

// Custom 500 Error Page for IELTS Checkmate
function checkmate_custom_500_page() {
    $custom_500 = dirname(__FILE__) . '/templates/500-checkmate.php';
    if (file_exists($custom_500)) {
        status_header(500);
        include($custom_500);
        exit;
    }
}

// Hook to display error pages when needed
function checkmate_handle_custom_errors() {
    // Check for 403 error
    if (isset($_GET['checkmate_error']) && $_GET['checkmate_error'] === '403') {
        checkmate_custom_403_page();
    }
    
    // Check for 500 error
    if (isset($_GET['checkmate_error']) && $_GET['checkmate_error'] === '500') {
        checkmate_custom_500_page();
    }
}
add_action('template_redirect', 'checkmate_handle_custom_errors', 1);

// Custom wp_die handler for errors
function checkmate_custom_wp_die_handler($message, $title, $args) {
    // Check if this is a 403 error
    if (isset($args['response']) && $args['response'] == 403) {
        checkmate_custom_403_page();
    }
    
    // Check if this is a 500 error
    if (isset($args['response']) && $args['response'] == 500) {
        checkmate_custom_500_page();
    }
    
    // For other errors, use default handler
    _default_wp_die_handler($message, $title, $args);
}

// Override wp_die for custom error pages (403, 500)
function checkmate_set_custom_die_handler($handlers) {
    $handlers[] = 'checkmate_custom_wp_die_handler';
    return $handlers;
}
add_filter('wp_die_handler', 'checkmate_set_custom_die_handler');