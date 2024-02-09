import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import bread from '../imgs/bread.png'
import '../App.css'
import Model from '../Model'
import Cart from '../pages/Cart'
import { useCart } from '../components/ContextReducer'
export default function Nav_bar() {
    const[cartView,setCartView] = useState(false);
    let data = useCart();

    const navigate = useNavigate()
    const logout = () => {
        localStorage.removeItem('token')
        navigate('/login')
    }
    return (
        <>
            <nav className=" bg-slate-200 py-6 flex justify-between px-5 md:px-10">
                <div className=' space-x-3'>
                    <Link to='/' className='flex flex-col items-center -space-y-1' >
                        <img src={bread} className='w-10' alt="" />
                        <h1 className='text-sm md:text-md'>FoodApp</h1>

                    </Link>
                </div>

                <div className=" space-x-3 flex items-center">

                    {

                        localStorage.getItem('token') ?
                            <>
                                {/* <Link className="nav" to="/myorders">History</Link> */}
                                <div className="nav" onClick={()=> setCartView(true)}>My Cart
                                {
                                    data.length > 0 ? <span className='bg-red-300 rounded-full px-2 py-1 ml-1 text-xs'>{data.length}</span> : null
                                }
                                </div>
                                {
                                    cartView? <Model onClose={()=> setCartView(false)} ><Cart /></Model> : null  
                                }
                                <div className="nav border border-red-500 text-red-500" onClick={logout}>Logout</div>

                            </>
                            : <>

                                <Link className="nav" to="/">Home</Link>
                                <Link className="nav" to="/login">Login</Link>

                            </>
                    }

                </div>
            </nav>
        </>
    )
}
