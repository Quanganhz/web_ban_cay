interface LoginResponse {
    token: string; // Giả sử API trả về token
    expiration: string; // Thời gian hết hạn token (nếu có)
    // Bạn có thể thêm các thuộc tính khác dựa trên phản hồi của API
  }
  
  export const login = async (username: string, passwordhash: string): Promise<LoginResponse | null> => {
    const API_LOGIN_URL = 'https://localhost:7135/api/Auth/login';
  
    try {
      const response = await fetch(API_LOGIN_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, passwordhash }), // Dữ liệu gửi đi
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }
  
      const data: LoginResponse = await response.json(); // Giả sử API trả về JSON
      return data; // Trả về dữ liệu từ API
    } catch (error) {
      console.error('Error logging in:', error);
      return null; // Nếu có lỗi, trả về null
    }
  };
  