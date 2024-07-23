import UsersTable from "../Components/UsersTable";
import Signup from "../Components/Signup";
import { Box } from "@mui/material";
import Axios from "axios";
import { useState, useEffect } from "react";

const Admin = () => {
    const [users, setUsers] = useState([]);
    const [submitted, setSubmitted] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    useEffect(() => {
        getUser();
    }, []);

    const getUser = () => {
        Axios.get('https://helthlabback.vercel.app/api/router_login/users')
            .then(response => {
                setUsers(response?.data?.response || []);
            })
            .catch(error => {
                console.error("Axios Error:", error);
            });
    }

    const addUser = (data) => {
        const payload = {
            fullname: data.fullname,
            email: data.email,
            address: data.address,
            nationalID: data.nationalID,
            role: data.role,
            username: data.username,
            password: data.password
        };
        Axios.post('https://helthlabback.vercel.app/api/router_login/createuser', payload)
            .then(() => {
                getUser();
                setSubmitted(false);
                setIsEdit(false);
            })
            .catch(error => {
                console.error("Axios Error:", error);
            });
    }

    const updateUser = (data) => {
        setSubmitted(true);
        const payload = {
            id: data.id,
            fullname: data.fullname,
            email: data.email,
            address: data.address,
            nationalID: data.nationalID,
            role: data.role,
            username: data.username,
            password: data.password
        };
        Axios.post('https://helthlabback.vercel.app/api/router_login/updateuser', payload)
            .then(() => {
                getUser();
                setSubmitted(false);
                setIsEdit(false);
            })
            .catch(error => {
                console.error("Axios Error:", error);
            });
    }

    const deleteUser = (id) => {
        Axios.post('https://helthlabback.vercel.app/api/router_login/deleteuser', { id })
            .then(() => {
                getUser();
            })
            .catch(error => {
                console.error("Axios Error:", error);
            });
    }

    return (
        <Box
            sx={{
                width: 'calc(100% - 80px)',
                margin: 'auto',
                marginTop: '100px'
            }}>
            <Signup
                addUser={addUser}
                updateUser={updateUser}
                deleteUser={deleteUser}
                submitted={submitted}
                data={selectedUser}
                isEdit={isEdit}
            />
            <UsersTable
                rows={users}
                selectedUser={data => {
                    setSelectedUser(data);
                    setIsEdit(true);
                }}
                deleteUser={data => window.confirm('Are You Sure?') && deleteUser(data)}
            />
        </Box>
    );
}

export default Admin;
