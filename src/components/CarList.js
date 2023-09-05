import React, { useEffect, useState } from "react";
import { SERVER_URL } from "../constants";
import { DataGrid } from "@mui/x-data-grid";
import AddCar from "./AddCar";
import EditCar from "./EditCar";
import { Button, Stack } from "@mui/material";

function CarList(){
    const[cars, setCars] = useState([]);
    //마운트 될 때 데이터 요청하기
    //useEffect : 마운트 될 때 실행
    //useEffect(()=>{},[연관배열]) --> 연관배열 업뎃시 실행/ 빈 배열 넣으면 마운트 될 때마다 실행
    useEffect(()=>{
        fetchCar();
        //함수로 분리시킴
    },[cars])

    
    //칼럼 만들기
    const columns = [
        {field : "brand", headerName:"Brand", width: 200},
        {field : "model", headerName:"Model", width: 200},
        {field : "color", headerName:"Color", width: 200},
        {field : "year", headerName:"Year", width: 200},
        {field : "price", headerName:"Price", width: 200},

        //수정버튼 생성하기
        {
            field: "_links.self.href", 
            headerName:"", 
            sorttable:false,
            filterable:false,
            //row 데이터도 전달하기
            //수정하기 만든 후 수정하기 함수도 전달하기
            renderCell: row => <EditCar data={row} updateCar={updateCar}/>
        },

        //renderCell
        {
            field: "_links.car.href", 
            headerName:"", 
            sorttable: false, 
            filterable:false, 
            renderCell: row => <Button onClick={()=>onDelete(row.id)}>삭제</Button>
        }

    ]
    
    //삭제 요청할 때 사용 위한 목록 요청 함수
    //useEffect 쓰면 마운트 될때만 되니까
    const fetchCar = () =>{
        //fetch 요청하기
        //스프링 부트 경로로  get 요청하기

        //(src > constans.js >)SERVER_URL : http://localhost:8010/
        fetch(`${SERVER_URL}api/cars`, {
            // 이제 요청시 토큰을 가지고 간다. 세션 스토리지에 저장해둔 토큰을 가지고 오ㅏ서 사용한다.
            headers : {"Authorization" : sessionStorage.getItem("jwt")}
        })
        .then(response => response.json())
        .then(data => setCars(data._embedded.cars))
        .catch(e => console.log(e));

        //이거 대신에 async로 요청ㅅ해도 된다
    }
    //삭제요청하기
    const onDelete = (url)=>{
        if(window.confirm("정말 삭제하시겠습니까?")){
            fetch(url, {
                method:"DELETE",
                headers : {"Authorization" : sessionStorage.getItem("jwt")}
            })
            .then(response => {
                //다시 목록을 가지고 오기 전 문구 띄우기
                //삭제되었습니다.
                if(response.ok){
                    window.alert("삭제되었습니다.");
                    fetchCar()
                }
                else{window.alert("삭제에 실패하였습니다.")}
            })
            .catch(e=>console.log(e));
        };
    }
    
    //수정요청하기
    const updateCar =(car, link) =>{
        fetch(link, {
            method:"PUT",
            headers: {
                "Content-Type" : "application/json",
                "Authorization" : sessionStorage.getItem("jwt")
            },
            body: JSON.stringify(car)
        })
        .then(response => {
            if(response.ok){
                alert("수정되었습니다");
                fetchCar();
            }
            else{
                alert("수정에 실패했습니다.")
            }
        })
        .catch(e=> console.log(e));
    }

    //세이브 버튼 클릭 : 추가하기 전송
    const addCar = (car) =>{
        fetch(SERVER_URL + "api/cars", {
            method: "POST",
            headers: {
                "Content-Type":"application/json",
                "Authorization" : sessionStorage.getItem("jwt")
            },
            //car 객체를 json 타입으로 직렬화
            //JSON.stringify(obj)
            body: JSON.stringify(car)
        })
        .then(response => {
            if(response.ok){
                alert("등록되었습니다");
                fetchCar();
            }
            else{
                alert("등록에 실패하였습니다");
            }
        })
        .catch(e => console.log(e));
    }
    return(
        <div>
            {/* mt : margin-top, mb : margin-bottom */}
            <Stack mt={4} mb={4}>
                <AddCar addCar={addCar}/>
            </Stack>
            <div style={{width: 1200, margin:"0 auto"}}>
                <DataGrid rows={cars} columns={columns} getRowId={row=>row._links.self.href}/>
            </div>
            {/* <table>
                <tbody>
                    {
                        //자바스크립트 구문 시작 : {}
                        cars.map((car,index)=>
                            <tr key={index}>
                                <td>{car.brand}</td>
                                <td>{car.color}</td>
                                <td>{car.year}</td>
                                <td>{car.price}</td>
                            </tr>
                        )
                    }
                </tbody>
            </table> */}
        </div>
    )
}

export default CarList;