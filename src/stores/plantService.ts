import type { Plant } from "@/lib/Plant";


const API_BASE_URL = 'https://localhost:7135/api/Plants'; // Địa chỉ API của bạn

// Lấy danh sách tất cả các cây
export const fetchPlants = async (): Promise<Plant[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}`);
    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }

    const data = await response.json();  // Giả sử API trả về JSON
    return data;  // Trả về dữ liệu cây từ API
  } catch (error) {
    console.error('Fetch error: ', error);
    return [];  // Nếu có lỗi, trả về mảng trống
  }
};

// Lấy cây trending (cây với ID = 1)
export const fetchTrendingPlant = async (): Promise<Plant | null> => {
  try {
    const response = await fetch(`${API_BASE_URL}/1`);
    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }

    const data = await response.json();  // Giả sử API trả về JSON
    return data;  // Trả về dữ liệu cây trending
  } catch (error) {
    console.error("Error fetching trending plant:", error);
    return null; // Nếu có lỗi, trả về null
  }
};