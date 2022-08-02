import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const UpdateProduct = ()=>{
    const [name,setName] = useState('');
    const [price,setPrice] = useState('');
    const [category,setCategory] = useState('');
    const [company,setCompany] = useState('');
    const [error,setError] = useState(false);

    const params = useParams();
    const navigate = useNavigate();
    const updateProduct =async ()=>{
        if(!name || !price || !category || !company){
            setError(true);
            return false;
        }
        let result =await fetch(`http://localhost:5000/product/${params.id}`,{
            method:'PUT',
            body:JSON.stringify({name,price,category,company}),
            headers:{
                'Content-Type':'application/json',
                'authorization':JSON.parse(localStorage.getItem('token'))
            }
        });
        result = await result.json();
        console.log(result);
        navigate('/');
    }
    useEffect(()=>{
        getProductDetails();
    },[]);

    const getProductDetails =async ()=>{
        let result = await fetch(`http://localhost:5000/product/${params.id}`,{
            headers:{
                'authorization':JSON.parse(localStorage.getItem('token'))
            }
        });
        result = await result.json();
        setName(result.name);
        setPrice(result.price);
        setCategory(result.category);
        setCompany(result.company);
    }
    
    return (
        <div>
             <div className="product">
            <h2>Update Product</h2>
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
            <button onClick={updateProduct} className="appButton" type="button">Save Product</button>
        </div>
        </div>
    )
}

export default UpdateProduct;