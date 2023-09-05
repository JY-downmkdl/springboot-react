import './App.css';
import { useEffect, useState } from 'react';
import Carfront from './components/Carfront';
import { Route, Routes } from 'react-router-dom';
import Tour from './components/Tour';

function App() {
  //로그인 유무 체크하기
  // false : 로그인 안 되어 있는 상태
  const [isAuthenticated, setAuth] = useState(false);
  const loginAuth = () => {
    setAuth(true);
  }
  const logoutAuth = () => {
    setAuth(false);
    //토큰도 덩달아 지워주어야 한다.
    sessionStorage.removeItem("jwt");
  }

  //마운트시 실행
  useEffect(()=>{
    //만약 토큰이 있으면 트루로 바꾸기 
    if(sessionStorage.getItem("jwt")){
      setAuth(true);
    }
  },[])

  return (
    <div className="App">
      <Routes>
        <Route path="/"
          element={
            <Carfront
              isAuthenticated={isAuthenticated}
              loginAuth={loginAuth}
              logoutAuth={logoutAuth}/>
          }>
        </Route>
        <Route path="/tour"
          element={
            <Tour/>
          }>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
