import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const AddOrder = () => {
    const url = "http://localhost:4000";

    const [image, setImage] = useState(null);
    const [data, setData] = useState({
        name: "",
        description: "",
        price: "",
        category: "Beverages",
    });

    useEffect(() => {
        return () => {
            if (image) URL.revokeObjectURL(image.preview);
        };
    }, [image]);

    const onImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            file.preview = URL.createObjectURL(file);
            setImage(file);
        }
    };

    const onChangeHandler = (event) => {
        const { name, value } = event.target;
        setData((prevData) => ({ ...prevData, [name]: value }));
    };

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        try {
            const formData = new FormData();
            formData.append("name", data.name);
            formData.append("description", data.description);
            formData.append("price", Number(data.price));
            formData.append("category", data.category);
            formData.append("image", image);

            const response = await axios.post(`${url}/api/item/add`, formData);

            if (response.data.success) {
                setData({
                    name: "",
                    description: "",
                    price: "",
                    category: "Beverages",
                });
                setImage(null);
                toast.success(response.data.message);
            } else {
                toast.error(response.data.message);
            }
        } catch (err) {
            toast.error("An error occurred while adding the product.");
            console.error(err);
        }
    };

    const isFormValid = data.name && data.description && data.price && image;

    return (
        <div className="add-order">
            <form className="flex-col" onSubmit={onSubmitHandler}>
                <div className="add-order-img-upload flex-col">
                    <p>Upload Image</p>
                    <label htmlFor="image" aria-label="Upload Image">
                        <img
                            src="/milo.jpg"
                            alt={image ? "Preview of uploaded image" : "Upload area placeholder"}
                        />
                    </label>
                    <input
                        onChange={onImageChange}
                        type="file"
                        id="image"
                        hidden
                        required
                    />
                </div>
                <div className="add-order-product-name flex-col">
                    <p>Product Name</p>
                    <input
                        onChange={onChangeHandler}
                        value={data.name}
                        type="text"
                        name="name"
                        placeholder="Type here"
                        required
                    />
                </div>
                <div className="add-order-product-description flex-col">
                    <p>Product Description</p>
                    <textarea
                        onChange={onChangeHandler}
                        value={data.description}
                        name="description"
                        rows="6"
                        placeholder="Type product description here"
                        required
                    ></textarea>
                </div>
                <div className="add-order-category-price">
                    <div className="add-order-price flex-col">
                        <p>Product Price</p>
                        <input
                            onChange={onChangeHandler}
                            value={data.price}
                            type="number"
                            name="price"
                            placeholder="$20"
                            required
                        />
                    </div>
                </div>
                <button type="submit" className="add-order-btn" disabled={!isFormValid}>
                    ADD TO INVENTORY
                </button>
            </form>
        </div>
    );
};

export default AddOrder;
