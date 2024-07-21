import Patienthead from '../../Components/Patienthead';
import BasicSelect from '../Selecttest_Components/BasicSelect';
import '../../maincss/Class.css';
import BackToTop from '../Selecttest_Components/Scroll';
import Footer from '../../Components/Footer';
import { Grid } from '@mui/material';

function Selecttest() {
  
  return (
    <div className="Class">
     
      <Patienthead/>
      <Grid sx={{paddingTop:'12%', paddingBottom:'10%'}}>
        <BasicSelect  />
        <BackToTop />
        
      </Grid>
      <Footer/>
    </div>
    
  );
}

export default Selecttest;
