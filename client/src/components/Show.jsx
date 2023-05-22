import React from 'react'
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Nav from './Nav'

const Show = () => {
    const { id } = useParams();
    const [store, setStore] = useState({});
    
    useEffect(() => {
        axios
            .get(`http://localhost:8000/api/stores/${id}`)
            .then((res) => {
                console.log(res);
                setStore(res.data);
            })
            .catch((err) => console.log(err));
    }, []);

  return (
    <div>
        <Nav/>
        <h1>Store Details</h1>
        <h2>{store.name}</h2>
        <h3>{store.number}</h3>
        <h3>{store.open ? "Open" : "Closed"}</h3>
        <Link to={`/stores/edit/${store._id}`}>Edit</Link>
    </div>
  )
}

export default Show