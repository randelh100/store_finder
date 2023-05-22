import React from 'react'
import { Link } from 'react-router-dom';
import { useEffect } from "react";
import axios from "axios";

const DisplayAll = ({stores, setStores}) => {
    useEffect(() => {
        axios
            .get("http://localhost:8000/api/stores")
            .then((res) => {
                console.log(res);
                const sortedStores = res.data.sort(
                    (first, second) => first.number - second.number
                );
                setStores(sortedStores);
            })
            .catch((err) => console.log(err));
    }, []);

    const deleteStore = (id) => {
        axios
            .delete(`http://localhost:8000/api/stores/${id}`)
            .then((res) => {
                console.log(res);
                setStores(stores.filter((store) => store._id !== id));
            })
            .catch((err) => console.log(err));
    };

    return (
        <div>
            <h1>Store Finder</h1>
            <h2>Find Stores in Your Area</h2>
            <table>
                <thead>
                    <tr>
                        <th>Store Name</th>
                        <th>Store Number</th>
                        <th>Open</th>
                        <th>Remove</th>
                    </tr>
                </thead>
                <tbody>
                    {stores.map((store, index) => (
                        <tr key={index}>
                            <td><Link to={`/stores/${store._id}`}>{store.name}</Link></td>
                            <td>{store.number}</td>
                            <td>{store.open ? "Open" : "Closed"}</td>
                            <td>
                                {store.open && (
                                    <button onClick={(e) => deleteStore(store._id)}>
                                        Delete
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Link to={'/stores/add'}>
            Cant Find Your Store?
            </Link>
        </div>
    )
}

export default DisplayAll