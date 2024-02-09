import React, { useState, useRef, useEffect } from 'react'
import { useCart, useDispatchCart } from './ContextReducer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Card(props) {

  const message = (name) => toast.success(name+' is Added to Cart', {
    position: "bottom-left",
    autoClose: 2000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: false,
    progress: undefined,
    theme: "light",
    }); 

  const priceRef = useRef();
  let dispatch = useDispatchCart();
  let options = props.options;
  let foodItem = props.foodItem;
  let priceOptions = Object.keys(options);
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState('');

  let data = useCart();
   const handleAddToCart = async () => {
   
    let food = []
    for (const item of data) {
      if (item.id === foodItem._id) {
        food = item;

        break;
      }
    }
    console.log(food)
    message(foodItem.name)
    console.log(new Date())
    if (food !== []) {
      if (food.size === size) {
        await dispatch({ type: "UPDATE", id: foodItem._id, price: finalPrice, quantity: quantity })
        return
      }
      else if (food.size !== size) {
        await dispatch({ type: "ADD_TO_CART", id: foodItem._id, name: foodItem.name, price: finalPrice, quantity: quantity, size: size,img: props.ImgSrc })
        console.log("Size different so simply ADD_TO_CART one more to the list")
        return
      }
      return
    }

    await dispatch({ type: "ADD_TO_CART", id: foodItem._id, name: foodItem.name, price: finalPrice, quantity: quantity, size: size })


    // setBtnEnable(true)

  }

  let finalPrice = quantity * size;
  useEffect(() => {
    setSize(priceRef.current.value);
  }, []);


  return (
    <>
     <ToastContainer />
      <div className="rounded-lg border-1 bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]">
       
          <img
            className="rounded-t-lg w-full h-60 object-cover"
            src={props.foodItem.img}
            alt="" />
  
        <div className="p-6">
          <h5
            className="mb-2 font-medium ">
            {props.foodItem.name}
          </h5>
          <p className="mb-4 text-xl md:text-2xl font-semibold text-yellow-600">
            Rs.<span className='pl-1'>{finalPrice} </span>
          </p>
          <div className="border-t-2 py-3 flex justify-between space-x-1">
            <div>
              <label className='text-sm font-medium pr-1'>Qnty:</label>
              <select name="" id="" className=' bg-slate-100 px-1 py-2' onChange={(e) => setQuantity(e.target.value)}>
                {
                  Array.from({ length: 10 }).map((e, i) => {
                    return (
                      <option key={i+1} value={i + 1}>{i + 1}</option>
                    )
                  })

                }
              </select>
            </div>
            <div>
              <label className=' text-sm font-medium pr-1' >Size:</label>
              <select className='bg-slate-100 px-1 py-2' ref={priceRef} onChange={(e) => setSize(e.target.value)}>
                {
                  priceOptions.map((e) => {
                    return (
                      <option key={e} value={options[e]}>{e}</option>
                    )
                  }
                  )
                }
              </select>
            </div>
            <div>
              <button onClick={handleAddToCart} className=' text-sm bg-yellow-300 px-2 py-2 rounded-sm hover:bg-yellow-500 hover:text-white'>Add to Cart</button>
              
            </div>

          </div>

        </div>
      </div>
    </>
  )
}
