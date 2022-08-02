import React, { useState } from "react";

const AddProduct = ()=>{
    const [name,setName] = useState('');
    const [price,setPrice] = useState('');
    const [category,setCategory] = useState('');
    const [company,setCompany] = useState('');
    const [error,setError] = useState(false);

    const addProduct =async ()=>{
        if(!name || !price || !category || !company){
            setError(true);
            return false;
        }
        console.warn(name,price,category,company);
        const userId = JSON.parse(localStorage.getItem('user'))._id;
        let result =await fetch('http://localhost:5000/add-product',{
            method:'POST',
            body:JSON.stringify({name,price,category,company,userId}),
            headers:{
                'Content-Type':'application/json',
                'authorization':JSON.parse(localStorage.getItem('token'))
                
            }
        });
        result = await result.json();
        console.warn(result);
    }
    return (
        <div>
             <div className="product">
            <h2>Add Product</h2>
            <input className="inputBox" type="text"
            value={name} onChange={(e)=>setName(e.target.value)} placeholder="Enter Name" />
           { error && !name&& <span className="invalid-input">Enter valid name</span>}
            <input className="inputBox" type="text" 
            value={price} onChange={(e)=>setPrice(e.target.value)} placeholder="Enter Price" />
            { error && !price&& <span className="invalid-input">Enter valid price</span>}
            <input className="inputBox" type="text"
             value={category} onChange={(e)=>setCategory(e.target.value)} placeholder="Enter Category" />
             { error && !category&& <span className="invalid-input">Enter valid category</span>}
            <input className="inputBox" type="text"
            value={company} onChange={(e)=>setCompany(e.target.value)} placeholder="Enter Company" />
            { error && !company&& <span className="invalid-input">Enter valid company</span>}
            <button onClick={addProduct} className="appButton" type="button">Save Product</button>
        </div>
        </div>
    )
}

export default AddProduct;