import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { BASE_URL } from './utils/constants';
import { removeUser } from './utils/userSlice';
const Navbar = () => {
  const user= useSelector((store)=>store.user);
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const connection= useSelector((store)=>store.connection);
  const connectionLength=connection?.length;
  const requests=useSelector((store)=>store.requests);
  const requestslength=requests?.length;
  const handleLogout=async()=>{
    try{
      await axios.post(
        BASE_URL+"/logout",{},
        {withCredentials:true}
      )
      dispatch(removeUser())
      navigate("/login")
    }catch(err){
      console.log(err);
      
    }
  }
  return (
    <div className="navbar bg-black shadow-sm">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl"><span className='text-pink-500'>DEV</span>COMMITS</Link>
      </div>
      <div className="flex gap-2">
        {user?(
          <div className="dropdown dropdown-end mx-10">
          <div tabIndex={0} role="button" className='cursor-pointer'>
            <div className="w-10">
              <h1 className='my-2'>Welcome, {user?.firstName}</h1>
            </div>
          </div>
          <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        <li>
          <Link to="/profile" className="justify-between">
            Profile
          </Link>
        </li>
        <li><Link to="/connections">Connections <span className="badge  badge-success">{connectionLength}</span></Link></li>
        <li><Link to="/requests">Requests <span className="badge  badge-success">{requestslength}</span></Link></li>
        <li><Link onClick={handleLogout}>Logout</Link></li>
      </ul>
    </div>
        ):(
          <Link to="/login"><button className='mx-10 cursor-pointer'>Login</button></Link>
        )} 
  </div>
</div>
  )
}

export default Navbar
