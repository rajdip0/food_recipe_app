import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Recipe from "./components/Recipes";

const App = () => {

  const APP_ID = "your id";
  const APP_KEY = "your key";
  // const example = `https://api.edamam.com/search?q=chicken&app_id=${APP_ID}&app_key=${APP_KEY}`;

  // const [counter, setCounter] = useState(0);
  const [recipes, setRecipes] = useState([]);
  const [search ,setSearch] = useState('');
  const [query, setQuery] = useState('chicken');

  useEffect(() => {

    console.log("effect has been run");
    getRescipes()



  }, [query]);

  const getRescipes = async () => {

    const rep = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
    const data = await rep.json();
    setRecipes(data.hits);
    console.log(data.hits);
  }
  const updateSearch = e=>{
    setSearch(e.target.value);
    console.log(search);  

  }
  const getSearch = e=>{
    e.preventDefault();
    setQuery(search);

  }

  return (
    <div className="App">
      <form onSubmit={getSearch} className="serach-form">
        <input className="search-bar" type="text" value={search} onChange={updateSearch} />
        <button className="search-button" type="submit">
          search
        </button>
      </form>
      <dev className="recipes">
      {
        recipes.map(recipe => (
          <Recipe title={recipe.recipe.label} calories={recipe.recipe.calories} 

          image={recipe.recipe.image}
          ingredients={recipe.recipe.ingredients}
           />

        ))
      }
      </dev>


    </div>
  );

};

export default App;
