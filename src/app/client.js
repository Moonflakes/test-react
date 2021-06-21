import React from "react";
import ReactDOM from "react-dom";
import { AppContainer } from 'react-hot-loader';
import app from "./app";

// Add promise support for browser not supporting it
import es6Promise from "es6-promise";
es6Promise.polyfill();

let componentContext;
const render = () => {
  const container = document.getElementById("root");
  const Application = app.getComponent();

  ReactDOM.unmountComponentAtNode(container);
  ReactDOM.hydrate(
    <AppContainer>
      <Application context={componentContext} />
    </AppContainer>,
    container
  );
};

app.rehydrate(window.App, (err, context) => {
  if (err)
    throw err;

  componentContext = context.getComponentContext();
  render();

  if (module.hot) {
    render();
  }
});

if (module.hot) {
  module.hot.accept('./app', () => {
    render();
  });
}