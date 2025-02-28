export const sanitizeInputUsername = (input: string) => {
  // Loại bỏ thẻ HTML, ký tự đặc biệt và emoji
  return input
    .replace(/<\/?[^>]+(>|$)/g, "") // Loại bỏ thẻ HTML
    .replace(/[^a-zA-Z0-9 ]/g, '') // Loại bỏ ký tự đặc biệt
    .replace(/[\u{1F600}-\u{1F64F}]/gu, "") // Loại bỏ emoji mặt cười
    .replace(/[\u{1F300}-\u{1F5FF}]/gu, "") // Loại bỏ emoji biểu tượng
    .replace(/[\u{1F680}-\u{1F6FF}]/gu, "") // Loại bỏ emoji phương tiện
    .replace(/[\u{2600}-\u{26FF}]/gu, "") // Loại bỏ emoji biểu tượng đặc biệt
    .replace(/[\u{2700}-\u{27BF}]/gu, "") // Loại bỏ emoji ký hiệu bổ sung
    .toLowerCase(); 
};
export const sanitizeInputName = (input: string): string => {
  return input
      .replace(/<\/?[^>]+(>|$)/g, "") // Loại bỏ thẻ HTML
      .replace(/[\u{1F600}-\u{1F64F}]/gu, "") // Loại bỏ emoji mặt cười
      .replace(/[\u{1F300}-\u{1F5FF}]/gu, "") // Loại bỏ emoji biểu tượng
      .replace(/[\u{1F680}-\u{1F6FF}]/gu, "") // Loại bỏ emoji phương tiện
      .replace(/[\u{2600}-\u{26FF}]/gu, "") // Loại bỏ emoji biểu tượng đặc biệt
      .replace(/[\u{2700}-\u{27BF}]/gu, ""); // Loại bỏ emoji ký hiệu bổ sung
};

export const removeEmojiHtmlTag = (input: string) => {
// Loại bỏ thẻ HTML, ký tự đặc biệt và emoji
return input
  .replace(/<\/?[^>]+(>|$)/g, "") // Loại bỏ thẻ HTML
  .replace(/[\u{1F600}-\u{1F64F}]/gu, "") // Loại bỏ emoji mặt cười
  .replace(/[\u{1F300}-\u{1F5FF}]/gu, "") // Loại bỏ emoji biểu tượng
  .replace(/[\u{1F680}-\u{1F6FF}]/gu, "") // Loại bỏ emoji phương tiện
  .replace(/[\u{2600}-\u{26FF}]/gu, "") // Loại bỏ emoji biểu tượng đặc biệt
  .replace(/[\u{2700}-\u{27BF}]/gu, ""); // Loại bỏ emoji ký hiệu bổ sung
};