import React from 'react';
import './loading.css';

function withLoadingSpinner(WrappedComponent) {
  return function (props) {
    if (!props.data) {
      return <div className='loader'></div>;
    } else {
      return <WrappedComponent {...props} />;
    }
  };
}

export default withLoadingSpinner;
