import logo from './logo + name.svg';
import './Start.css';
import { Button } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../../theme';

function Start() {
  return (
    <ThemeProvider theme={theme}>
    <div className="App">
      <img src={logo}></img>
      <div className='text'>
      Save your time and memory!
      </div>
      <Button className="orgbtn1" variant="contained" color="primary" href="/login">Start</Button>
    </div>
    </ThemeProvider>
  );
}

export default Start;