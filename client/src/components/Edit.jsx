import React from 'react'
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Nav from './Nav'


const Edit = ({ stores, setStores }) => {
    const { id } = useParams();

    const [errors, setErrors] = useState({});

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        number: "",
        open: false,
    });

    useEffect(() => {
        axios
            .get(`http://localhost:8000/api/stores/${id}`)
            .then((res) => {
                console.log(res);
                setFormData(res.data);
            })
            .catch((err) => console.log(err));
    }, [stores, id]);

    const changeHandler = (e) => {
        const value =
            e.target.type === "checkbox" ? e.target.checked : e.target.value;
        setFormData({
            ...formData,
            [e.target.name]: value,
        });
    };


    const handleSubmit = (e) => {
        e.preventDefault();

        axios
            .put(`http://localhost:8000/api/stores/${id}`, formData)
            .then((res) => {
                console.log(res);
                navigate(`/stores/${id}`);

                setFormData({
                    name: "",
                    number: "",
                    open: false,
                });

                const updatedStores = stores.map((store) => {
                    if (store._id === res.data._id) {
                        return res.data;
                    }
                    return store;
                });
                setStores(updatedStores);
            })
            .catch((err) => {
                console.log(err.response);
                setErrors(err.response.data.error.errors);
            });
    };

    return (
        <div>
            <Nav />
            <h2>Edit Store</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Store Name: </label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        value={formData.name}
                        onChange={changeHandler}
                    />
                    {errors.name && (
                        <p>{errors.name.message}</p>
                    ) }
                </div>
                <div>
                    <label htmlFor="number">Store Number: </label>
                    <input
                        type="number"
                        name="number"
                        id="number"
                        value={formData.number}
                        onChange={changeHandler}
                    />
                    {errors.number && (
                        <p>{errors.number.message}</p>
                    ) }
                </div>
                <div>
                    <label htmlFor="open">Open: </label>
                    <input
                        type="checkbox"
                        name="open"
                        id="open"
                        checked={formData.open}
                        onChange={changeHandler}
                    />
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default Edit