import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/login';
import Register from './pages/register';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import Dashboard from './pages/Dashboard';
import CreateGroup from './pages/CreateGroup';
import GroupDetails from './pages/GroupDetails';
import AddExpense from './pages/AddExpense';
import ExpenseDetails from './pages/ExpenseDetails';
import { AuthProvider, useAuth } from './context/AuthContext';
import AddPayment from './pages/AddPayment';

function PrivateRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/create-group" element={<CreateGroup />} />
          <Route path="/groups/:id" element={<GroupDetails />} />
          <Route path="/groups/:id/add-expense" element={<AddExpense />} />
          <Route path="/expenses/:id" element={<ExpenseDetails />} />
          <Route path="/expenses/:id/add-payment" element={<AddPayment />} />

        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
