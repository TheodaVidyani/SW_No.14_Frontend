import Patienthead from './Components/Patienthead';
import Dapproval03 from './Dapproval/Dapproval03';
import Box from '@mui/material/Box';
import ReportView from './Dapproval/ReportView'
import Footer from './Components/Footer';

function Dapproval() {
    return (
      <div style={{
        backgroundImage: `url("https://th.bing.com/th/id/OIP.bsgjIH-oP6klVCk_9ZtLaAHaE9?w=248&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7")`,
       backgroundPosition:'center',
        backgroundRepeat:'no-repeat',
        backgroundSize:'cover',
        
      }}>
       
        <Patienthead/><br/><br/><br/>
    <Box sx={{ width: '80%', margin: 'auto', padding: '20px' ,borderRadius: '8px'}}>
        <h1>Lab Report</h1><hr/><br/><br/>
        <ReportView/>
        </Box>
        
        <Dapproval03/>
        <br/>
          <Footer/>
      </div>
      
    );
  }
  export default Dapproval;