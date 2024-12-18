import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";

//Doctor pages
import DoctorIndex from "./pages/doctors/Index";
import SingleDoctor from "./pages/doctors/SingleDoctor";
import CreateDoctor from "./pages/doctors/CreateDoctor";
import EditDoctor from "./pages/doctors/EditDoctor";

//Patient pages
import PatientIndex from "./pages/patients/Index";
import SinglePatient from "./pages/patients/SinglePatient";
import CreatePatient from "./pages/patients/CreatePatient";
import EditPatient from "./pages/patients/EditPatient";

//Appointment pages
import AppointmentIndex from "./pages/appointments/Index";
import SingleAppointment from "./pages/appointments/SingleAppointment";
import CreateAppointment from "./pages/appointments/CreateAppointment";
import EditAppointment from "./pages/appointments/EditAppointment";

//Diagnose pages
import DiagnosisIndex from "./pages/diagnoses/Index";
import SingleDiagnosis from "./pages/diagnoses/SingleDiagnosis";
import CreateDiagnosis from "./pages/diagnoses/CreateDiagnosis";
import EditDiagnosis from "./pages/diagnoses/EditDiagnosis";

//Prescription pages
import PrescriptionIndex from "./pages/prescriptions/Index";
import SinglePrescription from "./pages/prescriptions/SinglePrescription";
import CreatePrescription from "./pages/prescriptions/CreatePrescription";
import EditPrescription from "./pages/prescriptions/EditPrescription";

//Forms
import RegisterForm from "./components/RegisterForm";
import LoginForm from "./components/LoginForm";


function App() {
  return (

    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/doctors" element={<DoctorIndex />} />
        <Route path="/doctors/:id" element={<SingleDoctor />} />
        <Route path="/doctors/create" element={<CreateDoctor />} />
        <Route path="/doctors/:id/edit" element={<EditDoctor />} />

        <Route path="/patients" element={<PatientIndex />} />
        <Route path="/patients/:id" element={<SinglePatient />} />
        <Route path="/patients/create" element={<CreatePatient />} />
        <Route path="/patients/:id/edit" element={<EditPatient />} />

        <Route path="/appointments" element={<AppointmentIndex />} />
        <Route path="/appointments/:id" element={<SingleAppointment />} />
        <Route path="/appointments/create" element={<CreateAppointment />} />
        <Route path="/appointments/:id/edit" element={<EditAppointment />} />

        <Route path="/diagnoses" element={<DiagnosisIndex />} />
        <Route path="/diagnoses/:id" element={<SingleDiagnosis />} />
        <Route path="/diagnoses/create" element={<CreateDiagnosis />} />
        <Route path="/diagnoses/:id/edit" element={<EditDiagnosis />} />

        <Route path="/prescriptions" element={<PrescriptionIndex />} />
        <Route path="/prescriptions/:id" element={<SinglePrescription />} />
        <Route path="/prescriptions/create" element={<CreatePrescription />} />
        <Route path="/prescriptions/:id/edit" element={<EditPrescription />} />

        <Route path="/register" element={<RegisterForm />} />
        <Route path="/login" element={<LoginForm />} />
      </Routes>
    </Router>
  );
}

export default App;
