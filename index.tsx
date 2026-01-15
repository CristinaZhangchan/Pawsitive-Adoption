
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

console.log('✓ Loading application...');

const rootElement = document.getElementById('root');
if (!rootElement) {
  console.error('❌ Root element not found!');
  throw new Error("Could not find root element to mount to");
}

console.log('✓ Root element found');

try {
  const root = ReactDOM.createRoot(rootElement);
  console.log('✓ React root created');

  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );

  console.log('✓ App rendered successfully');
} catch (error) {
  console.error('❌ Error rendering app:', error);
  throw error;
}
