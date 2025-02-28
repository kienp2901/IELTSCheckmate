<?php
// ini_set('display_errors', 1);
// ini_set('display_startup_errors', 1);
// error_reporting(E_ALL);
/*
Plugin Name: Ielts checkmate dashboard
Plugin URI: https://freetuts.net
Description: Ielts checkmate
Author: kien
Version: 1.0
Author URI: https://freetuts.net
Text Domain:custom-form
*/
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
}

register_activation_hook(__FILE__, 'add_my_custom_page_ielts_checkmate_dashboard');


add_filter( 'page_template', 'fw_reserve_page_template_ielts_checkmate_dashboard' );
function fw_reserve_page_template_ielts_checkmate_dashboard( $page_template )
{
    $page_id3 = get_option('ielts_checkmate_dashboard');
    if (  is_page( $page_id3 ) ) {

        $page_template = dirname( __FILE__ ) . '/index.php';
    }
    return $page_template;
}

function deactivate_plugin_ielts_checkmate_dashboard()
{
    $page_id3 = get_option('ielts_checkmate_dashboard');
    wp_delete_post($page_id3);
}
register_deactivation_hook(__FILE__, 'deactivate_plugin_ielts_checkmate_dashboard');