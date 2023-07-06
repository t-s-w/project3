import { useState, createContext } from 'react'
import { Routes, Route } from 'react-router-dom'
import AllEventsPage from '../AllEventsPage/AllEventsPage.jsx'
import EventDetailsPage from '../EventDetailsPage/EventDetailsPage';
import './App.css'
import NavBar from "../../components/NavBar";
import SignUpPage from '../SignUpPage/SignUpPage';
import UserDetailPage from "../UserDetailPage/UserDetailPage";
import { getUser } from "../../utilities/users-service";
import LoginForm from "../../components/LoginForm.jsx";
import OrderPage from "../OrderPage/OrderPage";
import Categories from '../CategoriesPage/CategoriesPage';
import EventsByCategory from '../CategoriesPage/EventsByCategory';
import SearchResults from '../SearchResults/SearchResults';
import PurchaseHistory from '../PurchaseHistory/PurchaseHistory'
import UserPasswordPage from "../UserPasswordPage/UserPasswordPage";
import ConfirmPurchasePage from '../ConfirmPurchasePage/ConfirmPurchasePage';
import VerifyReceiptPage from '../VerifyReceiptPage/VerifyReceiptPage.jsx';
import ForYouPage from "../ForYouPage/ForYouPage";


export const UserContext = createContext();

function App() {
  const [user, setUser] = useState(getUser());
  const [searchResults, setSearchResults] = useState();
  return (
    <>
      <UserContext.Provider value={{ user, setUser }}>
        <NavBar
          searchResults={searchResults}
          setSearchResults={setSearchResults}
        />
        <main className="flex flex-col justify-around flex-1">
          <Routes>
            <Route
              path="/"
              element={<AllEventsPage />}
            />
            <Route path="/events" element={<AllEventsPage />} />
            <Route path="/events/:id" element={<EventDetailsPage />} />
            <Route
              path="/events/categories/categories"
              element={<Categories />}
            />
            <Route
              path="/events/categories/categories/:categoryName"
              element={<EventsByCategory />}
            />
            <Route path="/foryou" element={<ForYouPage />} />
            <Route
              path="/events/search/:searchResults"
              element={<SearchResults searchResults={searchResults} />}
            />
            <Route path="/signup" element={<SignUpPage setUser={setUser} />} />
            <Route path="/user/profile" element={<UserDetailPage />} />
            <Route path="/user/password" element={<UserPasswordPage />} />
            <Route path="/login" element={<LoginForm setUser={setUser} />} />
            <Route path="/events/:id/order" element={<OrderPage />} />
            <Route path="/confirmPurchase" element={<ConfirmPurchasePage />} />
            <Route path="/purchasehistory" element={<PurchaseHistory />} />
            <Route path="/verify/:id" element={<VerifyReceiptPage />} />
          </Routes>
        </main>
      </UserContext.Provider>
    </>
  );
}

export default App
