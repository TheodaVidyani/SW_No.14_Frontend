import {Box} from "@mui/material";
import SigninForm from "./Signin";
import UserTabel from "./UsersTable";
import Axios from "axios";
import { useEffect, useState} from "react";
//comment
const Users = () => {
    // const [users, setUsers] = useState([]);

    useEffect (() =>{
        getUsers();
    }, []);
    const getUsers = () => {
        Axios.get('http://127.0.0.1:3001/api/u')
        .then(response => {
            console.log(response);
        })
    }
    return (
        <Box
        sx={{
            width: 'calc (100% - 100px)',
            margin: 'auto',
            marginTop:'100px',
        }}
        >
            <SigninForm/>
            <UserTabel rows ={users}/>
        </Box>
    );
}

export default Users;