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
// define('IELTS_CHECKMATE_PREFIX_PATH', 'wordpress');
define('IELTS_CHECKMATE_PREFIX_PATH', '');
define('WIDGET_URL_CHECKMATE_DASHBOARD', plugins_url('/ielts_checkmate_dashboard'));

// API Configuration
define('IELTS_CHECKMATE_API_BASE_URL', 'https://ai.ieltscheckmate.com/');
function add_my_custom_page_ielts_checkmate_dashboard()
{

    // Teacher ws v4
    $my_post3 = array(
        'post_title' => wp_strip_all_tags('Ielts checkmate'),
        'post_status' => 'publish',
        'post_author' => 1,
        'post_type' => 'page',
        'post_name' => 'ielts-checkmate-dashboard',
    );

    // Insert the post into the database
    $add3 = wp_insert_post($my_post3);
    update_option('ielts_checkmate_dashboard', $add3);

    $my_post4 = array(
        'post_title' => wp_strip_all_tags('Ielts checkmate Contact'),
        'post_status' => 'publish',
        'post_author' => 1,
        'post_type' => 'page',
        'post_name' => 'contact',
    );

    // Insert the post into the database
    $add4 = wp_insert_post($my_post4);
    update_option('ielts_checkmate_contact', $add4);

    $my_post5 = array(
        'post_title' => wp_strip_all_tags('Ielts checkmate Register'),
        'post_status' => 'publish',
        'post_author' => 1,
        'post_type' => 'page',
        'post_name' => 'register',
    );

    // Insert the post into the database
    $add5 = wp_insert_post($my_post5);
    update_option('ielts_checkmate_register', $add5);

    $my_post6 = array(
        'post_title' => wp_strip_all_tags('Ielts checkmate Thankyou'),
        'post_status' => 'publish',
        'post_author' => 1,
        'post_type' => 'page',
        'post_name' => 'thankyou',
    );

    // Insert the post into the database
    $add6 = wp_insert_post($my_post6);
    update_option('ielts_checkmate_thankyou', $add6);

    $my_post7 = array(
        'post_title' => wp_strip_all_tags('Ielts checkmate Terms'),
        'post_status' => 'publish',
        'post_author' => 1,
        'post_type' => 'page',
        'post_name' => 'terms',
    );

    // Insert the post into the database
    $add7 = wp_insert_post($my_post7);
    update_option('ielts_checkmate_terms', $add7);

    $my_post8 = array(
        'post_title' => wp_strip_all_tags('Ielts checkmate Privacy'),
        'post_status' => 'publish',
        'post_author' => 1,
        'post_type' => 'page',
        'post_name' => 'privacy',
    );

    // Insert the post into the database
    $add8 = wp_insert_post($my_post8);
    update_option('ielts_checkmate_privacy', $add8);

    $my_post9 = array(
        'post_title' => wp_strip_all_tags('Ielts checkmate Payment'),
        'post_status' => 'publish',
        'post_author' => 1,
        'post_type' => 'page',
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
function checkmate_add_rewrite_rules()
{
    add_rewrite_rule('^dashboard/?$', 'index.php?checkmate_dashboard=1', 'top');
}
add_action('init', 'checkmate_add_rewrite_rules');

// Add query var
function checkmate_query_vars($vars)
{
    $vars[] = 'checkmate_dashboard';
    return $vars;
}
add_filter('query_vars', 'checkmate_query_vars');


add_filter('page_template', 'fw_reserve_page_template_ielts_checkmate_dashboard');
function fw_reserve_page_template_ielts_checkmate_dashboard($page_template)
{
    $page_id3 = get_option('ielts_checkmate_dashboard');
    $page_id4 = get_option('ielts_checkmate_contact');
    $page_id5 = get_option('ielts_checkmate_register');
    $page_id6 = get_option('ielts_checkmate_thankyou');
    $page_id7 = get_option('ielts_checkmate_terms');
    $page_id8 = get_option('ielts_checkmate_privacy');
    $page_id9 = get_option('ielts_checkmate_payment');
    if (
        is_page($page_id3) ||
        is_page($page_id4) ||
        is_page($page_id5) ||
        is_page($page_id6) ||
        is_page($page_id7) ||
        is_page($page_id8) ||
        is_page($page_id9)
    ) {

        $page_template = dirname(__FILE__) . '/index.php';
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
function checkmate_intercept_dashboard_redirect()
{
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
function checkmate_redirect_dashboard_template()
{
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

// Redirect 404 to home instead of showing custom 404 page
function checkmate_redirect_404_to_home()
{
    if (!is_404()) {
        return;
    }

    checkmate_log_error(404);
    wp_safe_redirect(home_url('/'), 302);
    exit;
}
add_action('template_redirect', 'checkmate_redirect_404_to_home', 1);

/**
 * Resolve plugin error log path under uploads; ensure dir + .htaccess exist.
 * Separate files per status: 403.log, 404.log, 500.log.
 *
 * @param int $code HTTP-like error code (403, 404, 500).
 * @return string|false Absolute path to the log file, or false on failure.
 */
function checkmate_get_error_log_path($code = 500)
{
    $upload_dir = wp_upload_dir();
    if (!empty($upload_dir['error'])) {
        return false;
    }

    $log_dir = trailingslashit($upload_dir['basedir']) . 'ielts-checkmate';

    if (!is_dir($log_dir)) {
        if (!wp_mkdir_p($log_dir)) {
            return false;
        }
    }

    if (is_dir($log_dir) && !is_writable($log_dir)) {
        @chmod($log_dir, 0755);
    }

    $htaccess = $log_dir . '/.htaccess';
    if (!file_exists($htaccess)) {
        $rules = "<IfModule mod_authz_core.c>\nRequire all denied\n</IfModule>\n<IfModule !mod_authz_core.c>\nDeny from all\n</IfModule>\n";
        if (@file_put_contents($htaccess, $rules) !== false) {
            @chmod($htaccess, 0644);
        }
    }

    $index = $log_dir . '/index.php';
    if (!file_exists($index)) {
        if (@file_put_contents($index, "<?php\n// Silence is golden.\n") !== false) {
            @chmod($index, 0644);
        }
    }

    $code = (int) $code;
    $allowed = array(403, 404, 500);
    $basename = in_array($code, $allowed, true) ? $code . '.log' : 'errors.log';
    $log_path = $log_dir . '/' . $basename;

    if (!file_exists($log_path)) {
        if (@file_put_contents($log_path, '') !== false) {
            @chmod($log_path, 0644);
        }
    } elseif (!is_writable($log_path)) {
        @chmod($log_path, 0644);
    }

    if (!is_writable($log_dir) || (file_exists($log_path) && !is_writable($log_path))) {
        return false;
    }

    return $log_path;
}

/**
 * Rotate a log file when larger than 5MB.
 *
 * @param string $log_path Absolute path to a status log file (e.g. 404.log)
 */
function checkmate_rotate_error_log_if_needed($log_path)
{
    if (!file_exists($log_path) || !is_file($log_path)) {
        return;
    }

    $max_bytes = 5 * 1024 * 1024;
    $size = @filesize($log_path);
    if ($size === false || $size < $max_bytes) {
        return;
    }

    $dir = dirname($log_path);
    $base = basename($log_path, '.log');
    $rotated = $dir . '/' . $base . '-' . gmdate('Ymd-His') . '.log';
    @rename($log_path, $rotated);
}

// Structured error log for tracing 403/404/500 (per-code file + server error_log)
function checkmate_log_error($code, $message = '', $context = array())
{
    $message = is_string($message) ? wp_strip_all_tags($message) : '';
    if (strlen($message) > 500) {
        $message = substr($message, 0, 500) . '...';
    }

    $user_id = function_exists('get_current_user_id') ? get_current_user_id() : 0;
    $uri = isset($_SERVER['REQUEST_URI']) ? $_SERVER['REQUEST_URI'] : '';

    $payload = array_merge(array(
        'code' => (int) $code,
        'uri' => $uri,
        'user_id' => $user_id ? (int) $user_id : 0,
        'message' => $message,
    ), $context);

    $line_body = '[Checkmate][' . (int) $code . '] ' . wp_json_encode($payload);
    $timestamp = function_exists('wp_date')
        ? wp_date('c')
        : date('c');
    $file_line = $timestamp . ' ' . $line_body . PHP_EOL;

    $log_path = checkmate_get_error_log_path($code);
    if ($log_path) {
        checkmate_rotate_error_log_if_needed($log_path);
        $written = @file_put_contents($log_path, $file_line, FILE_APPEND | LOCK_EX);
        if ($written === false) {
            error_log('[Checkmate] Failed to write error log file: ' . $log_path);
        }
    } else {
        error_log('[Checkmate] Error log path not writable (expected under uploads/ielts-checkmate/)');
    }

    error_log($line_body);
}

// 403: log then redirect home (no branded dead-end page)
function checkmate_custom_403_page($message = '')
{
    checkmate_log_error(403, $message);
    wp_safe_redirect(home_url('/'), 302);
    exit;
}

// 500: log then show branded recovery page
function checkmate_custom_500_page($message = '')
{
    checkmate_log_error(500, $message);

    $custom_500 = dirname(__FILE__) . '/templates/500-checkmate.php';
    if (file_exists($custom_500)) {
        status_header(500);
        include($custom_500);
        exit;
    }
}

// Check maintenance status from API
function checkmate_get_maintenance_status($domain)
{
    // Get API URL from WordPress options or use constant
    $api_url = get_option('checkmate_api_url', IELTS_CHECKMATE_API_BASE_URL);
    if (empty($api_url)) {
        $api_url = IELTS_CHECKMATE_API_BASE_URL;
    }

    // Prepare API endpoint
    $endpoint = rtrim($api_url, '/') . '/api/domain-maintenance/check';

    // Prepare request body
    $body = json_encode(array(
        'domain' => $domain
    ));

    // Make API request
    $response = wp_remote_post($endpoint, array(
        'headers' => array(
            'Content-Type' => 'application/json',
        ),
        'body' => $body,
        'timeout' => 10,
        'sslverify' => true,
    ));

    // Check for errors
    if (is_wp_error($response)) {
        error_log('Maintenance check API error: ' . $response->get_error_message());
        return array(
            'success' => false,
            'is_maintenance' => false,
        );
    }

    // Get response body
    $response_body = wp_remote_retrieve_body($response);
    $response_code = wp_remote_retrieve_response_code($response);

    // Parse JSON response
    if ($response_code === 200 && !empty($response_body)) {
        $data = json_decode($response_body, true);
        if (json_last_error() === JSON_ERROR_NONE && is_array($data)) {
            return $data;
        } else {
            // Log JSON parse error
            if (defined('WP_DEBUG') && WP_DEBUG) {
                error_log('Maintenance API - JSON parse error: ' . json_last_error_msg());
                error_log('Maintenance API - Response body: ' . $response_body);
            }
        }
    } else {
        // Log API call failure
        if (defined('WP_DEBUG') && WP_DEBUG) {
            error_log('Maintenance API - HTTP Code: ' . $response_code);
            error_log('Maintenance API - Response body: ' . $response_body);
        }
    }

    // Default response if API call fails
    return array(
        'success' => false,
        'is_maintenance' => false,
    );
}

// Check and display maintenance page if needed
function checkmate_check_maintenance_mode()
{
    // Skip maintenance check for admin pages
    if (is_admin()) {
        return;
    }

    // Skip maintenance check for login/logout pages
    if (in_array($GLOBALS['pagenow'], array('wp-login.php', 'wp-register.php'))) {
        return;
    }

    // Get current domain
    $domain = home_url();

    // Clear any existing cache (in case cache exists from previous version)
    $cache_key = 'checkmate_maintenance_status';
    delete_transient($cache_key);

    // Check maintenance status (realtime - no caching)
    $maintenance_data = checkmate_get_maintenance_status($domain);

    // Debug logging (optional - can be removed in production)
    if (defined('WP_DEBUG') && WP_DEBUG) {
        error_log('Maintenance check - Domain: ' . $domain);
        error_log('Maintenance check - Response: ' . print_r($maintenance_data, true));
    }

    // Check if maintenance mode is enabled
    if (isset($maintenance_data['is_maintenance']) && $maintenance_data['is_maintenance'] === true) {
        // Check allowed IPs if configured
        $allowed_ips = isset($maintenance_data['data']['allowed_ips']) ? $maintenance_data['data']['allowed_ips'] : array();

        if (!empty($allowed_ips)) {
            $client_ip = isset($_SERVER['REMOTE_ADDR']) ? $_SERVER['REMOTE_ADDR'] : '';
            // If IP is in allowed list, skip maintenance page
            if (!empty($client_ip) && in_array($client_ip, $allowed_ips)) {
                return;
            }
        }

        // Set global variable for template to use
        global $checkmate_maintenance_data;
        $checkmate_maintenance_data = $maintenance_data;

        // Show maintenance page
        $maintenance_template = dirname(__FILE__) . '/templates/maintenance-checkmate.php';
        if (file_exists($maintenance_template)) {
            include($maintenance_template);
            exit;
        }
    }
}
// Hook to check maintenance mode early (before template_redirect, priority 0 to run before other redirects)
add_action('template_redirect', 'checkmate_check_maintenance_mode', 0);

// Custom wp_die handler for 403 (redirect home) and 500 (branded page)
function checkmate_custom_wp_die_handler($message, $title = '', $args = array())
{
    $args = wp_parse_args($args, array('response' => 500));
    $response = (int) $args['response'];

    $log_message = $message;
    if (is_wp_error($message)) {
        $log_message = $message->get_error_message();
    } elseif (!is_string($message)) {
        $log_message = '';
    }

    // Only customize front-end; keep default admin/AJAX/XML-RPC behavior
    $is_front = !is_admin() && !wp_doing_ajax() && !(defined('XMLRPC_REQUEST') && XMLRPC_REQUEST);

    if ($is_front && $response === 403) {
        checkmate_custom_403_page($log_message);
    }

    if ($is_front && $response === 500) {
        checkmate_custom_500_page($log_message);
    }

    _default_wp_die_handler($message, $title, $args);
}

// WordPress expects a single callable from wp_die_handler filter
function checkmate_set_custom_die_handler($handler)
{
    return 'checkmate_custom_wp_die_handler';
}
add_filter('wp_die_handler', 'checkmate_set_custom_die_handler');

// Helper function to get GTM code for manual injection
function checkmate_get_gtm_code($position = 'head')
{
    // Check if GTM4WP plugin functions are available
    if ($position === 'head') {
        // Use GTM4WP's function if available
        if (function_exists('gtm4wp_wp_header_begin')) {
            ob_start();
            gtm4wp_wp_header_begin(true);
            return ob_get_clean();
        }
    } elseif ($position === 'body') {
        // Use GTM4WP's function if available
        if (function_exists('gtm4wp_the_gtm_tag')) {
            ob_start();
            gtm4wp_the_gtm_tag();
            return ob_get_clean();
        }
    }

    // Fallback: Manual GTM code injection if GTM4WP functions not available
    global $gtm4wp_options;

    // Try to get GTM ID from GTM4WP global options
    if (isset($gtm4wp_options) && is_array($gtm4wp_options)) {
        $gtm_id = isset($gtm4wp_options['gtm-code']) ? $gtm4wp_options['gtm-code'] : '';
    } else {
        // Fallback: Get from database directly
        $gtm_options = get_option('gtm4wp-options');
        $gtm_id = isset($gtm_options['gtm-code']) ? $gtm_options['gtm-code'] : '';
    }

    // Return empty if GTM is not configured
    if (empty($gtm_id)) {
        return '';
    }

    // Return appropriate GTM code based on position
    if ($position === 'head') {
        return "<!-- Google Tag Manager -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','" . esc_js($gtm_id) . "');</script>
<!-- End Google Tag Manager -->";
    } elseif ($position === 'body') {
        return "<!-- Google Tag Manager (noscript) -->
<noscript><iframe src=\"https://www.googletagmanager.com/ns.html?id=" . esc_attr($gtm_id) . "\"
height=\"0\" width=\"0\" style=\"display:none;visibility:hidden\"></iframe></noscript>
<!-- End Google Tag Manager (noscript) -->";
    }

    return '';
}