import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';


const ProductList = ()=>{
    const [products,setProducts] = useState([]);

    useEffect(()=>{
        getProducts();
    },[]);

    const getProducts = async ()=>{
        let result = await fetch('http://localhost:5000/products',{
            headers:{
                'authorization':JSON.parse(localStorage.getItem('token'))
            }
        });
        result =await result.json();
        setProducts(result);
    }
    const deleteProduct =async (id)=>{
        let result =await fetch(`http://localhost:5000/product/${id}`,{
            method:'Delete',
            headers:{
                'authorization':JSON.parse(localStorage.getItem('token'))
            }
        });
        result = await result.json();
        console.log(result.deletedCount)
        if(result.deletedCount > 0){
            getProducts();
        }else{
            alert('something went wrong.')
        }
    }
    const searchHandler =async (event)=>{
        let key = event.target.value;
        if(key){
            let result = await fetch(`http://localhost:5000/search/${key}`,{
                headers:{
                    'authorization':JSON.parse(localStorage.getItem('token'))
                }
            });
            result =await result.json();
            setProducts(result);
        }else{
            getProducts(); 
        }
    }
    
    return (
        <div className='product-list'>
            <h1>Products</h1>
            <input className="search-input-box" type="text" placeholder='Search'
            onChange={searchHandler} />
            <ul>
                <li>Sr.No</li>
                <li>Name</li>
                <li>Price</li>
                <li>Category</li>
                <li>Company</li>
                <li>Actions</li>
            </ul>
            {
               products.length > 0 ? products.map((item,index)=>
                    <ul key={item._id}>
                        <li>{index+1}</li>
                        <li>{item.name}</li>
                        <li>{item.price}</li>
                        <li>{item.category}</li>
                        <li>{item.company}</li>
                        <li>
                            <button onClick={()=>deleteProduct(item._id)}>Delete</button> 
                            <button> <Link to={'update/'+item._id}>update</Link></button>
                            
                        </li>
                    </ul>
                )
                : <h3>Result not found</h3>
            }
        </div>
    )
}

export default ProductList;