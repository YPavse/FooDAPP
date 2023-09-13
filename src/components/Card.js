import React,{useState, useRef, useEffect} from 'react'
import { useDispatchCart, useCart } from './ContextReducer'
export default function Card(props) {
  
  let options = props.options;
  let data = useCart();
  let priceOptions = Object.keys(options);

  // let foodItem = props.fooditems;

  const [qty, setQty] = useState(1)

  const [size, setSize] = useState("")

  const dispatch = useDispatchCart();

  const handleAddToCart = async () => {
    await dispatch({ type: "ADD", id: props.foodItem._id, name: props.foodItem.name, price:finalPrice, qty: qty, size: size })
    console.log(data)
      }

      const priceRef = useRef();

      let finalPrice = qty * parseInt(options[size]);

      useEffect(() => {
        setSize(priceRef.current.value)
      }, [])

  return (
    <>
      <div>

<div className="card mt-3" style={{ width: "16rem", maxHeight: "360px" }}>
  <img src={props.foodItem.img} className="card-img-top" alt="..." style={{ height: "170px", objectFit: "fill" }} />
  <div className="card-body">
    <h5 className="card-title">{props.foodItem.name}</h5>
  
    <div className='container w-100 p-0' style={{ height: "38px" }}>
      
      <select className="m-2 h-100 w-20 bg-success text-black rounded"  onChange={(e)=>setQty(e.target.value)} style={{ select: "#FF0000" }} >
        {Array.from(Array(6), (e, i) => {
          return (
            <option key={i + 1} value={i + 1}>{i + 1}</option>)
        })}
      </select>
      <select className="m-2 h-100 w-20 bg-success text-black rounded" ref={priceRef} onChange={(e)=>setSize(e.target.value)} style={{ select: "#FF0000" }}  >

        {priceOptions.map((i) => {
          return <option key={i} value={i}>{i}</option>
        })}

      </select>
      <div className=' d-inline ms-2 h-100 w-20 fs-5' >
        ₹{finalPrice}/-
      </div>
    </div>
    <hr></hr>
    <button className={`btn btn-success justify-center ms-2 `} onClick={handleAddToCart} >Add to Cart</button>
    
  </div>
</div>
</div>
    </>
  )
}
