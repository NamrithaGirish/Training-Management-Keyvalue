import UploadAssignmentsModal from "./components/assignment/Assignment"
import Layout from "./components/layout/Layout"
import SessionDetailsForm from "./components/sessionDetailsForm/SessionDetailsForm"
import AdminDashboard from "./pages/adminDashboard/AdminDashboard"
import CreateProgram from "./pages/createProgram/CreateProgram"
import CreateUserPool from "./pages/createUserPool/CreateUserPool"
import EditProgram from "./pages/editProgram/EditProgram"
import Login from "./pages/login/Login"

function App() {
  return (
    <>
      <AdminDashboard/>
      {/* <CreateProgram /> */}
      {/* <EditProgram /> */}
      {/* <CreateUserPool role="Trainer" /> */}
      {/* <SessionDetailsForm /> */}
    </>
  )
}

export default App
