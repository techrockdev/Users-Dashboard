import { Route, Routes } from "react-router-dom";
import { BalanceContextProvider } from "./components/context/Balancecontext/BalanceContext";
import { useAuth } from "./components/Global";
import { Dashboard } from "./components/Pages/Dashboard/Dashboard";
import { Login } from "./components/Pages/Login/Login";
import { SignUp } from "./components/Pages/SignUp/SignUp";
import { TransactionHistory } from "./components/Pages/TransactionHistory/TransactionHistory";

const App = () => {
  const { authUser, RequireAuth } = useAuth();

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
                <BalanceContextProvider>
                  <Dashboard />
                </BalanceContextProvider>
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
