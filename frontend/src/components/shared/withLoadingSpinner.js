import React from 'react';
import './loading.css';

function withLoadingSpinner(WrappedComponent) {
  return class extends React.Component {
    render() {
      if (!this.props.data) {
        return <div className='loader'></div>;
      } else {
        return <WrappedComponent {...this.props} />;
      }
    }
  };
}

export default withLoadingSpinner;
