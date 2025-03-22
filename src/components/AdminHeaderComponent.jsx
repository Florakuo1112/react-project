import { useDispatch } from 'react-redux';
import {logoutAction} from '../slice/loginStatusSlice';

import {Link, NavLink} from 'react-router';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";

function AdminHeaderComponent(){
    const dispatch = useDispatch();

    function logout(e){
        e.preventDefault(); 
        dispatch(logoutAction());
      };
  
    return(<>
    <header className='py-2 mx-0' >
        <div className="container">
            <div className="d-flex justify-content-between align-items-center">

           
            {/* logo */}
            <Link className="d-flex link" to='/' >
                <img  src={`${import.meta.env.BASE_URL}coconutTree.jpg`}
                alt="Logo" style={{height:'30px'}} className="rounded-circle"></img>
                <h3 className='playwrite-it-moderna text-light  mb-0 ms-1' >Caliwoof Pet</h3> 
            </Link>
            <nav className="d-flex align-items-center">
                <NavLink to='/admin/adminCalendar' className='navLink ms-2'>行事曆</NavLink> 
                <NavLink to='/admin/order' className='navLink ms-2'>訂單管理</NavLink> 
                <NavLink to='/admin/products' className='navLink ms-2'>產品列表</NavLink> 
                <button className='bg-transparent border-0' 
                onClick={(e)=>{logout(e)}}>
                <FontAwesomeIcon icon={faArrowRightFromBracket} size="2x" 
                className="navLink ms-2"/>
                </button>
            </nav>
            </div>
        </div>

    </header>

    </>)
};

export default AdminHeaderComponent;