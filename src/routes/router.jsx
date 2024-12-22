import {
	createBrowserRouter,
	RouterProvider,
  } from "react-router-dom";
import HomeLayout from "../Layout/HomeLayout";
import Home from "../Pages/Home/Home";


  const router = createBrowserRouter([
	{
	  path: "/",
	  element: <HomeLayout></HomeLayout>,
	  children:[{
		
		path: '/',
		element: <Home></Home>
	  }
	  ]
	},
  ]);

  export default router