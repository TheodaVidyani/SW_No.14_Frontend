import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button } from '@mui/material';
import { useNavigate } from "react-router-dom";





const Record = (props) => {

  
const navigate = useNavigate();
  
  const HandleGenerate = (record) => {
    // Pass the record to the new page
    // <ReportUI   record={record} />
    
    navigate('/ReportUI', { state: { record } });
  };



  // // Now you can access the record data in ReportUI component
  
  // const Record = (props) => {
  //   return (
  //     <TableRow>
  //       <TableCell>{props.record._id} </TableCell>
  //       <TableCell>{props.record.nationalID}</TableCell>
  //       <TableCell>{props.record.fullname}</TableCell>
  //       <TableCell>
  //         <Button variant="contained" color="primary" onClick={() => HandleGenerate(props.record)}>
  //           Generate
  //         </Button>
  //       </TableCell>
  //     </TableRow>
  //   );
  // };

    
  

  return (

    <TableRow>
      <TableCell>{props.record.id} </TableCell>
      <TableCell>{props.record.pname}</TableCell>
      <TableCell>{props.record.pid}</TableCell>

      <TableCell>
        <Button variant="contained" color="primary" onClick={() => HandleGenerate(props.record)}>
          Generate
        </Button>
      </TableCell>
    </TableRow>
  );
};



export default function RecordeList() {
  const [records, setRecords] = useState([]);

  // get the records from the database


    useEffect(() => {
    async function getRecords() {
      const response = await fetch(`http://localhost:3100/api/appointments`);
      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }
      const records = await response.json();
      setRecords(records.response);
    }
    getRecords();
    return;
  }, [records.length]);




  // get individual record and map for render

  function RenderRecordList() {
    return records.map((record)=>{
return(
  <Record
  record = {record} />
)
    })
  }


// render the list of records

  return (
    <TableContainer sx={{display: 'flex', padding:'100px' }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ReportID </TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Pation ID</TableCell>
            <TableCell>Vive report</TableCell>
          </TableRow>
        </TableHead>


        <TableBody>
        {RenderRecordList()}
      
        </TableBody>
      </Table>
    </TableContainer>
  );
};

// Hard-coded sample data



