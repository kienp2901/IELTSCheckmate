import React, { Suspense, lazy } from "react";
// import {  BrowserRouter } from 'react-router-dom';
import { Box, CssBaseline } from "@mui/material";
import Layout from "./components/Layout";
import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import { CustomBreadcrumbProvider } from "./contexts/CustomBreadcrumb";
import BreadcrumbsComponent from "./components/BreadcrumbsComponent";
import { AvatarProvider } from "./contexts/AvatarContext";
import LandingPage from "./pages/Home";
import LayoutManager from "./components/LayoutManager";
import { useUser } from "./contexts/UserContext";
import { DialogProvider } from "./contexts/DialogContext";
import { ScrollProvider } from "./contexts/ScrollContext";
import ContactLayout from "./pages/Contact/ContactLayout";
import ContactForm from "./pages/Contact/ContactForm";
import RegisterLayout from "./pages/Register/RegisterLayout";
import RegisterForm from "./pages/Register/RegisterForm";
import ThankyouLayout from "./pages/Thankyou/ThankyouLayout";
import ThankyouForm from "./pages/Thankyou/ThankyouForm";
import TermsLayout from "./pages/Terms/TermsLayout";
import TermsContent from "./pages/Terms/TermsContent";
import PrivacyLayout from "./pages/Privacy/PrivacyLayout";
import PrivacyContent from "./pages/Privacy/PrivacyContent";
import PaymentLayout from "./pages/Payment/PaymentLayout";
import PaymentContent from "./pages/Payment/PaymentContent";
// const Home = lazy(() => import('./pages/Home'));
// const PackageManagement = lazy(() => import('./pages/PackageManagement'));

// const LoadingComponent = () => <div>Loading...</div>; // Custom loading component
// const SuspenseWrapper = (...props:React.LazyExoticComponent<React.FC<{}>>[]) => {
//   return <Suspense fallback={<LoadingComponent />}>
//   {props.map((Element)=>{
//     return <Element />
//   })}
// </Suspense>
// }

function App() {
  const { user } = useUser();
  return (
    <>
      <ScrollProvider>
        <AvatarProvider>
          <BrowserRouter>
            <DialogProvider>
              <Routes>
                {/* <Route index Component={LandingPage}  /> */}
                {/* <Route path="/wordpress/" Component={Layout}>
                  <Route index Component={LandingPage} />
                </Route>
                <Route path="/wordpress/contact" Component={ContactLayout}>
                  <Route index Component={ContactForm} />
                </Route>
                <Route path="/wordpress/register" Component={RegisterLayout}>
                  <Route index Component={RegisterForm} />
                </Route>
                <Route path="/wordpress/thankyou" Component={ThankyouLayout}>
                  <Route index Component={ThankyouForm} />
                </Route>
                <Route path="/wordpress/terms" Component={TermsLayout}>
                  <Route index Component={TermsContent} />
                </Route>
                <Route path="/wordpress/privacy" Component={PrivacyLayout}>
                  <Route index Component={PrivacyContent} />
                </Route>
                <Route path="/wordpress/payment" Component={PaymentLayout}>
                  <Route index Component={PaymentContent} />
                </Route> */}

                <Route path="/" Component={Layout}>
                  <Route index Component={LandingPage} />
                </Route>
                <Route path="/contact" Component={ContactLayout}>
                  <Route index Component={ContactForm} />
                </Route>
                <Route path="/register" Component={RegisterLayout}>
                  <Route index Component={RegisterForm} />
                </Route>
                <Route path="/thankyou" Component={ThankyouLayout}>
                  <Route index Component={ThankyouForm} />
                </Route>
                <Route path="/terms" Component={TermsLayout}>
                  <Route index Component={TermsContent} />
                </Route>
                <Route path="/privacy" Component={PrivacyLayout}>
                  <Route index Component={PrivacyContent} />
                </Route>
                <Route path="/payment" Component={PaymentLayout}>
                  <Route index Component={PaymentContent} />
                </Route>
              </Routes>
            </DialogProvider>
          </BrowserRouter>
        </AvatarProvider>
      </ScrollProvider>
    </>
  );
}

export default App;
