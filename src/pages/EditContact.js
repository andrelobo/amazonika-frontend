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
      toast.success(`updated [${userDetails.name}] contact`);

      setUserDetails({
        name: "",
        address: "",
        email: "",
        phone: "",
        city: "",
        price: "",
        info: "",
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
      setUserDetails({
        name: result.name,
        email: result.email,
        address: result.address,
        phone: result.phone,
        city: result.city,
        price: result.price,
        info: result.info,
      });
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <>
      {loading ? (
        <Spinner splash="Carregando clientes..." />
      ) : (
        <>
          <h2></h2>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="nameInput" className="form-label mt-4">
                Nome
              </label>
              <input
                type="text"
                className="form-control"
                id="nameInput"
                name="name"
                value={userDetails.name}
                onChange={handleInputChange}
                placeholder="John Doe"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="addressInput" className="form-label mt-4">
                Endereço
              </label>
              <input
                type="text"
                className="form-control"
                id="addressInput"
                name="address"
                value={userDetails.address}
                onChange={handleInputChange}
                placeholder="WalkStreet 05, California"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="emailInput" className="form-label mt-4">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="emailInput"
                name="email"
                value={userDetails.email}
                onChange={handleInputChange}
                placeholder="johndoe@example.com"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="phoneInput" className="form-label mt-4">
                Telefone
              </label>
              <input
                type="number"
                className="form-control"
                id="phoneInput"
                name="phone"
                value={userDetails.phone}
                onChange={handleInputChange}
                placeholder="92985930954"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="cityInput" className="form-label mt-4">
                Cidade
              </label>
              <input
                type="text"
                className="form-control"
                id="cityInput"
                name="city"
                value={userDetails.city}
                onChange={handleInputChange}
                placeholder="Manaus"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="priceInput" className="form-label mt-4">
                Preço
              </label>
              <input
                type="number"
                className="form-control"
                id="priceInput"
                name="price"
                value={userDetails.price}
                onChange={handleInputChange}
                placeholder="1000"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="infoInput" className="form-label mt-4">
                Info
              </label>
              <input
                type="text"
                className="form-control"
                id="info"
                name="info"
                value={userDetails.info}
                onChange={handleInputChange}
                placeholder="Obs importantes sobre as parcelas, se houver"
                required
              />
            </div>

            <div className="form-group">
              <input
                type="submit"
                value="Save Changes"
                className="btn btn-info my-2"
              />
            </div>
          </form>
        </>
      )}
    </>
  );
};

export default EditContact;
