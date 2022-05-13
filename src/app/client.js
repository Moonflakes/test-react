import React from "react";
import ReactDOM from "react-dom";
import { FluxibleProvider } from 'fluxible-addons-react';

import app from "./app";

// Add promise support for browser not supporting it
import es6Promise from "es6-promise";
es6Promise.polyfill();

let componentContext;
const render = () => {
  const container = document.getElementById("root");
  const Application = app.getComponent();

  ReactDOM.unmountComponentAtNode(container);
  module.hot ? ReactDOM.render(
    <FluxibleProvider context={componentContext}>
      <Application />
    </FluxibleProvider>,
    container
  ) : ReactDOM.hydrate(
    <FluxibleProvider context={componentContext}>
      <Application />
    </FluxibleProvider>,
    container
  );
};

app.rehydrate(window.App, (err, context) => {
  if (err)
    throw err;

  componentContext = context.getComponentContext();
  render();
});

if (module.hot) {
  module.hot.accept('./app', () => {
    render();
  });
}