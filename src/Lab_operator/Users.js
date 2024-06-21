import React, { useEffect, useState } from 'react';
import { Box, Container, Grid, Paper } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import Axios from 'axios'; 
import Head from "../Head"; 
import Footer from '../Footer';
import UsersTable from "./UsersTable";
import UserForm from './UserForm';  // Import UserForm
import SearchUserForm from './SearchUserForm';  // Import SearchUserForm

const Users = () => {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [submitted, setSubmitted] = useState(false); 
    const [isEdit, setIsEdit] = useState(false);
    const [selectedUser, setSelectedUser] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        getUsers();
    }, []);

    const getUsers = () => {
        Axios.get('http://localhost:3100/api/testing-users')
            .then(response => {
                setUsers(response.data?.response || []);
                setFilteredUsers(response.data?.response || []);
            })
            .catch(error => {
                console.error("Error fetching users:", error);
            });
    };

    const addUser = (data) => {
        const payload = {
            id: data.id,
            name: data.name,
            test: data.test,
            test_tubes: data.test_tubes,
            test_tube_id: data.test_tube_id,
            blood_type: data.blood_type,
        };
    
        console.log('Payload:', payload); // Log payload data
    
        Axios.post('http://localhost:3100/api/create-testing-user', payload)
        .then(() => {
            getUsers();
            setSubmitted(false);
            setIsEdit(false);
        })
        .catch(error => {
            console.error("Axios Error : ", error);
        });
    };

    const updateUser = (data) => {
        setSubmitted(true);

        const payload = {
            id: data.id,
            name: data.name,
            test: data.test,
            test_tubes: data.test_tubes,
            test_tube_id: data.test_tube_id,
            blood_type: data.blood_type,
        };

        Axios.post('http://localhost:3100/api/update-testing-user', payload)
        .then(() => {
            getUsers();
            setSubmitted(false);
        })
        .catch(error => {
            console.error("Axios Error : ", error);
        });
    };

    const deleteUser = (data) => {
        Axios.delete('http://localhost:3100/api/delete-testing-user', { data })
        .then(() => {
            getUsers();
        })
        .catch(error => {
            console.error("Axios Error : ", error);
        });
    };

    const handleSearch = (searchTerm) => {
        const lowerCaseSearchTerm = searchTerm.toLowerCase();
        const filtered = users.filter(user =>
            String(user.id).toLowerCase().includes(lowerCaseSearchTerm) ||
            String(user.name).toLowerCase().includes(lowerCaseSearchTerm) ||
            String(user.test).toLowerCase().includes(lowerCaseSearchTerm)
        );
        setFilteredUsers(filtered);
    };

    return (
        <Box>
            <Head /> {/* Include the Head component here */}
            <Container maxWidth="lg" sx={{ mt: 2, mb: 2 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Paper elevation={3} sx={{ p: 2 }}>
                            <UserForm 
                                addUser={addUser}
                                updateUser={updateUser}
                                submitted={submitted}
                                data={selectedUser}
                                isEdit={isEdit}
                            />
                        </Paper>
                    </Grid>
                    <Grid item xs={12}>
                        <Paper elevation={3} sx={{ p: 2 }}>
                            <SearchUserForm onSearch={handleSearch} />
                        </Paper>
                    </Grid>
                    <Grid item xs={12}>
                        <Paper elevation={3} sx={{ p: 2 }}>
                            <UsersTable 
                                rows={filteredUsers} 
                                selectedUser={data => {
                                    setSelectedUser(data);
                                    setIsEdit(true);
                                }}
                                deleteUser={data => window.confirm('Are you sure?') && deleteUser(data)}
                            />
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
            <Footer />
        </Box>
    );
}

export default Users;
