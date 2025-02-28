export const validatePassword = (password: string) => {
    // Kiểm tra mật khẩu phải có ít nhất 6 ký tự và không chứa khoảng trắng
    if (password.length < 6) {
        return 'Password must be at least 6 characters';
    }
    if (password.includes(' ')) {
        return 'Password cannot contain spaces';
    }
    // Kiểm tra ít nhất 1 chữ cái thường và 1 chữ số
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    if (!hasLowerCase || !hasNumber) {
        return 'Password must contain at least 1 lowercase letter and 1 number';
    }
    return ''; // Không có lỗi
};

export const validateEmail = (email: string) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    let error = '';
    if(!regex.test(email)){
        error = 'Invalid email.';
    }else{
        error = '';
    }
    return error;
};

export const validateUsername = (value: string) => {
    let error = '';

    // Kiểm tra độ dài
    if (value.length < 6) {
        error = 'Minimum 6 characters required.';
    } else if (value.length > 20) {
        error = 'Maximum 20 characters allowed.';
    }

    return error;
};

export const validateFirstnameLastname = (value: string) => {
    let error = '';

    // Kiểm tra độ dài
    if (value.length < 2) {
        error = 'Minimum 2 characters required.';
    } else if (value.length > 50) {
        error = 'Maximum 50 characters allowed.';
    }

    return error;
};

export const CODE_PATTERN = "[a-zA-Z0-9_-]*";
export const CODE_TITLE = "Only letters, numbers, underscore and hyphen are allowed";

export const validateCode = (value: string): string => {
  return value.replace(/[^a-zA-Z0-9+_-]/g, '');
};

export const codeFieldProps = {
  inputProps: {
    pattern: CODE_PATTERN,
    title: CODE_TITLE
  }
};