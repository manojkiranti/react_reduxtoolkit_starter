import { AppRoutes } from './routes';
import AppProvider from './providers/app';
import { Provider } from 'react-redux';
import { store } from './store';
import AuthListener from './components/Auth/AuthListener';


function App() {
  return (
    <AppProvider>
      <Provider store={store}>
        <AuthListener />
        <AppRoutes />
      </Provider>
    </AppProvider>
  );
}

export default App;
