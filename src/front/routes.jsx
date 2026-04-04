// Import necessary components and functions from react-router-dom.

import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
} from "react-router-dom";
import { Layout } from "./pages/Layout";
import { Home } from "./pages/Home";
import { Single } from "./pages/Single";
import { Demo } from "./pages/Demo";
import Administrators from "./pages/Administrators"
import Administrator from "./pages/Administrator";
import NewAdministrator from "./pages/NewAdministrator";
import UpdateAdministrator from "./pages/UpdateAdministrator";
import Users from "./pages/Users";
import User from "./pages/User";
import UpdateUser from "./pages/UpdateUser";
import NewUser from "./pages/NewUser";

export const router = createBrowserRouter(
    createRoutesFromElements(
    // CreateRoutesFromElements function allows you to build route elements declaratively.
    // Create your routes here, if you want to keep the Navbar and Footer in all views, add your new routes inside the containing Route.
    // Root, on the contrary, create a sister Route, if you have doubts, try it!
    // Note: keep in mind that errorElement will be the default page when you don't get a route, customize that page to make your project more attractive.
    // Note: The child paths of the Layout element replace the Outlet component with the elements contained in the "element" attribute of these child paths.

      // Root Route: All navigation will start from here.
      <Route path="/" element={<Layout />} errorElement={<h1>Not found!</h1>} >

        {/* Nested Routes: Defines sub-routes within the BaseHome component. */}
        <Route path= "/" element={<Home />} />
        <Route path="/single/:theId" element={ <Single />} />  {/* Dynamic route for single items */}
        <Route path="/demo" element={<Demo />} />

        {/* Administrators */}
        <Route path="/administrator" element={<Administrators />} />
        <Route path="/new_administrator" element={<NewAdministrator />} />
        <Route path="/update_administrator/:adminId" element={<UpdateAdministrator />} />
        <Route path="/administrator/:adminId" element={ <Administrator />} />

        {/* Users */}
        <Route path="/user" element={<Users />} />
        <Route path="/new_user" element={<NewUser />} />
        <Route path="/update_user/:userId" element={<UpdateUser />} />
        <Route path="/user/:userId" element={ <User />} />
      </Route>
    )
);