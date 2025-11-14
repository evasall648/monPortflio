/*import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import heartImage from "../../assets/Image_PageDOCTEUR_Et_PRINCIPAL/cli.png";

// Interface pour la réponse de l'API de connexion
interface LoginResponse {
  token: string;
  user?: {
    id: string;
    email: string;
    role: string;
    // Ajoutez d'autres champs selon votre API
  };
}

// Configuration de l'API
const api = axios.create({
  baseURL: "http://localhost:3002", // Vérifiez que votre backend fonctionne sur ce port
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 5000, // Ajout d'un timeout pour éviter des attentes infinies
});

const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  // États pour gérer les données du formulaire et les erreurs
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Fonction de gestion de la connexion
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();name
    setError("");
    setIsLoading(true);

    try {
      const response = await api.post<LoginResponse>("/auth/login", {
        email,
        password,
      });

      // Stocker le token dans le localStorage
      localStorage.setItem("token", response.data.token);

      // Récupérer les informations de l'utilisateur si elles sont dans la réponse
      if (response.data.user) {
        localStorage.setItem("user", JSON.stringify(response.data.user));
      }

      alert("Connexion réussie !");

      // Redirection selon le rôle (à implémenter selon votre logique)
      navigate("/admin");
    } catch (err: any) {
      // Gestion détaillée des erreurs
      if (err.code === "ERR_NETWORK" || err.code === "ECONNREFUSED") {
        setError("Impossible de se connecter au serveur. Vérifiez qu'il est en marche.");
      } else if (err.response) {
        // Erreur HTTP (ex: 400, 401, 500)
        setError(err.response.data.message || "Identifiants incorrects");
      } else {
        // Autres erreurs inattendues
        setError("Une erreur est survenue. Veuillez réessayer.");
      }
      console.error("Erreur de connexion:", err); // Pour le débogage
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      {/*Section image à gauche (visible sur grand écran) }
      <div className="hidden lg:flex flex-col items-center justify-center w-1/2 bg-green-50 p-0">
        <div className="w-full h-full flex items-center justify-center">
          <img
            src={heartImage}
            alt="Heart Illustration"
            className="w-full h-full object-cover max-h-screen"
          />
        </div>
        <h1 className="text-3xl font-bold text-green-900 absolute bottom-4"></h1>
      </div>

      {/* Section formulaire à droite }
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center px-8 bg-gray-800 text-white">
        <h2 className="text-2xl font-bold">Bienvenue à la Clinique des Miracles</h2>
        <p className="text-gray-300 text-sm mt-1">
          Besoin d'un compte ?
          <Link to="/signup" className="text-green-400 hover:underline ml-1">
            S'inscrire
          </Link>
        </p>

        {/* Boutons de rôle }
        <div className="flex gap-4 mt-4">
          <button
            className="bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700 transition-colors duration-200"
            onClick={() => navigate("/admin")}
            disabled={isLoading}
          >
            Admin
          </button>
          <button
            className="bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700 transition-colors duration-200"
            onClick={() => navigate("/doctor")}
            disabled={isLoading}
          >
            Docteur
          </button>
          <button
            className="bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700 transition-colors duration-200"
            onClick={() => navigate("/patient")}
            disabled={isLoading}
          >
            Patient
          </button>
        </div>

        {/* Formulaire de connexion }
        <form onSubmit={handleLogin} className="mt-6 w-full max-w-sm">
          {/* Message d'erreur }
          {error && (
            <div className="text-red-400 text-sm mb-4 text-center">{error}</div>
          )}

          {/* Champ Nom d'utilisateur }
          <label className="block text-gray-300">Nom d'utilisateur*</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Entrez votre nom d'utilisateur"
            className="w-full px-4 py-2 border rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-green-400 focus:outline-none"
            required
            disabled={isLoading}
          />

          {/* Champ Mot de passe }
          <label className="block mt-4 text-gray-300">Mot de passe*</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Entrez votre mot de passe"
            className="w-full px-4 py-2 border rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-green-400 focus:outline-none"
            required
            disabled={isLoading}
          />

          {/* Options supplémentaires }
          <div className="flex justify-between items-center mt-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="mr-2 accent-green-600"
                disabled={isLoading}
              />
              Se souvenir de moi
            </label>
            <Link
              to="/forgot-password"
              className="text-green-400 text-sm hover:underline"
            >
              Mot de passe oublié ?
            </Link>
          </div>

          {/* Bouton de connexion }
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-lg mt-6 hover:bg-green-700 transition-colors duration-200 disabled:bg-green-400"
            disabled={isLoading}
          >
            {isLoading ? "Connexion en cours..." : "Connexion"}
          </button>
        </form>

        {/* Séparateur "OU" }
        <div className="mt-6 text-gray-300 text-sm">OU</div>

        {/* Boutons de connexion sociale }
        <div className="flex gap-4 mt-2">
          <button
            type="button"
            className="border p-2 rounded-full hover:bg-gray-700 transition-colors duration-200 disabled:opacity-50"
            aria-label="Login with Google"
            disabled={isLoading}
          >
            <i className="fab fa-google"></i>
          </button>
          <button
            type="button"
            className="border p-2 rounded-full hover:bg-gray-700 transition-colors duration-200 disabled:opacity-50"
            aria-label="Login with Facebook"
            disabled={isLoading}
          >
            <i className="fab fa-facebook"></i>
          </button>
          <button
            type="button"
            className="border p-2 rounded-full hover:bg-gray-700 transition-colors duration-200 disabled:opacity-50"
            aria-label="Login with Twitter"
            disabled={isLoading}
          >
            <i className="fab fa-twitter"></i>
          </button>
          <button
            type="button"
            className="border p-2 rounded-full hover:bg-gray-700 transition-colors duration-200 disabled:opacity-50"
            aria-label="Login with LinkedIn"
            disabled={isLoading}
          >
            <i className="fab fa-linkedin"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;*/
// pages/LoginPage.tsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthService } from "../../services/api";
import heartImage from "../../assets/Image_PageDOCTEUR_Et_PRINCIPAL/cli.png";
import {jwtDecode} from "jwt-decode";
import axios from 'axios';


interface JwtPayload{
  role: any;
  id: string;
  email: string;
}

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);


    try{
      const reponse = await axios.post(
        "http://localhost:3002/auth/login",
        {email, password},
        {headers: {"Content-Type": "application/json"}}
      )
      console.log(reponse.data);
      const { access_token } = reponse.data;
      const decodedToken = jwtDecode<JwtPayload>(access_token);
      console.log("JWT décodé côté frontend :", decodedToken); 
      localStorage.setItem("token", access_token);


     // navigate("/dashboard");
     switch (decodedToken.role) {
      case "admin":
        navigate("/admin");
        break;
      case "medecin":
        navigate("/doctor");
        break;
      case "patient":
        navigate("/patient");
        break;
     // default:
      //  navigate("/dashboard");
    }

    }
    catch (err: any) {
      console.error(err); // pour afficher l'erreur complète dans la console
      if (err.response && (err.response.status === 401 || err.response.status === 404)) {
        setError("Email ou mot de passe incorrect");
      } else {
        setError("Erreur lors de la connexion");
      }  
      
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Section image à gauche (visible sur grand écran) */}
      <div className="hidden lg:flex flex-col items-center justify-center w-1/2 bg-green-50 p-0">
        <div className="w-full h-full flex items-center justify-center">
          <img 
            src={heartImage} 
            alt="Heart Illustration" 
            className="w-full h-full object-cover max-h-screen"
          />
        </div>
        <h1 className="text-3xl font-bold text-green-900 absolute bottom-4"></h1>
      </div>

      {/* Section formulaire à droite */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center px-8 bg-gray-800 text-white">
        <h2 className="text-2xl font-bold">Bienvenue à la Clinique des Miracles</h2>
        <p className="text-gray-300 text-sm mt-1">
          Besoin d'un compte ? 
          <Link 
            to="/signup" 
            className="text-green-400 hover:underline ml-1"
          >
            S'inscrire
          </Link>
        </p>

        {/* Boutons de rôle */}
        <div className="flex gap-4 mt-4">
          <button
            className="bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700 transition-colors duration-200"
            onClick={() => navigate("/admin")}
          >
            Admin
          </button>
          <button
            className="bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700 transition-colors duration-200"
            onClick={() => navigate("/doctor")}
          >
            Docteur
          </button>
          <button
            className="bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700 transition-colors duration-200"
            onClick={() => navigate("/patient")}
          >
            Patient
          </button>
        </div>
        





        <form onSubmit={handleLogin} className="mt-6 w-full max-w-sm">
          <label className="block text-gray-300">Email*</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Entrez votre email"
            className="w-full px-4 py-2 border rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-green-400"
            required
          />

          <label className="block mt-4 text-gray-300">Mot de passe*</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Entrez votre mot de passe"
            className="w-full px-4 py-2 border rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-green-400"
            required
          />
          <div className="flex justify-between items-center mt-4">
            <label className="flex items-center">
              <input 
                type="checkbox" 
                className="mr-2 accent-green-600" 
              />
              Se souvenir de moi
            </label>
            <Link 
              to="/forgot-password" 
              className="text-green-400 text-sm hover:underline"
            >
              Mot de passe oublié ?
            </Link>
          </div>


          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-lg mt-6 hover:bg-green-700 transition-colors duration-200 disabled:bg-green-800 disabled:cursor-not-allowed"
            disabled={isLoading}
          >
            {isLoading ? "Connexion en cours..." : "Connexion"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;