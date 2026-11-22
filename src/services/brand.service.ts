const baseUrl = 'https://ecommerce.routemisr.com';

export async function getAllBrands() {
  try {
    const response = await fetch(`${baseUrl}/api/v1/brands`, {
      cache: 'no-store',
    });
    if (!response.ok) throw new Error(response.statusText);
    const data = await response.json();
    return data;
  } catch (error) {
    return { data: [] };
  }
}

export async function getSpecificBrand(brandId: string) {
  try {
    const response = await fetch(`${baseUrl}/api/v1/brands/${brandId}`, {
      cache: 'no-store',
    });
    if (!response.ok) throw new Error(response.statusText);
    const data = await response.json();
    return data;
  } catch (error) {
    return { data: null };
  }
}
