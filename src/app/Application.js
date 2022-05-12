import React from "react";
import PropTypes from 'prop-types';
import { FluxibleComponentContext } from 'fluxible-addons-react';
import { handleHistory } from "fluxible-router";

class Application extends React.Component {
  static propTypes = {
    // props coming from fluxible-router's handleHistory
    currentRoute: PropTypes.object,
    currentNavigateError: PropTypes.shape({
      statusCode: PropTypes.number.isRequired,
      message: PropTypes.string.isRequired
    })
  }

  componentDidMount() {
    window.requestAnimFrame = (() => {
      return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        function (callback) { window.setTimeout(callback, 1000 / 60); };
    })();
  }

  render() {
    const { currentRoute, currentNavigateError, isNavigateComplete } = this.props;
    let Handler = currentRoute && currentRoute.handler;
    const params = currentRoute.params;

    return (
      <div>
        <Handler {...params} />
      </div>
    );
  }
}

Application.contextType = FluxibleComponentContext;

// Wrap with fluxible-router's history handler (required for routing)
// It also pass `currentRoute` as prop to the component
Application = handleHistory(Application);

export default Application;
