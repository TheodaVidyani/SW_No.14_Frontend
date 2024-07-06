import Patienthead from './Components/Patienthead';
import Footer from './Components/Footer';
import Dhome01 from './Dhome/Dhome01';
import Dhome02 from './Dhome/Dhome02';
import Dimage from './images/Doctor.jpg'

function Dhome() {
    return (
      
      <div style={{
        backgroundImage: `url(${Dimage})`,
       backgroundPosition:'center',
        backgroundRepeat:'no-repeat',
        backgroundSize:'cover'
      }}>
        <Patienthead/><br/><br/><br/><br/><br/><br/><br/><br/>
       
        
        <Dhome01/><br/><br/><br/><br/><br/>
        <Dhome02/><br/><br/><br/><br/><br/><br/><br/>
        <Footer/>
      </div>
      
    );
  }
  export default Dhome;