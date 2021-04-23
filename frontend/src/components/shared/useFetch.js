import React from 'react';

const useFetch = fn => {
  const [response, setResponse] = React.useState([]);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fn();
        setResponse({ data: res });
      } catch (error) {
        setError(error);
      }
    };
    fetchData();
  }, []);
  return { loader: <div className='loader'></div>, response, error };
};

export default useFetch;
