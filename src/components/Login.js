import React, { useState } from "react";
import { SERVER_URL } from "../constants";
import { Button, Stack, TextField } from "@mui/material";

function Login({loginAuth}) {
    const [user, setUser] = useState({
        username : "",
        password : ""
    })
    const handleChange = (e) => {
        // username/password 변경될때 수정
        setUser({
            ...user,
            [e.target.name] : e.target.value
        })
    }

    //로그인 요청
    //method = post, body = ?, url = http//localhost:8010/login
    const login = () =>{
        fetch(`${SERVER_URL}login`, {
            //옵션넣기
            method : "POST",
            headers : {"Content-Type" : "application/json"},
            body : JSON.stringify(user)
        })
        .then(response => {
            //로그인에 성공하면 jwt를 돌려준다.
            //이를 세션에 넣고 계속 사용해야 로그인 유지가 된다.
            //.headers.get("Authorization") : 헤더에 Authorization를 가져와서 담아준다. 
            const jwtToken = response.headers.get("Authorization");
            if(jwtToken){
                // jwtToken != null 일 경우(=로그인 성공) 세션에 저장
                sessionStorage.setItem("jwt", jwtToken);
                // 로그인 성공시 
                loginAuth();
            }
        })
        .catch(e => console.log(e));
    }

    return(
        <div>
            {/* mt : margin-top 준말 */}
            <Stack spacing={2} alignItems="center" mt={20}>
                {/* 조금 더 이쁜 input , 기능은 input과 똑같다 */}
                <TextField name="username" label="username" onChange={handleChange}/>
                <TextField name='password' label="password" onChange={handleChange}/>

                {/* mui의 버튼 사용하기 */}
                <Button onClick={login}>login</Button>
                <Button>reset</Button>
            </Stack>
        </div>
    )
}

export default Login;