import React, { useState } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";

function EditCar({data, updateCar}) {
    //상태 함수
    const [open, setOpen] = useState(false);
    const [car, setCar] = useState({
        brand: data.row.brand,
        model: data.row.model,
        color: data.row.color,
        year: data.row.year,
        price:data.row.price,
   });
   

    const handleClose = () =>{
        setOpen(false);
    }
    const handleOpen= () =>{
        setOpen(true);
    }
    const handleChange= (e) =>{
        setCar({
            ...car,
            [e.target.name] :  e.target.value
        })
    }

    //자동차 업데이트 하고 모달폼 받기
    const handleSave = () => {
        updateCar(car, data.id);
        handleClose();
    }

    return(
        <div>
            <Button onClick={handleOpen}>Edit Car</Button>
            <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description" maxWidth="sm" fullWidth={true}>

            {/* 다이얼로그 안에 타이틀과 콘텐츠 넣어주기 */}
            <DialogTitle>Edit Car</DialogTitle>
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

    );
}
export default EditCar;