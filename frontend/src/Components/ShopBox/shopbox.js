import React from 'react';
import "./shopbox.css"
function RecipeCard({ title, ingredientCount }) {
  return (
    <a href="/list">
    <div className="Box">
      <h2>{title}</h2>
      <p>{`0/${ingredientCount}`}</p>
    </div>
    </a>
  );
}

export default RecipeCard;