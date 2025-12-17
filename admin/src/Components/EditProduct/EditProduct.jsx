import React, { useEffect, useState } from "react";
import "./EditProduct.css";
import upload_area from "../Assets/upload_area.svg";
import { backend_url } from "../../App";
import { useLocation, useNavigate } from "react-router-dom";

const EditProduct = () => {
  const [image, setImage] = useState(false);
  const [productDetails, setProductDetails] = useState({
    id: "",
    name: "",
    description: "",
    image: "",
    category: "women",
    new_price: "",
    old_price: ""
  });

  const location = useLocation();
  const navigate = useNavigate();
  // Get the product ID passed from the navigation state
  const productId = location.state?.id;

  // Fetch the existing product data when page loads
  useEffect(() => {
    const fetchProduct = async () => {
      if(productId) {
        await fetch(`${backend_url}/getproduct`, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id: productId }),
        })
        .then((res) => res.json())
        .then((data) => {
            setProductDetails(data);
        });
      }
    };
    fetchProduct();
  }, [productId]);

  const changeHandler = (e) => {
    setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
  };

  const updateProduct = async () => {
    let responseData;
    let product = productDetails;

    // 1. If a NEW image was uploaded, send it to the upload endpoint first
    if (image) {
      let formData = new FormData();
      formData.append('product', image);

      await fetch(`${backend_url}/upload`, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: formData,
      })
      .then((resp) => resp.json())
      .then((data) => { responseData = data });

      if (responseData.success) {
        product.image = responseData.image_url;
      }
    }

    // 2. Update the product data in the database
    await fetch(`${backend_url}/updateproduct`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    })
    .then((resp) => resp.json())
    .then((data) => {
        data.success ? alert("Product Updated") : alert("Failed");
        if(data.success) navigate('/listproduct'); // Go back to list after success
    });
  };

  return (
    <div className="addproduct"> 
      {/* Reusing 'addproduct' class to keep same styling */}
      <div className="addproduct-itemfield">
        <p>Product title</p>
        <input value={productDetails.name} onChange={changeHandler} type="text" name="name" placeholder="Type here" />
      </div>
      <div className="addproduct-itemfield">
        <p>Product description</p>
        <input value={productDetails.description} onChange={changeHandler} type="text" name="description" placeholder="Type here" />
      </div>
      <div className="addproduct-price">
        <div className="addproduct-itemfield">
          <p>Price</p>
          <input value={productDetails.old_price} onChange={changeHandler} type="number" name="old_price" placeholder="Type here" />
        </div>
        <div className="addproduct-itemfield">
          <p>Offer Price</p>
          <input value={productDetails.new_price} onChange={changeHandler} type="number" name="new_price" placeholder="Type here" />
        </div>
      </div>
      <div className="addproduct-itemfield">
        <p>Product category</p>
        <select value={productDetails.category} onChange={changeHandler} name="category" className="add-product-selector">
          <option value="women">Women</option>
          <option value="men">Men</option>
          <option value="kid">Kid</option>
        </select>
      </div>
      <div className="addproduct-itemfield">
        <p>Product image</p>
        <label htmlFor="file-input">
          {/* Logic to show new image preview OR existing image from backend */}
          <img className="addproduct-thumbnail-img" 
               src={image ? URL.createObjectURL(image) : (productDetails.image ? backend_url + productDetails.image : upload_area)} 
               alt="" />
        </label>
        <input onChange={(e) => setImage(e.target.files[0])} type="file" name="image" id="file-input" hidden />
      </div>
      <button onClick={updateProduct} className="addproduct-btn">UPDATE</button>
    </div>
  );
};

export default EditProduct;