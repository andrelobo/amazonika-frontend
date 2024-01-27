import { useContext, useState } from "react";
import { Link } from "react-router-dom";

import AuthContext from "../context/AuthContext";
import ToastContext from "../context/ToastContext";

const Register = () => {
  const { toast } = useContext(ToastContext);
  const { registerUser } = useContext(AuthContext);

  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (
      !credentials.email ||
      !credentials.password ||
      !credentials.confirmPassword
    ) {
      toast.error("please enter all the required fields!");
      return;
    }

    if (credentials.password !== credentials.confirmPassword) {
      toast.error("senhas não são iguais!");
      return;
    }

    const userData = { ...credentials, confirmPassword: undefined };
    registerUser(userData);
  };

  return (
    <>
      <h3>Crie sua conta</h3>

      <form onSubmit={handleSubmit}>
        <div class="form-group">
          <label for="nameInput" class="form-label mt-4">
            Nome
          </label>
          <input
            type="text"
            class="form-control"
            id="nameInput"
            name="name"
            value={credentials.name}
            onChange={handleInputChange}
            placeholder="John Doe"
            required
          />
        </div>
        <div class="form-group">
          <label for="emailInput" class="form-label mt-4">
            Email
          </label>
          <input
            type="email"
            class="form-control"
            id="emailInput"
            aria-describedby="emailHelp"
            name="email"
            value={credentials.email}
            onChange={handleInputChange}
            placeholder="johndoe@example.com"
            required
          />
        </div>
        <div class="form-group">
          <label for="passwordInput" class="form-label mt-4">
            Senha
          </label>
          <input
            type="password"
            class="form-control"
            id="passwordInput"
            name="password"
            value={credentials.password}
            onChange={handleInputChange}
            placeholder="Enter Password"
            required
          />
        </div>
        <div class="form-group">
          <label for="confirmPassword" class="form-label mt-4">
            Confirme a senha
          </label>
          <input
            type="password"
            class="form-control"
            id="confirmPassword"
            name="confirmPassword"
            value={credentials.confirmPassword}
            onChange={handleInputChange}
            placeholder="Enter Password"
            required
          />
        </div>
        <input
          type="submit"
          value="Register"
          className="btn btn-primary my-3"
        />
        <p>
          Já tem uma conta ? <Link to="/login">Login</Link>
        </p>
      </form>
    </>
  );
};

export default Register;
