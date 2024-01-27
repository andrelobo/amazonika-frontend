import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import ToastContext from "../context/ToastContext";

const CreateContact = () => {
  const { toast } = useContext(ToastContext);
  const [userDetails, setUserDetails] = useState({
    name: "",
    address: "",
    email: "",
    phone: "",
    city: "",
    price: "", 
    info:""// Adicionei a propriedade "price" aqui
  });
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserDetails({ ...userDetails, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const res = await fetch(`http://localhost:7777/api/contact`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(userDetails),
    });

    const result = await res.json();
    if (!result.error) {
      toast.success(`Criado [${userDetails.name}] cliente`);
      setUserDetails({ name: "", address: "", email: "", phone: "", city: "", price: "" , info: ""}); 
    } else {
      toast.error(result.error);
    }
  };

  return (
    <>
      <h2>Crie seu contato</h2>
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
            placeholder="Rua Gonçaves Dias"
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
            placeholder="joao@example.com"
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
            placeholder="92999999999"
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
            type="text"
            className="form-control"
            id="priceInput"
            name="price"
            value={userDetails.price}
            onChange={handleInputChange}
            placeholder="0"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="infoInput" className="form-label mt-4">
            Informações
          </label>
          <input
            type="text"
            className="form-control"
            id="infoInput"
            name="info"
            value={userDetails.info}
            onChange={handleInputChange}
            placeholder="Obs importantes sobre as parcelas, se houver"
            required
          />
        </div>


        <input type="submit" value="Adicionar" className="btn btn-info my-2" />
      </form>
    </>
  );
};

export default CreateContact;
