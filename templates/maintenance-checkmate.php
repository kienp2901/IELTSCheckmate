<?php
// This template should only be included when maintenance mode is active
// Maintenance data should be passed from checkmate_check_maintenance_mode function
global $checkmate_maintenance_data;

// Default values if not set
$maintenance_title = '🔧 IELTS Checkmate đang bảo trì một chút…';
$maintenance_message = '';

if (isset($checkmate_maintenance_data) && is_array($checkmate_maintenance_data)) {
    $maintenance_title = isset($checkmate_maintenance_data['data']['title']) 
        ? $checkmate_maintenance_data['data']['title'] 
        : $maintenance_title;
    $maintenance_message = isset($checkmate_maintenance_data['data']['message']) 
        ? $checkmate_maintenance_data['data']['message'] 
        : $maintenance_message;
}
?>
<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bảo trì hệ thống | IELTS Checkmate</title>
    <?php wp_head(); ?>
    <?php 
    // Inject GTM head code
    if (function_exists('checkmate_get_gtm_code')) {
        echo checkmate_get_gtm_code('head');
    }
    ?>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        html, body {
            height: 100%;
            width: 100%;
            margin: 0;
            padding: 0;
            overflow: hidden;
        }

        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
        }

        /* Hide WordPress admin bar and theme elements */
        #wpadminbar,
        body > header,
        body > footer,
        body > nav,
        .site-header,
        .site-footer {
            display: none !important;
        }

        .checkmate-maintenance-wrapper {
            min-height: 100vh;
            width: 100vw;
            background: #ffffff;
            display: flex;
            align-items: center;
            justify-content: center;
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: 999999;
            overflow: hidden;
            padding: 16px;
            box-sizing: border-box;
        }

        .checkmate-maintenance-header {
            padding: 20px 40px;
            position: absolute;
            top: 0;
            left: 0;
            z-index: 10;
        }

        .checkmate-maintenance-logo {
            font-size: 1.2rem;
            font-weight: 600;
            color: #2c3e50;
            text-decoration: none;
            border-bottom: 2px solid #2c3e50;
            display: inline-block;
            padding-bottom: 2px;
        }

        .checkmate-maintenance-logo:hover {
            color: #667eea;
            border-bottom-color: #667eea;
        }

        .checkmate-maintenance-container {
            width: 100%;
            max-width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 0;
            height: 100%;
            overflow: hidden;
        }

        .checkmate-maintenance-content {
            width: 100%;
            max-width: 100%;
            text-align: center;
            padding: 0;
            box-sizing: border-box;
        }

        .checkmate-maintenance-image {
            margin-bottom: 32px;
            display: flex;
            justify-content: center;
        }

        .checkmate-maintenance-image img {
            max-width: 400px;
            width: 100%;
            height: auto;
            display: inline-block;
        }

        .checkmate-maintenance-title {
            font-size: 1.7rem;
            font-weight: 700;
            color: #1f2937;
            margin-bottom: 16px;
            line-height: 1.4;
        }

        .checkmate-maintenance-message {
            font-size: 1.2rem;
            line-height: 1.6;
            margin-bottom: 12px;
        }

        .checkmate-maintenance-message:last-of-type {
            margin-bottom: 0;
        }

        .checkmate-maintenance-message p {
            margin-bottom: 12px;
            text-align: center;
        }

        .checkmate-maintenance-message p:last-child {
            margin-bottom: 0;
        }

        @media (max-width: 768px) {
            .checkmate-maintenance-wrapper {
                padding: 16px;
            }

            .checkmate-maintenance-image {
                margin-bottom: 24px;
            }

            .checkmate-maintenance-image img {
                max-width: 300px;
            }

            .checkmate-maintenance-title {
                font-size: 1.25rem;
                margin-bottom: 12px;
            }

            .checkmate-maintenance-message {
                font-size: 0.875rem;
                line-height: 1.5;
                margin-bottom: 10px;
            }
        }

        @media (max-width: 480px) {
            .checkmate-maintenance-wrapper {
                padding: 16px;
            }

            .checkmate-maintenance-image {
                margin-bottom: 20px;
            }

            .checkmate-maintenance-image img {
                max-width: 250px;
            }

            .checkmate-maintenance-title {
                font-size: 1.125rem;
                margin-bottom: 10px;
            }

            .checkmate-maintenance-message {
                font-size: 0.8125rem;
                line-height: 1.4;
                margin-bottom: 8px;
            }

            .checkmate-maintenance-message p {
                margin-bottom: 8px;
            }
        }
    </style>
</head>
<body>
    <?php 
    // Inject GTM body code
    if (function_exists('checkmate_get_gtm_code')) {
        echo checkmate_get_gtm_code('body');
    }
    ?>
    <div class="checkmate-maintenance-wrapper">
        <!-- <div class="checkmate-maintenance-header">
            <a href="<?php echo esc_url(home_url('/ielts-checkmate-dashboard')); ?>" class="checkmate-maintenance-logo">
                IELTSCheckmate
            </a>
        </div> -->

        <div class="checkmate-maintenance-container">
            <div class="checkmate-maintenance-content">
                <div class="checkmate-maintenance-image">
                    <img src="<?php echo esc_url(plugins_url('/src/assets/maintain_web.png', dirname(__FILE__))); ?>" 
                         alt="Maintenance - Website Under Maintenance" />
                </div>

                <h1 class="checkmate-maintenance-title">
                    <?php echo esc_html($maintenance_title); ?>
                </h1>

                <?php if (!empty($maintenance_message)): ?>
                    <div class="checkmate-maintenance-message">
                        <?php echo wp_kses_post($maintenance_message); ?>
                    </div>
                <?php else: ?>
                    <p class="checkmate-maintenance-message">
                        Đừng lo 😌
                    </p>
                    <p class="checkmate-maintenance-message">
                        Không phải bạn sai grammar đâu.
                    </p>
                    <p class="checkmate-maintenance-message">
                        Là tụi mình đang nâng cấp hệ thống để học IELTS mượt hơn – thông minh hơn – hiệu quả hơn.
                    </p>
                <?php endif; ?>
            </div>
        </div>
    </div>

    <?php wp_footer(); ?>
</body>
</html>
<?php
exit;
?>

