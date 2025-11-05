<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>403 - Truy cập bị từ chối | IELTS Checkmate</title>
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

        .checkmate-403-wrapper {
            height: 100vh;
            width: 100vw;
            background: #ffffff;
            display: flex;
            flex-direction: column;
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: 999999;
            overflow-y: auto;
            overflow-x: hidden;
        }

        .checkmate-403-header {
            padding: 20px 40px;
            position: absolute;
            top: 0;
            left: 0;
            z-index: 10;
        }

        .checkmate-403-logo {
            font-size: 1.2rem;
            font-weight: 600;
            color: #2c3e50;
            text-decoration: none;
            border-bottom: 2px solid #2c3e50;
            display: inline-block;
            padding-bottom: 2px;
        }

        .checkmate-403-logo:hover {
            color: #667eea;
            border-bottom-color: #667eea;
        }

        .checkmate-403-container {
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 100px 20px 60px;
        }

        .checkmate-403-content {
            max-width: 700px;
            width: 100%;
            text-align: center;
        }

        .checkmate-403-image {
            max-width: 100%;
            height: auto;
            margin: 0 0 40px 0;
        }

        .checkmate-403-image img {
            max-width: 400px;
            width: 100%;
            height: auto;
            display: inline-block;
        }

        .checkmate-403-title {
            font-size: 2rem;
            font-weight: 700;
            color: #2c3e50;
            margin-bottom: 25px;
            line-height: 1.4;
        }

        .checkmate-403-message {
            font-size: 1.2rem;
            color: #555;
            line-height: 1.8;
            margin-bottom: 15px;
        }

        .checkmate-403-message:last-of-type {
            margin-bottom: 40px;
        }

        .checkmate-403-button {
            display: inline-block !important;
            visibility: visible !important;
            opacity: 1 !important;
            padding: 16px 45px !important;
            font-size: 1.1rem !important;
            font-weight: 600 !important;
            color: white !important;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
            border: none !important;
            border-radius: 50px !important;
            text-decoration: none !important;
            transition: all 0.3s ease !important;
            box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4) !important;
            cursor: pointer !important;
            margin-top: 10px !important;
        }

        .checkmate-403-button:hover {
            transform: translateY(-3px) !important;
            box-shadow: 0 10px 30px rgba(102, 126, 234, 0.5) !important;
            color: white !important;
            text-decoration: none !important;
        }

        .checkmate-403-button:active {
            transform: translateY(-1px) !important;
        }

        @media (max-width: 768px) {
            .checkmate-403-header {
                padding: 15px 20px;
            }

            .checkmate-403-container {
                padding: 80px 20px 40px;
            }

            .checkmate-403-title {
                font-size: 1.5rem;
            }

            .checkmate-403-message {
                font-size: 1rem;
            }

            .checkmate-403-image img {
                max-width: 300px;
            }

            .checkmate-403-button {
                padding: 14px 35px !important;
                font-size: 1rem !important;
            }
        }

        @media (max-width: 480px) {
            .checkmate-403-title {
                font-size: 1.3rem;
            }

            .checkmate-403-message {
                font-size: 0.95rem;
            }

            .checkmate-403-image img {
                max-width: 250px;
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
    <div class="checkmate-403-wrapper">
        <div class="checkmate-403-header">
            <a href="<?php echo esc_url(home_url('/')); ?>" class="checkmate-403-logo">
                IELTSCheckmate
            </a>
        </div>

        <div class="checkmate-403-container">
            <div class="checkmate-403-content">
                <div class="checkmate-403-image">
                    <img src="<?php echo esc_url(plugins_url('/src/assets/403image.png', dirname(__FILE__))); ?>" 
                         alt="403 Error - Forbidden" />
                </div>

                <h1 class="checkmate-403-title">
                    🚫 403: Oops! Khu vực "restricted" rồi nha 😅
                </h1>

                <p class="checkmate-403-message">
                    Có vẻ bạn vừa bước nhầm vào một "phòng thi bí mật" mà Checkmate chưa mở cửa đâu 👀
                </p>

                <p class="checkmate-403-message">
                    Đừng lo, không bị trừ điểm đâu!
                </p>

                <p class="checkmate-403-message">
                    Hãy quay lại trang học tập để tiếp tục luyện tập như một band 9 warrior nhé 💪
                </p>

                <a href="<?php echo esc_url(home_url('/ielts-checkmate-dashboard')); ?>" class="checkmate-403-button">
                    🏠 Quay về trang chủ
                </a>
            </div>
        </div>
    </div>

    <?php wp_footer(); ?>
</body>
</html>

