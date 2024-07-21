import { Box } from '@mui/system';
import Footer from '../../Components/Footer'; 
import Report from '../LabasisstenceComponent/table';
import Patienthead from '../../Components/Patienthead';


// function for report list view dash board
//<Reportview/> component is used to display the report list view dashboard(table)

function Reportview() {
  return (
    <div className="App">
  <Box>
  <Patienthead/> 
    <Report/>    
    <Footer/>
    

  </Box>
    </div>
  );
}

export default Reportview;