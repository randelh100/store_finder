import React from 'react'
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Nav from './Nav'

const Create = () => {
    const handleSubmit = (e) => {
        e.preventDefault();

        axios
            .post("http://localhost:8000/api/stores", formData)
            .then((res) => {
                console.log(res);
                navigate(`/stores/${res.data._id}`);
                setFormData({
                    name: "",
                    number: "",
                    open: false,
                });
            })
            .catch((err) => {
                console.log(err.response);
                setErrors(err.response.data.error.errors);
            });

    };
    const [formData, setFormData] = useState({
        name: "",
        number: "",
        open: false,
    });

    const [errors, setErrors] = useState({});

    const navigate = useNavigate();

    const changeHandler = (e) => {
        const value =
            e.target.type === "checkbox" ? e.target.checked : e.target.value;
        setFormData({
            ...formData,
            [e.target.name]: value,
        });
    };

    return (
        <div>
            <Nav />
            <h2>Add a New Store</h2>
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
                    {errors.name && <p>{errors.name.message}</p>}
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
                    {errors.number && <p>{errors.number.message}</p>}
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
                    {errors.open && <p>{errors.open.message}</p>}
                    </div>
                    <button type="submit">Add Store</button>
            </form>
        </div>
    )
}

export default Create