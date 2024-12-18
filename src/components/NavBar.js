import { Link } from "react-router-dom";

const NavBar = () => {

  return (

    <div class="navbar bg-base-200">
      <div class="flex-1">
        <a href="/" class="btn btn-ghost text-xl">Home</a>`
        <ul class="menu menu-horizontal px-1">
              <li><Link to='/doctors'>Doctors</Link></li>
              <li><Link to='/patients'>Patients</Link></li>
              <li><Link to='/appointments'>Appointments</Link></li>
              <li><Link to='/diagnoses'>Diagnoses</Link></li>
              <li><Link to='/prescriptions'>Prescriptions</Link></li>
        </ul>`
      </div>
      <div class="">
        <ul class="menu menu-horizontal px-1">
          <li>
            <details>
              <summary>Create</summary>
              <ul class="bg-base-100 rounded-t-none w-48 p-2 z-10">
                <li><Link to='/doctors/create'>Add Doctors</Link></li>
                <li><Link to='/patients/create'>Add Patients</Link></li>
                <li><Link to='/appointments/create'>Add Appointments</Link></li>
                <li><Link to='/diagnoses/create'>Add Diagnoses</Link></li>
                <li><Link to='/prescriptions/create'>Add Prescriptions</Link></li>
              </ul>
            </details>
          </li>
          <li><Link to='/register'>Register</Link></li>
          <li><Link to='/login'>Login</Link></li>
        </ul>
      </div>
    </div>

  )
};

export default NavBar;