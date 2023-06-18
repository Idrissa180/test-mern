import React, { useEffect, useState } from "react";
import { publicRequest } from "../requestMethods";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [activeProduct, setActiveProduct] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0);
  const [user, setUser] = useState({});

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await publicRequest.get(`products`);
        setProducts(res.data);
        setActiveProduct(res.data[0]);
      } catch (err) {}
    };
    getProducts();
  }, []);

  // Fonction pour mettre à jour ActiveProduct en fonction de title
  const updateActiveProduct = (e) => {
    const foundProduct = products.find(
      (product) => product.title.toLowerCase() === e.target.value.toLowerCase()
    );
    setActiveProduct(foundProduct || null);
    setQuantity(1);
    setPrice(foundProduct.unityPrice);
  };

  const handleChange = ({ currentTarget }) => {
    const { name, value } = currentTarget;
    setUser({ ...user, [name]: value });
  };

  const handleQuantity = (e) => {
    if (e.target.value >= 1) {
      setQuantity(e.target.value);
      setPrice(e.target.value * activeProduct.unityPrice);
    } else {
      setQuantity(1);
      setPrice(activeProduct.unityPrice);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await publicRequest.post("orders", {
        productId: activeProduct._id,
        name: user.name,
        phone: user.phone,
        adress: user.adress,
        quantity: quantity,
        price: price,
      });
      alert("Order done!!")
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="img_container">
        <img src={activeProduct.image} alt="product" />
      </div>
      <form className="form_order">
        <label>Product</label>
        <select name="productId" onChange={updateActiveProduct}>
          {products?.map((item) => (
            <option key={item._id} value={item.title}>
              {item.title}
            </option>
          ))}
        </select>
        <div className="grid-3">
          <div>
            <label>Quantity</label>
            <input
              type="number"
              value={quantity}
              onChange={handleQuantity}
              required
            />
          </div>
          <div>
            <label>Unity price</label>
            <p>{`$ ${activeProduct?.unityPrice}`} </p>
          </div>
          <div>
            <label>Total price</label>
            <p>{`$ ${price}`} </p>
          </div>
        </div>
        <label>Name</label>
        <input
          type="text"
          placeholder="EX: Sara Lanoudi"
          name="name"
          onChange={handleChange}
          required
        />
        <label>Phone</label>
        <input
          type="text"
          placeholder="EX: 0689021736"
          name="phone"
          onChange={handleChange}
          required
        />
        <label>Adress</label>
        <textarea
          type="text"
          placeholder="EX: Casablanca, Quartier Hopitaux ..."
          name="adress"
          onChange={handleChange}
          required
        />
        <div className="button_container">
          <button onClick={handleSubmit}>Validate</button>
        </div>
      </form>
    </>
  );
};

export default Product;
