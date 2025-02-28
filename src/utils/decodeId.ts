export const decodeId = (encodedId: string) => {
    const decoded = decodeURIComponent(encodedId);
    const parts = decoded.split('__'); // Dùng '__' thay vì '_'
    if (parts.length < 2) {
        return { name: decoded, id: null }; // Trường hợp không có ID
    }
    const id = parts.pop(); // Lấy phần cuối làm ID
    const name = parts.join('__'); // Ghép lại phần còn lại làm tên
    return { name, id };
};