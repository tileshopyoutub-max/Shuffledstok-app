// import './App.css'
import {Routes, Route, Navigate} from 'react-router-dom'
import AdminLayout from './components/admin/AdminLayout'
import UserManagement from './pages/admin/UserManagement'
import Categories from './pages/admin/Categories'
import Tags from './pages/admin/Tags'
import AddNewPhoto from './pages/admin/AddNewPhoto'
import Dashboard from './pages/admin/Dashboard'


function App() {


  return (
    <Routes>
      <Route path='/' element={<Navigate to='/admin/dashboard'/>} />

      <Route path='/admin' element={<AdminLayout />}>
        <Route path='dashboard' element={<Dashboard />} />
        <Route path='userManagement' element={<UserManagement />}/>
        <Route path='categories' element={<Categories />}/>
        <Route path='tags' element={<Tags />}/>
        <Route path='new-photo' element={<AddNewPhoto />}/>
        <Route path='settings' element={<h2>Settings</h2>}/>
      </Route>
    </Routes>
  )
}

export default App
