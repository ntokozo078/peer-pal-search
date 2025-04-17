
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Search from "./pages/Search";
import Resources from "./pages/Resources";
import ResourceUpload from "./pages/ResourceUpload";
import Profile from "./pages/Profile";
import BookSession from "./pages/BookSession";
import ManageSchedule from "./pages/ManageSchedule";
import Messages from "./pages/Messages";
import LeaveFeedback from "./pages/LeaveFeedback";
import AddSubject from "./pages/AddSubject";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/search" element={<Search />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/resources/upload" element={<ResourceUpload />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/:userId" element={<Profile />} />
          <Route path="/schedule/:tutorId" element={<BookSession />} />
          <Route path="/schedule" element={<ManageSchedule />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/feedback/:sessionId" element={<LeaveFeedback />} />
          <Route path="/subject/add" element={<AddSubject />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
