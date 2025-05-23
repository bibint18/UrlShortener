import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './redux/store';
import { Navbar } from './components/common/Navbar';
import { AppRoutes } from './routes/AppRoutes';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={<div className="min-h-screen flex items-center justify-center">Loading...</div>} persistor={persistor}>
        <div className="min-h-screen bg-gray-100">
          <Navbar />
          <AppRoutes />
        </div>
      </PersistGate>
    </Provider>
  );
};

export default App;