import React,{useState,useEffect,useRef} from 'react';
import './App.css';
import axios from 'axios';
import { Box,List, ListItem, ListItemIcon, ListItemText ,Container,Button} from '@mui/material';
import { CircleRounded,SearchRounded } from '@mui/icons-material';


const default_data=[
  {
    title:"abc"
  },
  {
  title:"bcd"
  }
]
function App() {

  const searchRef=useRef();
   

  const[fetched_data,setData]=useState(default_data);
  const[data_found,setfound]=useState(true);
  const[searchingDone,setSearchingDone]=useState(false);
  const[final_data,setFinalData]=useState(fetched_data);

  
  useEffect(()=>{
  
  axios.get("https://jsonplaceholder.typicode.com/albums").then((res)=>{
    setData(res.data)
  }).catch((err)=>{
    console.log(err);
  })
   
  },[])

  
  const searching=(event)=>{
    event.preventDefault();
    setSearchingDone(true);
    const searched_data=[];
    
    fetched_data.map((data)=>{
     
      if(data.title===searchRef.current.value){
        searched_data.push(data);
      }

    })
    if(searched_data.length===0)
    {
      setfound(false);
    }
    else{
      setFinalData(searched_data);
      setfound(true);
    }
    

  }

  const reload=(event)=>{
    event.preventDefault();
    setSearchingDone(false);
    setFinalData(fetched_data);
    searchRef.current.value="";
  }
  return (
    <Container maxWidth="sm" sx={{bgcolor: '#cfe8fc'}}>
    <Box sx={{ width: '100%', }} >
     <div className='top'>
      <h1 style={{marginLeft:"1rem"}}>List of Albums</h1>
     
      <div className='search_box'>
 
      <input ref={searchRef} style={{height:'1.5rem'}} placeholder='Search' type="text"></input>
      <Button variant="contained" style={{height:'1.7rem'}} onClick={searching}><SearchRounded style={{height:'1.2rem'}} /></Button>
      

      </div>
      <Button  variant="contained"  color="success"  style={{height:"3rem", width:"7rem"}} onClick={reload}>Reload List</Button>
      </div>
      {!searchingDone && fetched_data.map((data,index)=>{
        return <List key={index}>
          <ListItem>
          <ListItemIcon style={{color:'black'}} ><CircleRounded style={{fontSize:'small'}}/></ListItemIcon>
          <ListItemText sx={{color:'indigo', fontSize:'large'}}>{data.title}</ListItemText>
          </ListItem>
         </List>
      })}
      {
        searchingDone && !data_found && <h1>Not found</h1>
      }
      {
        searchingDone && data_found && final_data.map((data,index)=>{
        return <List key={index}>
          <ListItem>
          <ListItemIcon style={{color:'black'}} ><CircleRounded style={{fontSize:'small'}}/></ListItemIcon>
          <ListItemText sx={{color:'indigo', fontSize:'large'}}>{data.title}</ListItemText>
          </ListItem>
         </List>
      })}

    </Box>
    </Container>
  );

    }
export default App;
