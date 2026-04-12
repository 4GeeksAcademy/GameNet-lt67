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

import Administrators from "./pages/Administrators/Administrators";
import NewAdministrator from "./pages/Administrators/NewAdministrator";
import UpdateAdministrator from "./pages/Administrators/UpdateAdministrator";
import Administrator from "./pages/Administrators/Administrator";

import Users from "./pages/Users/Users";
import NewUser from "./pages/Users/NewUser";
import UpdateUser from "./pages/Users/UpdateUser";
import User from "./pages/Users/User";

import Companies from "./pages/Company/Companies";
import NewCompany from "./pages/Company/NewCompany";
import UpdateCompany from "./pages/Company/UpdateCompany";
import Company from "./pages/Company/Company";

import Games from "./pages/Games/Games";
import Game from "./pages/Games/Game";
import NewGame from "./pages/Games/NewGame";
import UpdateGame from "./pages/Games/UpdateGame";
import CompanyPost from "./pages/CompanyPost/CompanyPost";
import CompanyPosts from "./pages/CompanyPost/CompanyPosts";
import UpdateCompanyPost from "./pages/CompanyPost/UpdateCompanyPost";
import NewCompanyPost from "./pages/CompanyPost/NewCompanyPost";

import Console from "./pages/Consoles/Console";
import Consoles from "./pages/Consoles/Consoles";
import NewConsole from "./pages/Consoles/NewConsole";
import UpdateConsole from "./pages/Consoles/UpdateConsole";
import GameConsole from "./pages/GameConsole/GameConsole";
import GameConsoleList from "./pages/GameConsole/GameConsoleList";
import ConsoleFavoritesList from "./pages/ConsoleFavorites/ConsoleFavoritesList";
import ConsoleFavorites from "./pages/ConsoleFavorites/ConsoleFavorites";
import GameFavoriteList from "./pages/GameFavorites/GameFavoritesList";
import GameFavorites from "./pages/GameFavorites/GameFavorites";
import LoginUser from "./pages/UserInterface/LoginUser";
import SignUpUser from "./pages/UserInterface/SignUpUser";
import GamesUser from "./pages/UserInterface/GamesUser";
import GameDetails from "./pages/UserInterface/GameDetails";

import PostDetails from "./pages/UserInterface/PostDetails";
import EditUser from "./pages/UserInterface/EditUser";
import MyGames from "./pages/UserInterface/MyGames";
import MyLikes from "./pages/UserInterface/MyLikes";
import ConsolesUser from "./pages/UserInterface/ConsolesUser";
import MyConsoles from "./pages/UserInterface/MyConsoles";
import MyComments from "./pages/UserInterface/MyComments";
import LoginCompany from "./pages/CompanyInterface/LoginCompany";
import { CompanyDashboard } from "./pages/CompanyInterface/CompanyDashboard";
import SignUpCompany from "./pages/CompanyInterface/SignUpCompany";

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

        {/* Companies */}
        <Route path="/company" element={<Companies />} />
        <Route path="/new_company" element={<NewCompany />} />
        <Route path="/update_company/:companyId" element={<UpdateCompany />} />
        <Route path="/company/:companyId" element={ <Company />} />

        {/* Games */}
        <Route path="/game" element={<Games />} />
        <Route path="/new_game" element={<NewGame />} />
        <Route path="/update_game/:gameId" element={<UpdateGame />} />
        <Route path="/game/:gameId" element={ <Game />} />

        {/* Company Post */}
        <Route path="/companypost" element={<CompanyPosts />} />
        <Route path="/new_companypost" element={<NewCompanyPost />} />
        <Route path="/update_companypost/:companyPostId" element={<UpdateCompanyPost />} />
        <Route path="/companypost/:companyPostId" element={ <CompanyPost />} />


         {/* Consoles */}
        <Route path="/console" element={<Consoles />} />
        <Route path="/new_console" element={<NewConsole />} />
        <Route path="/update_console/:consoleId" element={<UpdateConsole />} />
        <Route path="/console/:consoleId" element={ <Console />} />

        {/* GameConsole */}
        <Route path="/gameconsole" element={<GameConsole />} />
        <Route path="/gameconsolelist" element={<GameConsoleList />} />

        {/* ConsoleFavorites */}
        <Route path="/console/favorites" element={<ConsoleFavorites />} />
        <Route path="/console/favorites/:userId" element={<ConsoleFavoritesList />} />

        {/* GameFavorites */}
        <Route path="/game/favorites" element={<GameFavorites />} />
        <Route path="/game/favorites/:userId" element={<GameFavoriteList />} />

        {/* User Interface */}
        <Route path="/login" element={<LoginUser />} />
        <Route path="/signup" element={<SignUpUser />} />

        <Route path="/games" element={<GamesUser />} />
        <Route path="/consoles" element={<ConsolesUser />} />
        <Route path="/games/:gameId" element={<GameDetails />} />
        <Route path="/post/:postId" element={ <PostDetails />} />
        <Route path="/profile/edit/:userId" element={<EditUser />} />
        <Route path="/my-games" element={ <MyGames />} />
        <Route path="/my-likes" element={ <MyLikes />} />
        <Route path="/my-comments" element={ <MyComments />} />
        <Route path="/my-consoles" element={ <MyConsoles />} />

        {/* Company Interface */}
        <Route path="/company/login" element={<LoginCompany />} />
        <Route path="/company/signup" element={<SignUpCompany />} />

        <Route path="/company/dashboard" element={ <CompanyDashboard />} />
      </Route>
    )
);