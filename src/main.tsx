import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { routes } from './route';
import type { TRoute } from './route';
import { store } from './stores';
import { Provider } from "react-redux";

import './index.scss'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <div className="app">
          <Router>
            <Routes>
              {routes.map((route: TRoute) => 
                <Route key={route.path} path={route.path} Component={route.component} />
              )}
            </Routes> 
          </Router>  
        </div>
    </Provider>
  </React.StrictMode>,
)
