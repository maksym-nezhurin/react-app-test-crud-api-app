import React from 'react';

import ArticleList from "../components/ArticleList";
import ImageGenerator from "../components/ImageGenerator";

const Home: React.FC = () => {
  return (
      <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
        <div className="flex gap-4">
          <ArticleList />

          <ImageGenerator />
        </div>
      </div>
  );
};

export default Home;
