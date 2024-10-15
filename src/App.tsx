import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/Home';  // Home component for listing articles
import ArticlePage from './pages/Article';  // Article component to display a single article

const Test = () => {
  return <div>Test...</div>
}

const App: React.FC = () => {
  return (
    <Routes>
        {/* Home route (displays list of articles) */}
        <Route path="/" element={<HomePage />} />

        {/* Dynamic route for individual articles */}
        <Route path="/articles/:id" element={<ArticlePage />} />
        <Route path="/test" element={<Test />} />
      </Routes>
  );
};

export default App;
