import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import AuthContext from "../context/AuthContext";
import ToastContext from "../context/ToastContext";

const EditContact = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { user } = useContext(AuthContext);
  const { toast } = useContext(ToastContext);

  const [userDetails, setUserDetails] = useState({
    name: "",
    address: "",
    email: "",
    phone: "",
    city: "",
    price: "",
    info: "",
    date: "",
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserDetails({ ...userDetails, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const res = await fetch(`https://otica-backend-app.onrender.com/api/contact`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ id, ...userDetails }),
    });
    const result = await res.json();
    if (!result.error) {
      toast.success(`Updated [${userDetails.name}] contact`);
      setUserDetails({
        name: "",
        address: "",
        email: "",
        phone: "",
        city: "",
        price: "",
        info: "",
        date: "",
      });
      navigate("/mycontacts");
    } else {
      toast.error(result.error);
    }
  };

  useEffect(async () => {
    setLoading(true);
    try {
      const res = await fetch(`https://otica-backend-app.onrender.com/api/contact/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const result = await res.json();
  
      // Convert ISODate to 'YYYY-MM-DD' format
      const isoDate = result.date;
      const formattedDate = isoDate ? new Date(isoDate).toISOString().split('T')[0] : '';
  
      setUserDetails({
        name: result.name,
        email: result.email,
        address: result.address,
        phone: result.phone,
        city: result.city,
        price: result.price,
        info: result.info,
        date: formattedDate,
      });
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  }, [id]);
  

  return (
    <div className="container">
      {loading ? (
        <Spinner splash="Loading clients..." />
      ) : (
        <>
          <h2>Edit Contact</h2>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="nameInput" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                id="nameInput"
                name="name"
                value={userDetails.name}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="addressInput" className="form-label">
                Address
              </label>
              <input
                type="text"
                className="form-control"
                id="addressInput"
                name="address"
                value={userDetails.address}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="emailInput" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="emailInput"
                name="email"
                value={userDetails.email}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="phoneInput" className="form-label">
                Phone
              </label>
              <input
                type="number"
                className="form-control"
                id="phoneInput"
                name="phone"
                value={userDetails.phone}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="dateInput" className="form-label">
                Purchase Date
              </label>
              <input
                type="date"
                className="form-control"
                id="dateInput"
                name="date"
                value={userDetails.date}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="cityInput" className="form-label">
                City
              </label>
              <input
                type="text"
                className="form-control"
                id="cityInput"
                name="city"
                value={userDetails.city}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="priceInput" className="form-label">
                Price
              </label>
              <input
                type="number"
                className="form-control"
                id="priceInput"
                name="price"
                value={userDetails.price}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="infoInput" className="form-label">
                Info
              </label>
              <input
                type="text"
                className="form-control"
                id="infoInput"
                name="info"
                value={userDetails.info}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="mb-3">
              <button type="submit" className="btn btn-info">
                Save Changes
              </button>
            </div>
          </form>
        </>
      )}
    </div>
  );
};

export default EditContact;
