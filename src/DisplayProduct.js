import { useSelector } from "react-redux";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import {useState} from "react";
import * as React from 'react';
import {TextField, Button} from "@mui/material"
import { useDispatch } from "react-redux";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function DisplayProduct(){

  const [open, setOpen] = React.useState(false);
    const [pid, setPid]= useState("");
    const [pname, setPname]= useState("");
    const [prate, setPrate]= useState("");

    var dispatch= useDispatch();
    
    var products=useSelector(state=>state.product);
    var values=Object.values(products);
    console.log(values)

    const rows=values.map(function(item){
      let pid=item.pid;
      let pname= item.pname;
      let prate=item.prate;
      return {pid, pname, prate}
    })

    const handleClickOpen = (pid, pname, prate) => {
      setPid(pid);
      setPname(pname)
      setPrate(prate)
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const handleClick=()=>{
      dispatch({type:"ADD_DATA",payload:[pid, {pid:pid, pname:pname, prate:prate} ] })
      setOpen(false);
    }

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
          backgroundColor: theme.palette.common.black,
          color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
          fontSize: 14,
        },
      }));
      
      const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
          backgroundColor: theme.palette.action.hover,
        },
        // hide last border
        '&:last-child td, &:last-child th': {
          border: 0,
        },
      }));

      const handleDelete=(pid)=>{
        dispatch({type:"DEL_DATA",payload:[pid, {pid:pid, pname:pname, prate:prate} ] })
      }

return (
    <TableContainer component={Paper} style={{width:"60%", margin:"auto"}}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Product Id</StyledTableCell>
            <StyledTableCell align="center">Product Name</StyledTableCell>
            <StyledTableCell align="center">Product Rate</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.pid}>
              <StyledTableCell component="th" scope="row" align="left" style={{fontSize:25}}>
                <i className="far fa-edit" onClick={()=>handleClickOpen(row.pid, row.pname, row.prate)} style={{margin:10,  cursor:"pointer"}}></i> 
                
                <i style={{margin:10, cursor:"pointer"}} onClick={()=>handleDelete(row.pid)} className="fas fa-trash"></i>{row.pid}
              </StyledTableCell>
              <StyledTableCell align="center" style={{fontSize:25}}>{row.pname}</StyledTableCell>
              <StyledTableCell align="center" style={{fontSize:25}}>{row.prate}</StyledTableCell>
            </StyledTableRow>
          ))}

          <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Update Product Data"}</DialogTitle>
        <DialogContent>

          <TextField label="Product name" value={pname} variant="outlined" onChange={(event)=>setPname(event.currentTarget.value)} style={{margin:20, width:"90%"}} ></TextField>
          <TextField label="Product Rate" variant="outlined" value={prate} onChange={(event)=>setPrate(event.currentTarget.value)} style={{margin:20, width:"90%"}}></TextField>
          
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClick}>Update</Button>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>

        </TableBody>
      </Table>
    </TableContainer>
  );
}