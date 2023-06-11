import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import "./List.css";
import theme from '../../theme';
import { Button } from '@mui/material';
import CheckboxList from '../../Components/CheckboxList/CheckboxList';

export default function List() {
  const myList = [
    { id: 1, text: "Item 1" },
    { id: 2, text: "Item 2" },
    { id: 3, text: "Item 3" },
  ];
  return (
    <ThemeProvider theme={theme}>
      <div className='cen'>
    <div className='Lists1'>
    <CheckboxList list={myList} />
    </div>
    <Button className="orgbtn2" variant="contained" color="primary" href="/lists">Back</Button>
    </div>
    </ThemeProvider>
  );
}