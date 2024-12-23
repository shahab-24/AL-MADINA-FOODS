import {
	createBrowserRouter,
	RouterProvider,
  } from "react-router-dom";
import HomeLayout from "../Layout/HomeLayout";
import Home from "../Pages/Home/Home";
import Register from "../Pages/Register/Register";
import Login from "../Pages/Login/Login";
import AvailableFoods from "../Pages/AvailableFoods";
import AddFood from "../Pages/AddFood";
import MyFood from "../Pages/MyFood";
import MyRequest from "../Pages/MyRequest";
import ErrorPage from "../Pages/ErrorPage";


  const router = createBrowserRouter([
	{
	  path: "/",
	  element: <HomeLayout></HomeLayout>,
	
	
	 
	  children:[{
		
		path: '/',
		element: <Home></Home>
	  },
	  {
		path: "register",
		element: <Register></Register>
	  } ,
	  {
		path: 'login',
		element: <Login></Login>
	  },
	  {
		path: 'availableFoods',
		element: <AvailableFoods></AvailableFoods>
	  },
	  {
		path: 'addFood',
		element: <AddFood></AddFood>
	  },
	  {
		path: 'myFood',
		element: <MyFood></MyFood>
	  },
	  {
		path: 'myRequest',
		element: <MyRequest></MyRequest>
	  },

	  ]
	  
	},
	{
		path: '*',
		element: <ErrorPage></ErrorPage>
	  },

  ]);

  export default router