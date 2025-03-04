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
}

register_activation_hook(__FILE__, 'add_my_custom_page_ielts_checkmate_dashboard');


add_filter( 'page_template', 'fw_reserve_page_template_ielts_checkmate_dashboard' );
function fw_reserve_page_template_ielts_checkmate_dashboard( $page_template )
{
    $page_id3 = get_option('ielts_checkmate_dashboard');
	$page_id4 = get_option('ielts_checkmate_contact');
    $page_id5 = get_option('ielts_checkmate_register');
    if (  is_page( $page_id3 ) || is_page( $page_id4 ) || is_page( $page_id5 ) ) {

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
}
register_deactivation_hook(__FILE__, 'deactivate_plugin_ielts_checkmate_dashboard');