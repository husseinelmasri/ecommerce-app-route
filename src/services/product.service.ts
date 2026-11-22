const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
console.log(baseUrl);

export async function GetAllProducts() {
  const response = await fetch(`${baseUrl}/api/v1/products`);

  const data = await response.json();
  return data;
}

export async function getProductsDetails(productId: string) {
  const response = await fetch(`${baseUrl}/api/v1/products/${productId}`);

  const data = await response.json();
  return data;
}
export async function getProductsByCategory(categoryId: string) {
  try {
    const response = await fetch(
      `https://ecommerce.routemisr.com/api/v1/products?category=${categoryId}`,
      { cache: 'no-store' },
    );
    const data = await response.json();
    return data;
  } catch (error) {
    return { data: [] };
  }
}

export async function getProductsByBrand(brandId: string) {
  try {
    const response = await fetch(`${baseUrl}/api/v1/products`, {
      cache: 'no-store',
    });
    const data = await response.json();

    const filteredProducts = data.data.filter(
      (product: any) => product.brand._id === brandId,
    );

    return { data: filteredProducts };
  } catch (error) {
    console.error('Error filtering products by brand:', error);
    return { data: [] };
  }
}
