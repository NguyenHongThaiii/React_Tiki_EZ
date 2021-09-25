import { useEffect, useState } from 'react';
import productApi from './../../../API/productApi';
export default function useDetailPage(productId) {
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const result = await productApi.get(productId);
        setProduct(result);
      } catch (error) {
        console.log('failed to fetch product: ', error);
      }
      setLoading(false);
    })();
  }, [productId]);
  return { product, loading };
}
