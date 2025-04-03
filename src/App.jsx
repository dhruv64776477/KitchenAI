import React, { createContext, useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import FridgePage from "./Pages/FridgePage.jsx";
import Header from "./Components/Header.jsx";
import GroceryPage from "./Pages/GroceryPage.jsx";
import HomePage from "./Pages/HomePage.jsx";
import MealsPage from "./Pages/MealsPage.jsx";
import MobileNav from "./Components/MobileNav.jsx";
import LoginSignupPage from "./Pages/LoginSignupPage.jsx";
import LandingPage from "./Pages/LandingPage.jsx";
import { AuthContext, AuthProvider } from "./Provider/AuthProvider.jsx"; // Import Auth Context


export const ThemeContext = createContext();

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };


  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return user ? children : <Navigate to="/welcome" />;
};

const App = () => {
  return (
    <AuthProvider>
      <ThemeContext.Provider value={{ darkMode: false, toggleDarkMode: () => {} }}>
        <Router>
          <Routes>
            {/* Public Routes */}
            <Route path="/welcome" element={<LandingPage />} />
            <Route path="/login" element={<LoginSignupPage />} />

            {/* Protected Routes */}
            <Route
              path="/*"
              element={
                <ProtectedRoute>
                  <div className="min-h-screen bg-gray-100 text-gray-900 flex flex-col">
                    <Header />
                    <main className="flex-1 pb-16">
                      <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/fridge" element={<FridgePage />} />
                        <Route path="/meals" element={<MealsPage />} />
                        <Route path="/grocery" element={<GroceryPage />} />
                      </Routes>
                    </main>
                    <MobileNav />
                  </div>
                </ProtectedRoute>
              }
            />
          </Routes>
        </Router>
      </ThemeContext.Provider>
    </AuthProvider>
  );
};

export default App;
