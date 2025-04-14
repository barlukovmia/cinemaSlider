import React, { useEffect } from 'react';
import TinderSlider from './components/TinderSlider';

function App() {
    useEffect(() => {
        if (window.Telegram && window.Telegram.WebApp) {
            window.Telegram.WebApp.ready();
            window.Telegram.WebApp.expand();
    }
  }, []);
    return (
        <div style={{overflow: "hidden"}} className="bg-gray-800 text-white min-h-screen flex items-center justify-center">
            <TinderSlider />
        </div>
    );
}

export default App;
