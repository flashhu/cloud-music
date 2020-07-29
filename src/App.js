import React from 'react';
// renderRoutes 读取路由配置转化为Route标签
import { renderRoutes } from 'react-router-config';
import routes from './routes';
import { HashRouter } from 'react-router-dom';
import { GlobalStyle } from './style';
import { IconStyle } from './assets/iconfont/iconfont';
import { Provider } from 'react-redux';
import store from './store';

function App() {
  return (
    <Provider store={store}>
      <HashRouter>
        <GlobalStyle></GlobalStyle>
        <IconStyle></IconStyle>
        { renderRoutes(routes) }
      </HashRouter>
    </Provider>
  );
}

export default App;
