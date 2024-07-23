import React, { useEffect, useState } from 'react';
import { Box, Container, Grid, Paper } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import Axios from 'axios'; 
import Patienthead from '../Components/Patienthead';
import Footer from '../Components/Footer'; 
import UsersTable from "./UsersTable";
import UserForm from './UserForm';  // Import UserForm
import SearchUserForm from './SearchUserForm';  // Import SearchUserForm
import backgroundImage from '../images/2.png';  // Import the background image


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
        Axios.get('https://healthlabback-git-vercelback-bytebuzzers-projects.vercel.app/api/testing-users')
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
    
        Axios.post('https://healthlabback-git-vercelback-bytebuzzers-projects.vercel.app/api/create-testing-user', payload)
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

        Axios.post('https://healthlabback-git-vercelback-bytebuzzers-projects.vercel.app/api/update-testing-user', payload)
        .then(() => {
            getUsers();
            setSubmitted(false);
        })
        .catch(error => {
            console.error("Axios Error : ", error);
        });
    };

    const deleteUser = (data) => {
        Axios.delete('https://healthlabback-git-vercelback-bytebuzzers-projects.vercel.app/api/delete-testing-user', { data })
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
            <Box sx={{
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                minHeight: '100vh',
            }}>
            <Patienthead /> {/* Include the Head component here */}
            <Container maxWidth="lg" sx={{ mt: 2, mb: 2 }}>
                <Grid container spacing={2}>
                            <UserForm 
                                addUser={addUser}
                                updateUser={updateUser}
                                submitted={submitted}
                                data={selectedUser}
                                isEdit={isEdit}
                            />
                            <SearchUserForm onSearch={handleSearch} />
                            <UsersTable 
                                rows={filteredUsers} 
                                selectedUser={data => {
                                    setSelectedUser(data);
                                    setIsEdit(true);
                                }}
                                deleteUser={data => window.confirm('Are you sure?') && deleteUser(data)}
                            />
                </Grid>
            </Container>
            <Footer />
        </Box>
    );
}

export default Users;