import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import React, { useState } from "react";


//fetchcar 받아오기 from CarList
function AddCar({addCar}) {
    //상태 만들기
    //기본값은 false
    const [open, setOpen] = useState(false);
    const handleOpen = () =>{
        setOpen(true);
    }
    const handleClose = () =>{
        setOpen(false);
        //인풋 창이 닫히면 초기화
        setCar({
            brand:"",
            model:"",
            color:"",
            year: "",
            price:""
        })
    }

    //인풋 입력값 상태 관리하기
    const [car, setCar] = useState({
        brand:"",
        model:"",
        color:"",
        year: "",
        price:""
   });
   
   //인풋값 받아서 setCar하기
   const handleChange = (e) =>{
        setCar({
            ...car,
            [e.target.name]: e.target.value
        });
   }

   const handleSave = () =>{
        addCar(car);
        handleClose();
   }
   
    return(
        <div>
            <Button variant="contained" onClick={handleOpen}>New Car</Button>
            <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description" maxWidth="sm" fullWidth={true}>

            {/* 다이얼로그 안에 타이틀과 콘텐츠 넣어주기 */}
            <DialogTitle>New Car</DialogTitle>
            <DialogContent>
                <input placeholder="Brand" name="brand"
                value={car.brand} onChange={handleChange} style={{width: "90%", padding:"10px", margin:"6px"}}/>
                <br/>
                <input placeholder="Model" name="model"
                value={car.model} onChange={handleChange} style={{width: "90%", padding:"10px", margin:"6px"}}/>
                <br/>
                <input placeholder="Color" name="color"
                value={car.color} onChange={handleChange} style={{width: "90%", padding:"10px", margin:"6px"}}/>
                <br/>
                <input placeholder="Year" name="year"
                value={car.year} onChange={handleChange} style={{width: "90%", padding:"10px", margin:"6px"}}/>
                <br/>
                <input placeholder="Price" name="price"
                value={car.price} onChange={handleChange} style={{width: "90%", padding:"10px", margin:"6px"}}/>
                <br/>

            </DialogContent>

            {/* 작성 취소 및 저장 버튼 생성 */}
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleSave}>Save</Button>
            </DialogActions>
            </Dialog>

        </div>
    )
}

export default AddCar;