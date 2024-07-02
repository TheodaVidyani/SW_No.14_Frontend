import Footer from '../../Components/Footer';

import { Box } from '@mui/system';
import ReportSearchBar from '../LabasisstenceComponent/ReportSearchBar';
import Patienthead from '../../Components/Patienthead';


function Serch() {
  return (
    <div className="App">
  <Box>
  <Patienthead/>
   <ReportSearchBar/>
   <Footer/>
 

  </Box>
    </div>
  );
}

export default Serch;