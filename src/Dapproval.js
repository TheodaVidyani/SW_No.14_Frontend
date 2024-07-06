import Patienthead from './Components/Patienthead';
import Dapproval03 from './Dapproval/Dapproval03';
import Box from '@mui/material/Box';
import ReportView from './Dapproval/ReportView'
import Footer from './Components/Footer';

function Dapproval() {
    return (
      <div style={{
        backgroundColor:'#E0F7FA'
      }}>
       
        <Patienthead/><br/><br/><br/>
    <Box sx={{ width: '80%', margin: 'auto', padding: '20px' ,borderRadius: '8px'}}>
       
        <ReportView/>
        </Box>
        
        <Dapproval03/>
        <br/>
          <Footer/>
      </div>
      
    );
  }
  export default Dapproval;