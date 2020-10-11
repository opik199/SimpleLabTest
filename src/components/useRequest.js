import React, { useState, useEffect } from 'react';
import axios from 'axios';

const useRequest = (initUrl) => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});

  useEffect(() => {
    let ignore = false;
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await axios(initUrl);
        if (!ignore) setData(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();

    return (() => { ignore = true; });
  }, [initUrl]);

  return { data, loading, error };
};

export default useRequest;