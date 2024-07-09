import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Head from './Components/Head';
import HomePage from './Components/HomePage';
import Signin from "./Components/Signin";
import Login from "./Components/Login";
import Dhome from './Dhome';
import Dapproval from './Dapproval';
import Contact from './Contact/Contact';
import Selecttest from './Patient/Patient_Component/Selecttest';
import AddTest from './Admin/AddTest';
import ForgotPassword from './Components/ForgotPassword';
import ChangePassword from './Components/ChangePassword';
import ViewPatient from './Admin/ViewPatients';
import ViewAppointment from './Admin/ViewAppoinments';
import AdminInterface from './Admin/AdminInterface';
import Admin from "./Admin/Admin";
import UserProfileUpdate from "./Components/UserProfileUpdate";
import Patient  from "./pages/Patient";
import Doctor from "./pages/Doctor";
import UserProfile from "./Components/UserProfile";
import LabAssistant from "./pages/LabAssistant";
import LabOperator from './pages/LabOperator';
import ProtectedRoute from './Admin/Admin_Component/ProtectedRoute';
import { UserProvider } from './Admin/Admin_Component/UserContext';
import PatientInterface from './Patient/PatientInterface';
/*import PatientInterface from './Patient/PatientInterface';*/
import PViewTest from './Patient/Patient_Component/PViewTest';
import AViewTest from './Admin/AViewTest';
import PViewAppointment from './Patient/Patient_Component/PViewAppointment';
import Reportview from './Labasisstence/LabasisstencePages/Reportview';
import ReportUI from './Labasisstence/LabasisstenceComponent/ReportUI';

import TestResult from './Lab_operator/TestResult';

import Users from './Lab_operator/Users';
import TestTube from './Lab_operator/TestTube';
import ManageTestTube from './Lab_operator/ManageTestTube';
import BloodTesting from './Lab_assistant/BloodTesting';
import PaymentGateway from './user/PaymentGateway';
import UserForm from './Lab_operator/UserForm';
import BarcodeScanner from './Lab_operator/BarcodeScanner';
import AppoinmentInvoice from './Labasisstence/Invoice/Component/invoice';
import LogoutButton from './Components/LogoutButton';

import PPendViewAppointment from './Patient/Patient_Component/PPendViewAppointment';
import Invoicepreview from './Patient/Patient_Component/Invoicepreview';
import Reportpreview from './Patient/Patient_Component/Reportpreview';
import PReportUI from './Patient/Patient_Component/PReportUI';
import ReportView from './Dapproval/ReportView';
import Report from './Dapproval/Report';
import Paymentpreview from './Patient/Patient_Component/Paymentpreview';
import Invoice  from './Labasisstence/Invoice/Component/invoice';
import Pinvoice from './Patient/Patient_Component/Pinvoice';
import FeedbacksUI from './Admin/Admin_Component/FeedbacksUI';
import Feedbacktable from './Admin/Admin_Component/Feedbacktable';

function App() {
  return (
    <UserProvider>
    <div>
    <BrowserRouter>
    <Routes>
    <Route element={<ProtectedRoute allowedRoles={['ADMIN']} />}>
      {/* Wrap My Admin Routes with ProtectedRoute */}
      <Route path='/AdminInterface/:id' element={<AdminInterface/>}/> 
      {/* path is the URL we should access while element is the component/page as it is mentioned in the import section on top of this code.*/}
      <Route path='/Admin/:id' element={<Admin/>}/>
      <Route path='/AddTest/:id' element={<AddTest/>}/>
      </Route>
      <Route path='/AViewTest/:id' element={<AViewTest/>}/>
      <Route path='/ViewAppointment/:id' element={<ViewAppointment/>}/>
      <Route path='/PViewAppointment/:id' element={<PViewAppointment/>}/>
      <Route path='/ViewPatient/:id' element={<ViewPatient/>}/>
      <Route path='/PPendViewAppointment/:id' element={<PPendViewAppointment/>}/>
      
      
      <Route path='/PViewTest/:id' element={<PViewTest/>}/>
      <Route path='/Selecttest' element={<Selecttest/>}/>
      <Route path='/Dhome' element={<Dhome/>}/>
      <Route path='/Dapproval' element={<Dapproval/>}/>
      <Route path='/Contact' element={<Contact/>}/>
      <Route path='/Head' element={<Head/>}/>
      <Route path='/Login' element={<Login/>}/>
      <Route path="/forgetpassword" element={<ForgotPassword />} />
      <Route path="/change-password" element={<ChangePassword />} />
      <Route path='/Signin' element={<Signin/>}/>
      <Route path='/HomePage/*' element={<HomePage/>}/>
      <Route path='/Patient/:id' element={<Patient/>}/> 
      {/* Dynamic routing - '/Patient/:id'*/}
      <Route path='/Doctor/:id' element={<Doctor/>}/>
      <Route path='/Doctor/:id' element={<Doctor/>}/>
      <Route path='/Doctor/:id' element={<Doctor/>}/>
      <Route path='/LabOperator/:id' element={<LabOperator/>}/>
      <Route path='/LabAssistant/:id' element={<LabAssistant/>}/>

      <Route path='/UserProfile/:id' element={<UserProfile/>}/>
      <Route path='/UserProfileUpdate/:id' element={<UserProfileUpdate/>}/>
      <Route path='/lab-operator/test-result' element={<TestResult />} />
      <Route path='/lab-operator/users' element={<Users />} />
      <Route path='/lab-operator/test-tube' element={<TestTube />} />
      <Route path='/lab-operator/manage-test-tubes' element={<ManageTestTube />} />
      <Route path='/lab-assistant/blood-testing' element={<BloodTesting />} />
      <Route path='/user/payment' element={<PaymentGateway />} />
      <Route path='/lab-operator/user-form' element={<UserForm />} />
      <Route path='/scan' element={<BarcodeScanner />} />
      <Route path='/LogoutButton' element={<LogoutButton />} />

      <Route path='/' element={<HomePage />} /> 
      {/* default loading path - Homepage*/}
      <Route path='*' element={<HomePage />} /> 
      {/* Redirect to HomePage for any unknown routes */}


  {/* Lab asisstence IF  */}
 
  <Route path= '/labasisstence' element={<LabAssistant/>}/>
  <Route path= '/Reportview' element={<Reportview/>}/>
  <Route path= '/ReportUI' element={<ReportUI/>}/>

  {/* Invoice Route */}
  <Route path='/invoice' element = {<AppoinmentInvoice/>}/>
  <Route path="/Invoicepreview/:id" element={<Invoicepreview />} />
  <Route path="/Reportpreview/:id" element={<Reportpreview/>}/>
  <Route path="/PReportUI/:id" element={<PReportUI/>}/>
  <Route path="/ReportView/:id" element={<ReportView/>}/>
  <Route path="/Report/:id" element={<Report/>}/>
  <Route path="/Paymentpreview/:id" element={<Paymentpreview/>}/>
  <Route path="/Invoice" element={<Invoice/>}/>
  <Route path="/Pinvoice" element={<Pinvoice/>}/>
  <Route path="/FeedbacksUI" element={<FeedbacksUI/>}/>
  <Route path='/Feedbacktable' element={<Feedbacktable/>}/>

    </Routes>
  </BrowserRouter>
    </div>
    </UserProvider>
    );

}


export default App;
//