const baseUrl = 'https://ecommerce.routemisr.com';

export async function getCategories() {
  try {
    const response = await fetch(`${baseUrl}/api/v1/categories`, {
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const data = await response.json();

    return data;
  } catch (error) {
    return { data: [] };
  }
}

export async function getSpecificCategory(categoryId: string) {
  try {
    const response = await fetch(`${baseUrl}/api/v1/categories/${categoryId}`, {
      cache: 'no-store',
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.log(`API Error ${response.status}:`, errorText);
      throw new Error(response.statusText);
    }
    const data = await response.json();

    return data;
  } catch (error) {
    console.error('Error in getSpecificCategory:', error);
    return { data: null };
  }
}

export async function getSubcategoriesOnCategory(categoryId: string) {
  try {
    const response = await fetch(
      `${baseUrl}/api/v1/categories/${categoryId}/subcategories`,
      { cache: 'no-store' },
    );

    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const data = await response.json();

    return data;
  } catch (error) {
    console.error('Error in getSubcategoriesOnCategory:', error);
    return { data: [] };
  }
}
