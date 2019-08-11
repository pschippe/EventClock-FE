import React from "react";
import ReactDom from "react-dom";
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import logger from 'redux-logger';
import App from "./App";
import "./styles.scss";



// ========================================

ReactDom.render(<App />, document.getElementById("root"));
