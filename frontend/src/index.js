import React from "react";
import ReactDOM  from "react-dom/client";
import App from "./App";
import store from './app/store'
import { Provider } from 'react-redux'

const element = document.getElementById('root');
const root = ReactDOM.createRoot(element);

root.render(
<Provider store={store}>
    <App/>
</Provider>
)