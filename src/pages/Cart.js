import React from 'react'
import { useCart, useDispatchCart } from '../components/ContextReducer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import del from '../imgs/delete.png'
import empty from '../imgs/empty-cart.png'

export default function Cart() {
  const message = () => toast.success('Thanks for the order! 😊', {
    position: "bottom-left",
    autoClose: 2000,
    zIndex: 1000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: false,
    progress: undefined,
    theme: "light",
    }); 
  let data = useCart();
  let dispatch = useDispatchCart();
  if(data.length === 0){
    return (
      <>
        <div className="mt-52 flex justify-center items-center flex-col">
          <img src={empty} className='w-14-' alt="" />
          <h1 className="mt-3 text-3xl font-medium">Your Cart is Empty</h1>
        </div>
      </>
    )
  }

  const handleCheckOut = async () => {
    message();
    let userEmail = localStorage.getItem("userEmail");
    //console.log(userEmail);
    let response = await fetch("http://localhost:4000/api/orderdata", {
      // credentials: 'include',
      // Origin:"http://localhost:3000/login",
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        order_data: data,
        email: userEmail,
        order_date: new Date().toDateString()
      })
    });
    console.log("JSON RESPONSE:::::", response.status)
    if (response.status === 200) {
      dispatch({ type: "DROP" })
    }
  }



  let totalPrice = data.reduce((total, food) => {
    return total + food.price;
  }, 0)

      
  return (
    <>
    <ToastContainer />
      <div className="flex flex-col">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              <table className=" min-w-full">
                <thead className="text-centerfont-medium">
                  <tr>
                    <th scope="col" className="px-2 py-4">#</th>
                    <th scope="col" className="px-2 py-4">Name</th>
                    <th scope="col" className="px-2 py-4">Quantity</th>
                    <th scope="col" className="px-2 py-4">Options</th>
                    <th scope="col" className="px-2 py-4">Amount</th>
                    <th scope="col" className="px-2 py-4"></th>
                    
                  </tr>
                </thead>
                <tbody>
                {data.map((food, index) => (
              <tr className='border border-b-1 border-gray-300'> 
                <th  scope='row' >{index + 1}</th>
                <td className='text-center' >{food.name}</td>
                <td className='text-center'>{food.quantity}</td>
                <td className='text-center'>{food.size}</td>
                <td className='text-center'>{food.price}</td>
                <td  className='text-center'><button type="button" onClick={() => { dispatch({ type: "REMOVE", index: index }) }}  className=" w-5 mt-1"><img src={del} alt=''/></button> </td></tr>
            ))}
                </tbody>
              </table>
              <div className='ml-5 mt-4'>Total Price:<span className='ml-1 text-xl font-bold'>{totalPrice}/-</span></div>
        <div>
          <button className='py-2 px-2 rounded-md border-2 border-green-400 ml-5 mt-3 hover:bg-green-400 ' onClick={handleCheckOut} > Check Out </button>
        </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
