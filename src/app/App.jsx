import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
// Pages
import { MyJobApplication } from "./pages/MyJobApplication";
import { CommunityPage } from "./pages/CommunityPage";
import { FeaturesPage } from "./pages/Features";
import { AiChatPage } from "./pages/AiChatPage";
import { SalaryPage } from "./pages/SalaryPage";
import { ProfilePage } from "./pages/Profile";
import { CompanyJobsPage } from "./pages/CompanyJobs";
import { CompanyJobDetailsPage } from "./pages/CompanyJobDetails";
import { CompanyCommunityPage } from "./pages/CompanyCommunity";
import { CompanyFeaturesPage } from "./pages/CompanyFeatures";
import { CompanyAiChatPage } from "./pages/CompanyAiChatPage";
import { CompanyProfile } from "./pages/CompanyProfile";
import UserSignUp from "./pages/UserSignUp";
import UserLogin from "./pages/UserLogin";
import CompanyLogin from "./pages/CompanyLogin";
import CompanySignUp from "./pages/CompanySignUp";

// Context
import { AppProvider } from "./components/AppContext";

const router = createBrowserRouter([
  { path: "/", Component: UserLogin },
  { path: "/UserSignUp", Component: UserSignUp },
  { path: "/CompanyLogin", Component: CompanyLogin },
  { path: "/CompanySignUp", Component: CompanySignUp },
  { path: "/MyJobApplication", Component: MyJobApplication },
  { path: "/Community", Component: CommunityPage },
  { path: "/Features", Component: FeaturesPage },
  { path: "/resume", Component: AiChatPage },
  { path: "/analyze", Component: AiChatPage },
  { path: "/ai-chat", Component: AiChatPage },
  { path: "/salary", Component: SalaryPage },
  { path: "/Profile", Component: ProfilePage },
  { path: "/CompanyJobs", Component: CompanyJobsPage },
  { path: "/CompanyJobs/:jobId", Component: CompanyJobDetailsPage },
  { path: "/CompanyCommunity", Component: CompanyCommunityPage },
  { path: "/CompanyFeatures", Component: CompanyFeaturesPage },
  { path: "/company/cv-scoring", Component: CompanyAiChatPage },
  { path: "/company/ai-chat", Component: CompanyAiChatPage },
  { path: "/CompanyProfile", Component: CompanyProfile },
  { path: "*", Component: UserLogin },
]);

export default function App() {
  return (
    <AppProvider>
      <RouterProvider router={router} />
    </AppProvider>
  );
}