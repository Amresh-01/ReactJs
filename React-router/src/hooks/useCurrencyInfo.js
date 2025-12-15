import { useEffect, useState } from "react";
import axios from "axios";

function useCurrencyInfo(currency) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});

  useEffect(() => {
    if (currency) return;
    const fetchCurrency = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://api.exchangerate-api.com/v4/latest/${currency}`
        );
        setData(response.data.rates);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCurrency();
  }, [currency]);

  return { data, loading };
}

export default useCurrencyInfo;
