import React from "react";
import { AppBar, Toolbar, Typography } from '@mui/material';
import CarList from './CarList';
import Login from './Login';

function Carfront({isAuthenticated, loginAuth, logoutAuth}){
    return(
        <div>
            <AppBar position='static'>
              <Toolbar>
                  <Typography>
                    Carshop {isAuthenticated ? <span onClick={logoutAuth}>Logout</span> : ""}
                  </Typography>
              </Toolbar>
            </AppBar>
            {isAuthenticated ? <CarList/> : <Login loginAuth={loginAuth}/>}
        </div>
    )
}

export default Carfront;