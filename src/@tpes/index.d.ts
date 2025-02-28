


// declare module '@mui/material/styles' {
    
//   }
// declare global {
    
    interface Window {
        user: IUserContext;
    }
// }
interface IUserContext {
    ID: string;
    user_login: string;
    user_pass: string;
    user_nicename: string;
    user_email: string;
    user_url: string;
    user_registered: string;
    user_activation_key: string;
    user_status: string;
    display_name: string;
    avatar_url: string;
    logout_url: string;
    login_url: string;
    is_admin?: string;
    dataFull?:Array<{
        table_used: string,
        table_id: number,
        table_name: string,
        url: string,
        initial: string
    }>,
    dataCommon?:Array<{
        id: number,
        table_used: string,
        table_id: number,
        wp_user_id: number,
        permission: string,
        created_by: number,
        timemodified: string,
        created_at: string,
        updated_at: string
    }>,
    userBadge?:Array<{
        badgeId: number,
        badgeDescription: string,
        badgeIamge: string,
        badgeName: string,
        badgeView: string,
        type: string
    }>,
}

