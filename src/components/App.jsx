import React,{useRef} from 'react';
import { CssBaseline } from '@mui/material';
import { Routes, Route } from 'react-router-dom';

import Actors from './Actors/Actors';
import NavBar from './NavBar/NavBar';
import MovieInformation from './MovieInfornation/MovieInformation';
import Profile from './Profile/Profile';
import  Movies from './Movies/Movies';
import useStyles from './styles';
import useAlan from './Alan';

const App = () => {
  const classes=useStyles();
  const alanBtnContainer=useRef();
   useAlan();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <NavBar/>
      <main  className={classes.content}>
      <div className={classes.toolbar} />
        <Routes>
           <Route exact path="/movie/:id" element={<MovieInformation />} /> { /*notice: /:id <=> /<number>*/ }
          <Route exact path="/actors/:id" element={<Actors />} />
          <Route exact path="/*" element={<Movies />} /> { /*notice: it's smart to use 'exact'*/ }
          <Route exact path="/approved" element={<Movies />} />
          <Route exact path="/profile/:id" element={<Profile />} />
        </Routes>
      </main>
      <div ref={alanBtnContainer} />
    </div>
  );
};

export default App;
