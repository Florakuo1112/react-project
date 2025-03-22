import { useDispatch } from 'react-redux';
import {logoutAction} from '../slice/loginStatusSlice';

import {Link, NavLink} from 'react-router';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket, faCalendar, faFolderOpen, faDog } from "@fortawesome/free-solid-svg-icons";

function AdminSideBarComponent(){
    const dispatch = useDispatch();

    function logout(e){
        e.preventDefault(); 
        dispatch(logoutAction());
      };

    return(<>
    <div style={{width:'300px'}} className="position-fixed vh-100 bg-secondary">
        {/* logo */}
        <Link className="d-flex link py-3 px-4" to='/' >
            <img  src={`${import.meta.env.BASE_URL}coconutTree.jpg`}
            alt="Logo" style={{height:'30px'}} className="rounded-circle"></img>
            <h2 className='playwrite-it-moderna text-light  mb-0 ms-1' >Caliwoof Pet</h2> 
        </Link>

    <ul className="list-group " >
        
        <li className="list-group-item bg-secondary border-0 d-flex align-items-center">
            <FontAwesomeIcon icon={faCalendar} size="2x" className="navLink mx-2"/>
                <NavLink to='/admin/adminCalendar' 
                className='navLink ms-1'>毛孩來店行事曆</NavLink>
        </li>

        <li className="list-group-item bg-secondary border-0" >
            <div className='d-flex align-items-center'>
                <FontAwesomeIcon icon={faFolderOpen} size="2x" className="navLink ms-2"/>
                <NavLink to='/admin/order' 
                className='navLink ms-1'>訂單管理</NavLink>
            </div>
        </li>
        <li className="list-group-item bg-secondary border-0">
        
            <FontAwesomeIcon icon={faCalendar} size="2x" className="navLink mx-2"/>
            <NavLink to='/admin/products' className='navLink ms-1'>產品列表</NavLink> 
        </li>
        <li className="list-group-item bg-secondary border-0 d-flex align-items-center">
        <FontAwesomeIcon icon={faArrowRightFromBracket} size="2x" 
                className="navLink ms-2"/> 
            <button className='bg-transparent border-0 ' 
                onClick={(e)=>{logout(e)}}>
                <span className='navLink ms-1'>登出</span>
            </button>
        </li>
    </ul>
    </div>

    </>)
};

export default AdminSideBarComponent;