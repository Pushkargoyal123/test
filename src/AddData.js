import { useState } from "react";
import {TextField, Button} from "@mui/material"
import { useDispatch } from "react-redux";

export default function AddData(props){

    const [pid, setPid]= useState("");
    const [pname, setPname]= useState("");
    const [prate, setPrate]= useState("");

    var dispatch= useDispatch();

    const handleDisplay=()=>{
        
        props.history.push({pathname:"/display"});
    }

    const handleClick=()=>{
        dispatch({type:"ADD_DATA",payload:[pid, {pid:pid, pname:pname, prate:prate} ] })
    }

    return(<div style={{display:"flex",flexDirection:"column", width:600, margin:"auto"}}>
        <TextField label="Product-ID" value={pid} variant="outlined" onChange={(event)=>setPid(event.currentTarget.value)} style={{margin:20}}></TextField>
        <TextField label="Product name" value={pname} variant="outlined" onChange={(event)=>setPname(event.currentTarget.value)} style={{margin:20}} ></TextField>
        <TextField label="Product Rate" variant="outlined" value={prate} onChange={(event)=>setPrate(event.currentTarget.value)} style={{margin:20}}></TextField>
        <div style={{display:"flex"}}>
            <Button variant="contained" color="primary" style={{margin:10}} onClick={handleClick}>Submit</Button>
            <Button variant="contained" color="primary" style={{margin:10}} onClick={handleDisplay}>Display</Button>
        </div>
    </div>)
}