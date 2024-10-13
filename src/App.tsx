import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';  // Home component for listing articles
import Article from './components/Article';  // Article component to display a single article
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App: React.FC = () => {
  return (
    <Router basename="/react-app-test-crud-api-app">
      <Router>
        <ToastContainer />
        {/* Home route (displays list of articles) */}
        <Route path="/" element={<Home />} />

        {/* Dynamic route for individual articles */}
        <Route path="/articles/:id" element={<Article />} />
      </Routes>
    </Router>
  );
};

export default App;
