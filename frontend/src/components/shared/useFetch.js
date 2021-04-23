import React from 'react';
import withLoadingSpinner from '../shared/withLoadingSpinner';

const useFetch = fn => {
  const [response, setResponse] = React.useState([]);
  const [error, setError] = React.useState(null);
  React.useEffect(() => {
    console.log(`
      
      
      
      
      fetch
      
      
      
      
      `);
    const fetchData = async () => {
      console.log('fetchData');
      //   debugger;
      try {
        const res = await fn();
        // debugger;
        console.log('res', res);
        // const json = await res.json();
        console.log(`
        
        
        
        json
        
        
        
        `);
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
