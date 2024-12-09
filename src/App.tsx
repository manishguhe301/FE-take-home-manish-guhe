import React from 'react';
import Header from './components/Header';
import './App.css';
import FetchContentSection from './FetchContentSection';

const App: React.FC = () => {
  return (
    <div className='App px-10 bg-[#FAFAFA] h-dvh max-sm:px-5'>
      <Header />
      <FetchContentSection />
    </div>
  );
};

export default App;
