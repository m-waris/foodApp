import React from 'react'
import Navbar from '../components/Nav_bar'
import Card from '../components/Card'
import Footer from '../components/Footer'
import { useEffect, useState } from 'react'


export default function Home() {
  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItems] = useState([]);
  const [search, setSearch] = useState("");

  const getFoodData = async () => {
    const response = await fetch("http://localhost:4000/api/displaydata",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
    const data = await response.json();

    setFoodCat(data[1]);
    setFoodItems(data[0]);
  }
  useEffect(() => {
    getFoodData();
  }, []);
  return (
    <>
      <Navbar />
      <div className="flex justify-center mt-6">
            <div className=" w-70 md:w-80">
            <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                <input
                    type="search"
                    className="relative flex-auto rounded-l border border-solid border-gray-400 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] outline-none focus:z-[3]  focus:shadow-[inset_0_0_0_1px_rgb(101,210,410)]"
                    placeholder="Search" 
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    
                    />
                <button
                    className="relative z-[2] flex items-center rounded-r px-6 py-2.5 shadow-sm bg-yellow-100 hover:bg-yellow-300 hover:shadow-lg focus:bg-primary-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-primary-800 active:shadow-lg"
                    type="button"
                    id="button-addon1">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="h-5 w-5 ">
                        <path
                            fillRule="evenodd"
                            d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                            clipRule="evenodd" />
                    </svg>
                </button>
            </div>
        </div>
        </div>
        <div className="flex">
          <div className="flex-1">
             <main >
        {
          foodCat !==[] 
          ? foodCat.map((data) => {
            return (
              <div className="">
                <div className="text-xl font-medium py-4">
                  {data.CategoryName}
                </div>
                <hr />
                <div>
                  {
                   foodItem!==[]
                    ? foodItem.filter((item) => (item.CategoryName === data.CategoryName)&& item.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())).map((filteritem) =>
                     {
                      return (
                        <div className="mb-8" >
                        <Card  foodItem={filteritem} options={filteritem.options[0]}/>
                          </div>
                      )
                    }
                    ):null
                  
                  }
                </div>
              </div>
            )}) 
          : null
          
        }


      </main>
          </div>
        </div>
     
      <Footer />

    </>
  )
}
