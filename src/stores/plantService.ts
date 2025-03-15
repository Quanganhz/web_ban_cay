const API_BASE_URL = 'https://localhost:7135/api/Plants'; // Địa chỉ API của bạn
export interface Plant {
  id: number;
  name: string;
  productCode: string;
  price: number;
  shortDescription?: string;
  description?: string;
  scientificName?: string;
  commonName?: string;
  heightCm?: number;
  widthCm?: number;
  humidityMinCm?: number;
  humidityMaxCm?: number;
  difficulty?: string;
  wateringMinTimes?: number;
  wateringMaxTimes?: number;
  imageUrl?: string;
  careInstructions?: string;
  createdAt?: string;
  updatedAt?: string;
}

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
    return []; // Trả về mảng trống nếu có lỗi
  }
};

// Lấy cây trending (cây với ID = 4)
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
// Lấy thông tin chi tiết của một cây
export const fetchPlant = async (id: number): Promise<Plant | null> => {
  try {
    const response = await fetch(`${API_BASE_URL}/${id}`);
    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }
    const data: Plant = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching plant:', error);
    return null;
  }
};

// Thêm cây mới (POST)
export const addPlant = async (plant: Omit<Plant, 'id' | 'createdAt' | 'updatedAt' | 'imageUrl'>, imageFile: File | null): Promise<Plant | null> => {
  try {
    const formData = new FormData();
    // Thêm thông tin cây
    formData.append('name', plant.name);
    formData.append('productCode', plant.productCode);
    formData.append('price', plant.price.toString());
    if (plant.shortDescription) formData.append('shortDescription', plant.shortDescription);
    if (plant.description) formData.append('description', plant.description);
    if (plant.scientificName) formData.append('scientificName', plant.scientificName);
    if (plant.commonName) formData.append('commonName', plant.commonName);
    if (plant.heightCm) formData.append('heightCm', plant.heightCm.toString());
    if (plant.widthCm) formData.append('widthCm', plant.widthCm.toString());
    if (plant.humidityMinCm) formData.append('humidityMinCm', plant.humidityMinCm.toString());
    if (plant.humidityMaxCm) formData.append('humidityMaxCm', plant.humidityMaxCm.toString());
    if (plant.difficulty) formData.append('difficulty', plant.difficulty);
    if (plant.wateringMinTimes) formData.append('wateringMinTimes', plant.wateringMinTimes.toString());
    if (plant.wateringMaxTimes) formData.append('wateringMaxTimes', plant.wateringMaxTimes.toString());
    if (plant.careInstructions) formData.append('careInstructions', plant.careInstructions);

    // Thêm file ảnh
    if (imageFile) {
      formData.append('image', imageFile);
    }

    const response = await fetch(API_BASE_URL, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Failed to add plant: ${response.statusText}`);
    }

    const data: Plant = await response.json();
    return data;
  } catch (error) {
    console.error('Error adding plant:', error);
    return null;
  }
};

// Cập nhật cây (PUT)
export const updatePlant = async (id: number, plant: Omit<Plant, 'id' | 'createdAt' | 'updatedAt'>, imageFile: File | null): Promise<Plant | null> => {
  try {
    const formData = new FormData();
    formData.append('name', plant.name);
    formData.append('productCode', plant.productCode);
    formData.append('price', plant.price.toString());
    if (plant.shortDescription) formData.append('shortDescription', plant.shortDescription);
    if (plant.description) formData.append('description', plant.description);
    if (plant.scientificName) formData.append('scientificName', plant.scientificName);
    if (plant.commonName) formData.append('commonName', plant.commonName);
    if (plant.heightCm) formData.append('heightCm', plant.heightCm.toString());
    if (plant.widthCm) formData.append('widthCm', plant.widthCm.toString());
    if (plant.humidityMinCm) formData.append('humidityMinCm', plant.humidityMinCm.toString());
    if (plant.humidityMaxCm) formData.append('humidityMaxCm', plant.humidityMaxCm.toString());
    if (plant.difficulty) formData.append('difficulty', plant.difficulty);
    if (plant.wateringMinTimes) formData.append('wateringMinTimes', plant.wateringMinTimes.toString());
    if (plant.wateringMaxTimes) formData.append('wateringMaxTimes', plant.wateringMaxTimes.toString());
    if (plant.careInstructions) formData.append('careInstructions', plant.careInstructions);

    if (imageFile) {
      formData.append('image', imageFile);
    }

    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: 'PUT',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Failed to update plant: ${response.statusText}`);
    }

    // Fetch lại cây vừa cập nhật
    const updatedPlant = await fetch(`${API_BASE_URL}/${id}`);
    if (!updatedPlant.ok) {
      throw new Error(`Failed to fetch updated plant: ${updatedPlant.statusText}`);
    }

    const data: Plant = await updatedPlant.json();
    return data;
  } catch (error) {
    console.error('Error updating plant:', error);
    return null;
  }
};

// Xóa cây (DELETE)
export const deletePlant = async (id: number): Promise<boolean> => {
  try {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error(`Failed to delete plant: ${response.statusText}`);
    }

    return true; // Xóa thành công
  } catch (error) {
    console.error('Error deleting plant:', error);
    return false; // Nếu có lỗi, trả về false
  }
};