// import React, { useEffect,useState } from "react";
// import {
//   Typography,
//   Paper,
//   Container,
//   Grid,
//   TableContainer,
//   Table,
//   TableHead,
//   TableBody,
//   TableRow,
//   TableCell,
//   Button,
// } from "@mui/material";
// import healthLabLogo from "./Labasisstenceimg/Health lab logo_.png";
// import { useLocation } from "react-router-dom";

// const ReportUI = () => {
//   const location = useLocation();

//   //all test data 
//   const [testsDB, setTestsDB] = useState([]);
//   // appointment data (patiant)
//   const [userData, setUserData] = useState([]);
//   const [results, setResult] = useState([]);
//   const record = location.state.record;
//   const id = record.pid;
// // patient registerd tests
//   const tests = record.selectTests;


// // fetch data from Test database

// useEffect(() => {async function getTestData() {
//   const response = await fetch(`http://localhost:3100/tests`);
//   if (!response.ok) {
//     const message = `An error occurred: ${response.statusText}`;
//     window.alert(message);
//     return;
//   }
//   const testData = await response.json();
//   setTestsDB(testData.response);
//   }
//   getTestData();
//   return;
//   },[]);

//   useEffect(() => {async function getUserDataByID() {
//     const response = await fetch(`http://localhost:3100/api/getuser/${id}`);
//     if (!response.ok) {
//       const message = `An error occurred in user data section : ${response.statusText}`;
//       window.alert(message);

//       return;
//     }
//     const user = await response.json();
//     setUserData(user.user);
//     }
//     getUserDataByID();
//     return;
//     },[id]);


//     useEffect(() => {async function getResult() {
//       const response = await fetch(`http://localhost:3100/api/testresult`);
//       if (!response.ok) {
//         const message = `An error occurred: ${response.statusText}`;
//         window.alert(message);
//         return;
//       }
//       const Results = await response.json();
//       setResult(Results.result);
//       }
//       getResult();
//       return;
//       },[id]);





//   const  tableData =  tests.map((test) =>  (
//     {
      


//     testId: test._id,
//     result: results.find((result) => result.testid === test._id)?.result || "no data",
//     testName: test.testName,
//     min: testsDB.find((dbTest) => dbTest.id === test.testId)?.min || "no data",
//     max: testsDB.find((dbTest) => dbTest.id === test.testId)?.max || "no data",
//     unit: testsDB.find((dbTest) => dbTest.id === test.testId)?.unit || "no data",
//   }))

//   // Test resul page object 

//   // Corrected version

// // Ensure userData and userData.nationalID are defined
// const birthYear = userData && userData.nationalID ? parseInt(userData.nationalID.substring(0, 4)) : null;
// const currentYear = new Date().getFullYear();
// const age = birthYear ? currentYear - birthYear : "no data";

// const reportDetails = {
//   patientName: record.pname,
//   PatientAge: age,
//   PatientSex: "Mail",
//   PatientID: record._id,
//   RegisteredOn: record.regdate.split("T")[0],
//   CollectedOn: "02.31pm 02 December",
//   ReportedOn: "02.31 December 2022",
//   LabTechnician: "Medical Lab Technetion",
//   Doctor: "Dr.Rajitha Bandara",
//   tableData: tableData,
// };


// const sendEmail = async () => {
//   try {
//     const response = await fetch('http://localhost:3100/api/send', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         data:reportDetails,
//         type: 'report',
//       }),
//     });
//     if (!response.ok) {
//       throw new Error('Failed to send email');
//     }
//     alert('Email sent successfully');
//   } catch (error) {
//     alert(error.message);
//   }
// };




//   return (
//     <Container
//       sx={{
//         marginTop: "20px",
//         display: "grid",
//         gridTemplateColumns: "auto auto auto",
//         gridTemplateRows: "auto",

//         gridTemplateAreas: `
//       "logo . Contact"
//       "BD1 BD2 BD3"
//       "Table Table Table"
//       "end end end"
//       "E n d "
//     `,
//         columnGap: "30px",
//         rowGap: "75px",
//       }}
//     >
//       {/* First row */}
//       {/* Image grid */}
//       <Grid item xs={3} sx={{ gridArea: "logo" }}>
//         <Paper sx={{ width: "30%" }}>
//           <img
//             src={healthLabLogo}
//             alt="logo"
//             style={{ width: "100%", height: "auto" }}
//           />
//         </Paper>
//       </Grid>
//       {/* Text grid */}
//       <Grid
//         item
//         xs={3}
//         sx={{
//           gridArea: "Contact",
//           display: "flex",
//           flexDirection: "column",
//           justifyContent: "flex-start",
//         }}
//       >
//         <Typography variant="body1"></Typography>
//         <Typography variant="body1"></Typography>
//       </Grid>

//       {/* Second row */}
//       {/* Bio data */}
//       {/* First coloum */}
//       <Grid item xs={3} sx={{ gridArea: "BD1" }}>
//         <Typography variant="p" sx={{ fontSize: "16px" }}>
//           {record.pname}
//         </Typography>
//         <Typography variant="body1" sx={{ fontSize: "14px" }}>
//           Age:{reportDetails.PatientAge}
//           <br />
//           Sex:Mail
//           <br />
//           PID:{record._id}
//         </Typography>
//       </Grid>
//       {/* Second coloum */}
//       {/* Third coloum */}
//       <Grid item xs={3} sx={{ gridArea: "BD3" }}>
//         <Typography variant="p" sx={{ fontSize: "16px" }}>
//           {record.username}
//         </Typography>
//         <Typography variant="body1" sx={{ fontSize: "14px" }}>
//           Registered on: {record.regdate.split("T")[0]}
//           <br />
//           Collected on: 02.31pm 02 December
//           <br />
//           Reported on: 02.31 December 2022
//         </Typography>
//       </Grid>

//       {/* Third row */}

//       <Grid
//         item
//         xs={6}
//         sx={{ display: "grid", gridArea: "Table", width: "100%" }}
//       >
//         <TableContainer component={Paper}>
//           <Table>
//             {/* Table head */}
//             <TableHead>
//               <TableRow>
//                 <TableCell>Test</TableCell>
//                 <TableCell>Result</TableCell>
//                 <TableCell>Reference Value</TableCell>
//                 <TableCell>unit</TableCell>
//               </TableRow>
//             </TableHead>
//             {/* Table body */}
//             <TableBody>
//               {tableData.map((row) => (
//                 <TableRow key={row.testId}>
//                   <TableCell>{row.testName}</TableCell>
//                   <TableCell>{row.result}</TableCell>
//                   <TableCell>{row.min} - {row.max}</TableCell>
//                   <TableCell>{row.unit}</TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       </Grid>

//       {/* End  */}
//       <Grid item sx={{ display: "grid", gridArea: "end", placeSelf: "center" }}>
//         <Typography variant="p">
//           ----------------------------- **End of report**
//           -----------------------------
//         </Typography>
//       </Grid>

//       <Grid item sx={{ display: "grid", gridArea: "E" }}>
//         <Typography variant="p">
//           ----------------------
//           <br />
//           Medical Lab Technetion
//         </Typography>
//       </Grid>
//       <Grid item sx={{ display: "grid", gridArea: "d" }}>
//         <Typography variant="p">
//           ----------------------
//           <br />
//           Dr.Rajitha Bandara
//         </Typography>
//       </Grid>


//       <Grid item sx={{ display: "grid", gridArea: "printButton", placeSelf: "center" }}>
//         <Button variant="contained" color="primary" onClick={() => window.print()}>
//           Print
//         </Button>
//       </Grid>
//       <Grid item xs={6} align="right">
//             <Button variant="contained" color="secondary" onClick={sendEmail}>
//               Send Email
//             </Button>
//           </Grid>
//     </Container>
//   );
// };

// export default ReportUI;



import React, { useEffect, useState } from "react";
import {
  Typography,
  Paper,
  Container,
  Grid,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Button,
} from "@mui/material";
import healthLabLogo from "./Labasisstenceimg/Health lab logo_.png";
import { useLocation } from "react-router-dom";

const ReportUI = () => {
  const location = useLocation();

  // all test data 
  const [testsDB, setTestsDB] = useState([]);
  // appointment data (patient)
  const [userData, setUserData] = useState([]);
  const [results, setResults] = useState([]);
  const record = location.state.record;
  const id = record.pid;
  // patient registered tests
  const tests = record.selectTests;

  // fetch data from Test database
  useEffect(() => {
    async function getTestData() {
      const response = await fetch(`http://localhost:3100/tests`);
      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }
      const testData = await response.json();
      setTestsDB(testData.response);
    }
    getTestData();
  }, []);

  useEffect(() => {
    async function getUserDataByID() {
      const response = await fetch(`http://localhost:3100/api/getuser/${id}`);
      if (!response.ok) {
        const message = `An error occurred in user data section : ${response.statusText}`;
        window.alert(message);
        return;
      }
      const user = await response.json();
      setUserData(user.user);
    }
    getUserDataByID();
  }, [id]);

  useEffect(() => {
    async function getResult() {
      const response = await fetch(`http://localhost:3100/api/testresult`);
      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }
      const resultsData = await response.json();
      setResults(resultsData.result);
    }
    getResult();
  }, [id]);

  // Ensure userData and userData.nationalID are defined
  const birthYear = userData && userData.nationalID ? parseInt(userData.nationalID.substring(0, 4)) : null;
  const currentYear = new Date().getFullYear();
  const age = birthYear ? currentYear - birthYear : "no data";

  // Construct the tableData
  const tableData = tests.map((test) => {
    const matchedResult = results.find((result) => result.testid === test._id);
    const matchedTestDB = testsDB.find((dbTest) => dbTest.id === test.testId);
    return {
      testId: test._id,
      result: matchedResult ? matchedResult.testresults : "no data",
      testName: test.testName,
      min: matchedTestDB ? matchedTestDB.min : "no data",
      max: matchedTestDB ? matchedTestDB.max : "no data",
      unit: matchedTestDB ? matchedTestDB.unit : "no data",
    };

  });

  const reportDetails = {
    patientName: record.pname,
    PatientAge: age,
    PatientSex: "Male",
    PatientID: record._id,
    RegisteredOn: record.regdate.split("T")[0],
    CollectedOn: "02.31pm 02 December",
    ReportedOn: "02.31 December 2022",
    LabTechnician: "Medical Lab Technician",
    Doctor: "Dr. Rajitha Bandara",
    tableData: tableData,
  };

  const sendEmail = async () => {
    try {
      const response = await fetch('http://localhost:3100/api/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data: reportDetails,
          type: 'report',
        }),
      });
      if (!response.ok) {
        throw new Error('Failed to send email');
      }
      alert('Email sent successfully');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <Container
      sx={{
        marginTop: "20px",
        display: "grid",
        gridTemplateColumns: "auto auto auto",
        gridTemplateRows: "auto",
        gridTemplateAreas: `
          "logo . Contact"
          "BD1 BD2 BD3"
          "Table Table Table"
          "end end end"
          "E n d "
        `,
        columnGap: "30px",
        rowGap: "75px",
      }}
    >
      <Grid item xs={3} sx={{ gridArea: "logo" }}>
        <Paper sx={{ width: "30%" }}>
          <img
            src={healthLabLogo}
            alt="logo"
            style={{ width: "100%", height: "auto" }}
          />
        </Paper>
      </Grid>
      <Grid
        item
        xs={3}
        sx={{
          gridArea: "Contact",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
        }}
      >
        <Typography variant="body1"></Typography>
        <Typography variant="body1"></Typography>
      </Grid>

      <Grid item xs={3} sx={{ gridArea: "BD1" }}>
        <Typography variant="p" sx={{ fontSize: "16px" }}>
          {record.pname}
        </Typography>
        <Typography variant="body1" sx={{ fontSize: "14px" }}>
          Age: {reportDetails.PatientAge}
          <br />
          Sex: Male
          <br />
          PID: {record._id}
        </Typography>
      </Grid>
      <Grid item xs={3} sx={{ gridArea: "BD3" }}>
        <Typography variant="p" sx={{ fontSize: "16px" }}>
          {record.username}
        </Typography>
        <Typography variant="body1" sx={{ fontSize: "14px" }}>
          Registered on: {record.regdate.split("T")[0]}
          <br />
          Collected on: 02.31pm 02 December
          <br />
          Reported on: 02.31 December 2022
        </Typography>
      </Grid>

      <Grid
        item
        xs={6}
        sx={{ display: "grid", gridArea: "Table", width: "100%" }}
      >
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Test</TableCell>
                <TableCell>Result</TableCell>
                <TableCell>Reference Value</TableCell>
                <TableCell>Unit</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tableData.map((row) => (
                <TableRow key={row.testId}>
                  <TableCell>{row.testName}</TableCell>
                  <TableCell>{row.result}</TableCell>
                  <TableCell>{row.min} - {row.max}</TableCell>
                  <TableCell>{row.unit}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>

      <Grid item sx={{ display: "grid", gridArea: "end", placeSelf: "center" }}>
        <Typography variant="p">
          ----------------------------- **End of report** -----------------------------
        </Typography>
      </Grid>

      <Grid item sx={{ display: "grid", gridArea: "E" }}>
        <Typography variant="p">
          ----------------------
          <br />
          Medical Lab Technician
        </Typography>
      </Grid>
      <Grid item sx={{ display: "grid", gridArea: "d" }}>
        <Typography variant="p">
          ----------------------
          <br />
          Dr. Rajitha Bandara
        </Typography>
      </Grid>

      <Grid item sx={{ display: "grid", gridArea: "printButton", placeSelf: "center" }}>
        <Button variant="contained" color="primary" onClick={() => window.print()}>
          Print
        </Button>
      </Grid>
      <Grid item xs={6} align="right">
        <Button variant="contained" color="secondary" onClick={sendEmail}>
          Send Email
        </Button>
      </Grid>
    </Container>
  );
};

export default ReportUI;
