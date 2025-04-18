
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Index from './pages/Index';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Search from './pages/Search';
import BookSession from './pages/BookSession';
import ManageSchedule from './pages/ManageSchedule';
import AddSubject from './pages/AddSubject';
import Messages from './pages/Messages';
import Resources from './pages/Resources';
import ResourceUpload from './pages/ResourceUpload';
import LeaveFeedback from './pages/LeaveFeedback';
import ForgotPassword from './pages/ForgotPassword';
import PaymentSuccess from './pages/PaymentSuccess';
import NotFound from './pages/NotFound';
import './App.css';
import { Toaster } from './components/ui/toaster';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile/:userId" element={<Profile />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/search" element={<Search />} />
        <Route path="/schedule/:tutorId" element={<BookSession />} />
        <Route path="/manage-schedule" element={<ManageSchedule />} />
        <Route path="/add-subject" element={<AddSubject />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/upload-resource" element={<ResourceUpload />} />
        <Route path="/feedback/:sessionId" element={<LeaveFeedback />} />
        <Route path="/payment-success" element={<PaymentSuccess />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;
