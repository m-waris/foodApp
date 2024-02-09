import React from 'react'
import bread from '../imgs/bread.png'

export default function Footer() {
    return (
        <>
            <footer className="bg-slate-200 text-center py-5 px-10">
                <div className="flex justify-center py-5">
              
                       <img className='w-16 h-16' src={bread} alt="" />
                  
                </div>
                <div
                    className=" border-t-2 border-slate-400 p-4 text-center">
                    Made With ❤️ by <a className='underline' href="https://mwarismahmood.vercel.app/">Waris</a>
                </div>
            </footer>
        </>
    )
}
