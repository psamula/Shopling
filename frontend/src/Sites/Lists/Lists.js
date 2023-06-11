import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import "./Lists.css";
import theme from '../../theme';
import RecipeCard from '../../Components/ShopBox/shopbox';
import { Button } from '@mui/material';


export default function Lists() {
  
  return (
    <ThemeProvider theme={theme}>
    <div className='Mad'>
    <div className='Lists'>
      <RecipeCard title="Daily Shopping" ingredientCount={10} />
      <RecipeCard title="Spaghetti for my Wife <3 " ingredientCount={8} />
    </div>
    <Button className="orgbtn" variant="contained" color="primary" href="/list">Add List</Button>
    </div>
    </ThemeProvider>
  );
}