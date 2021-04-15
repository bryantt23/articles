import React from 'react';
function withLoadingSpinner(WrappedComponent) {
  return class extends React.Component {
    render() {
      if (!this.props.data) {
        return (
          <div>
            This is the spinner
            https://blog.jakoblind.no/real-world-higher-order-components-hocs/
          </div>
        );
      } else {
        return <WrappedComponent {...this.props} />;
      }
    }
  };
}

export default withLoadingSpinner;
