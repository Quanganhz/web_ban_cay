export interface Plant {
  id: number;
  name: string;
  imageurl: string;
  shortdescription: string;
  detaileddescription: string;
  price: number;
  createdat: string; // ISO 8601 date string
}

const API_BASE_URL = 'https://localhost:7135/api/Plants'; // Địa chỉ API của bạn

// Lấy danh sách tất cả các cây
export const fetchPlants = async (): Promise<Plant[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}`);
    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }
    const data: Plant[] = await response.json();
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
    return [];  // Trả về mảng trống nếu có lỗi
  }
};

// Lấy cây trending (cây với ID = 1)
export const fetchTrendingPlant = async (): Promise<Plant | null> => {
  try {
    const response = await fetch(`${API_BASE_URL}/4`);
    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }
    const data: Plant = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching trending plant:', error);
    return null; // Nếu có lỗi, trả về null
  }
};

// Thêm cây mới (POST)
export const addPlant = async (plant: Plant): Promise<Plant | null> => {
  try {
    const response = await fetch(API_BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(plant),
    });

    if (!response.ok) {
      throw new Error(`Failed to add plant: ${response.statusText}`);
    }

    const data: Plant = await response.json();
    return data;  // Trả về cây mới thêm
  } catch (error) {
    console.error('Error adding plant:', error);
    return null;  // Nếu có lỗi, trả về null
  }
};
// Cập nhật cây (PUT)
export const updatePlant = async (id: number, plant: Omit<Plant, 'id'>): Promise<Plant | null> => {
  try {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(plant),
    });

    if (!response.ok) {
      throw new Error(`Failed to update plant: ${response.statusText}`);
    }

    const data: Plant = await response.json();
    return data;  // Trả về cây đã được cập nhật
  } catch (error) {
    console.error('Error updating plant:', error);
    return null;  // Nếu có lỗi, trả về null
  }
};


