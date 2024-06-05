import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { routes } from './route';
import type { TRoute } from './route';

import './index.scss'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <div className="app">
        <Router>
          <Routes>
            {routes.map((route: TRoute) => 
              <Route key={route.path} path={route.path} Component={route.component} />
            )}
          </Routes> 
        </Router>  
      </div>
  </React.StrictMode>,
)
