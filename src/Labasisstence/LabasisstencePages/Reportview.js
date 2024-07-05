import { Box } from '@mui/system';
import Footer from '../../Components/Footer';
import Report from '../LabasisstenceComponent/table';
import Patienthead from '../../Components/Patienthead';

function Reportview() {
  return (
    <div className="App">
  <Box>
  <Patienthead/>
    {/* <Cover/> */}
    <Report/>
    <Footer/>
    

  </Box>
    </div>
  );
}

export default Reportview;