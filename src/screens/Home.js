import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Card from '../components/Card';


export default function Home() {
  const [foodCat, setFoodCat] = useState([])
  const [foodItems, setFoodItems] = useState([])
   const [search, setSearch] = useState('')

  const loadData = async () => {
    let response = await fetch("http://localhost:5000/api/foodData", {
      
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }

    });
    response = await response.json()
    
    setFoodItems(response[0])
    setFoodCat(response[1])
  }

  useEffect(() => {
    loadData()
  }, [])

  return (
    <div>
      <div><Navbar/></div>
      <div>
      <div id="carouselExampleFade" className="carousel slide carousel-fade " data-bs-ride="carousel">

<div className="carousel-inner " id='carousel'>
    <div class=" carousel-caption  ">
        <div className=" d-flex justify-content-center">  
            <input className="form-control me-2 w-75 bg-white text-dark" type="search" placeholder="Type in..." aria-label="Search"  value={search} on onChange={(e) => { setSearch(e.target.value) }}/>
            <button className="btn text-white bg-danger" onClick={() => { setSearch('') }}>X</button>
           
        </div>
    </div>
    <div className="carousel-item active" >
        <img src="https://source.unsplash.com/random/900x700/?burger" className="d-block w-100  " style={{ filter: "brightness(30%)" }} alt="..." />
    </div>
    <div className="carousel-item ">
        <img src="https://source.unsplash.com/random/900x700/?pastry" className="d-block w-100 " style={{ filter: "brightness(30%)" }} alt="..." />
    </div>
    <div className="carousel-item ">
        <img src="https://source.unsplash.com/random/900x700/?barbeque" className="d-block w-100 " style={{ filter: "brightness(30%)" }} alt="..." />
    </div>
</div>
<button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
</button>
<button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
</button>
</div>



      </div>
      <div className='container'>
      {
  foodCat !== []
    ? foodCat.map((data) => (
        <div className='row mb-3' key={data.id}>
          <div className='fs-3 m-3'>{data.CategoryName}</div>
          <hr
            id='hr-success'
            style={{
              height: '4px',
              backgroundImage:
                '-webkit-linear-gradient(left,rgb(0, 255, 137),rgb(0, 0, 0))',
            }}
          />
          {foodItems !== []
            ? foodItems
                .filter(
                  (items) =>
                    items.CategoryName === data.CategoryName &&
                    items.name.toLowerCase().includes(search.toLowerCase())
                )
                .map((filterItems) => (
                  <div className='col-12 col-md-6 col-lg-3' key={filterItems.id}>
                    {console.log(filterItems.url)}
                    <Card
                      
                      foodItem={filterItems} 
                      options={filterItems.options[0]} 
                     
                     
                      
                    />
                  </div>
                ))
            : <div>No Such Data</div>}
        </div>
      ))
    : ""
}

         
        </div>
      <div><Footer/></div>
    </div>
  )
}
