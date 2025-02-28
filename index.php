<?php
// echo plugins_url('dist/index.html');die;
// echo "xxxxxxxxxxxxxx";die;
// global $wp_rewrite;
// print_r($wp_rewrite->rules);die;
$current_user = wp_get_current_user();
$userid = $current_user->ID;
$param = get_user_meta($userid);
// if(isset($param['role'][0]) && $param['role'][0] != 'student'){
//     ?>
    <!-- <script>window.location.href = "<?php echo home_url(); ?>";</script> -->
    <?php
// }

$avatar_url = WIDGET_URL_CHECKMATE_DASHBOARD. "/src/images/admin.png";
if(!empty($current_user->avatar_url)){
    $avatar_url = $current_user->avatar_url;
}



$userinfo=array(
    'ID'=>$current_user->ID ?? null,
    'display_name'=>$current_user->data->display_name ?? null,
    // 'user_activation_key'=>'',
    'user_email'=>$current_user->data->user_email ?? null,
    'user_login'=>$current_user->data->user_login ?? null,
    'user_nicename'=>$current_user->data->user_nicename ?? null,
    // 'user_pass'=>$current_user->data->user_pass,
    'user_registered'=>$current_user->data->user_registered ?? null,
    'user_status'=>$current_user->data->user_status ?? null,
    'user_url'=>$current_user->data->user_url ?? null,
    'logout_url'=>wp_logout_url(home_url('/')),
    'login_url'=>wp_login_url(home_url('/ielts-checkmate-dashboard')),
    'avatar_url' => $avatar_url,
    'is_admin' => $current_user->is_admin
    
);
include('dist/index.html');
die;


