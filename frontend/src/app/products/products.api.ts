
export const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export async function getProducts() {
  const response = await fetch(`${BACKEND_URL}/api/products`, {
    cache: "no-store",
  });

  if (!response.ok) {
    console.error('Failed to fetch products:', response.statusText);
    return []; // Retorna un array vacío en caso de error
  }

  const data = await response.json();
  return Array.isArray(data) ? data : []; // Asegúrate de que sea un array
}

export async function getProduct(id: string) {
  const data = await fetch(`${BACKEND_URL}/api/products/${id}`, {
    cache: "no-store",
  });
  return await data.json();
}

export async function createProduct(productData: any) {
  const res = await fetch(`${BACKEND_URL}/api/products`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(productData),
  });
  const data = await res.json();
  console.log(data);
}

export async function deleteProduct(id: string) {
  const res = await fetch(`${BACKEND_URL}/api/products/${id}`, {
    method: "DELETE",
  });
  return await res.json();
}

export async function updateProduct(id: string, newProduct: any) {
  const res = await fetch(`${BACKEND_URL}/api/products/${id}`, {
    method: "PATCH",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newProduct),
    cache: 'no-store'
  });
  return await res.json();
}