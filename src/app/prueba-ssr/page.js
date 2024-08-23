import Image from 'next/image';

async function fetchProducts() {
  const res = await fetch('https://dummyjson.com/products');
  if (!res.ok) {
    throw new Error('Failed to fetch products');
  }
  const data = await res.json();
  return data.products;
}

export default async function Page() {
  const products = await fetchProducts();

  return (
    <>
      <ul>
        {products.map(product => (
          <li key={product.id} className="py-20 text-center">
            <Image
              src={product.thumbnail}
              alt={product.title}
              width={200}
              height={200}
              className="mx-auto"
            />
            <b>{product.title}:</b> {product.price} € (descuento {product.discountPercentage}%)
            =&gt; {(product.price * (1 - product.discountPercentage / 100)).toFixed(2)} €
          </li>
        ))}
      </ul>
    </>
  );
}
