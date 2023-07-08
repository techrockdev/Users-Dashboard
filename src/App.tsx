import { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { AuthContext } from "./components/context/AuthContext";
import { useAuth } from "./components/Global";
import { Dashboard } from "./components/Pages/Dashboard/Dashboard";
import { Login } from "./components/Pages/Login/Login";
import { SignUp } from "./components/Pages/SignUp/SignUp";
import { TransactionHistory } from "./components/Pages/TransactionHistory/TransactionHistory";

const App = () => {
  const authUser = useAuth();
  const { currentUser } = useContext(AuthContext);

  const RequireAuth = ({ children }: { children: any }) => {
    return currentUser ? children : <Navigate to="/login" />;
  };
  return (
    <div className="flex h-[100vh] w-full bg-primary font-inter tracking-wide">
      <div className="w-full">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<SignUp />} />
          <Route path="/signup" element={<SignUp />} />
          <Route
            path="/dashboard"
            element={
              <RequireAuth>
                <Dashboard />
              </RequireAuth>
            }
          />
          <Route
            path="/transaction-history"
            element={
              <RequireAuth>
                <TransactionHistory />
              </RequireAuth>
            }
          />
        </Routes>
      </div>
    </div>
  );
};

export default App;
