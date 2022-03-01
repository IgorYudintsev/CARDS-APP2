import React from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import {Profile} from "./pages/Profile";
import {Register} from "./pages/Register";
import {Login} from "./pages/Login";
import {ForgotPassword} from "./pages/ForgotPassword";
import {NewPassword} from "./pages/NewPassword";
import {Coloda} from "./pages/Coloda";
import {MyCards} from "./pages/MyCards";

export const Body = () => {
    return (
        <div>
            <Routes>
                <Route path={'/'} element={<Profile/>}/>

                {/*//Раньше path={'/myCards'} , а теперь path={'/myCards/:id'}*/}
                {/*<Route path={'/myCards'} element={<MyCards/>}/>*/}
                <Route path={'/myCards/:id'} element={<MyCards/>}/>
                {/*//точно также мы работали с токеном*/}
                <Route path={'/newPas/:token'} element={<NewPassword/>}/>

                <Route path={'/coloda'} element={<Coloda/>}/>
                <Route path={'/register'} element={<Register/>}/>
                <Route path={'/login'} element={<Login/>}/>
                <Route path={'/forgotPassword'} element={<ForgotPassword/>}/>

                {/*<Route path={'/newPas/*'} element={<NewPassword/>}/>*/}
                <Route path={'/404'} element={<h1 style={{textAlign: 'center'}}>404:PAGE NOT FOUND</h1>}/>
                <Route path={'*'} element={<Navigate to={'/404'}/>}/>
            </Routes>
        </div>
    );
};

