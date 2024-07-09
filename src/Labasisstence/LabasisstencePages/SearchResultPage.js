import { Box } from '@mui/system';
import Footer from '../../Components/Footer';
import LabReportsList from '../LabasisstenceComponent/SearchResult';
import Patienthead from '../../Components/Patienthead';

function Reportview() {
  return (
    <div className="App">
  <Box >
  <Patienthead/>
    <LabReportsList  />
    <Footer/>
    

  </Box>
    </div>
  );
}

export default Reportview;