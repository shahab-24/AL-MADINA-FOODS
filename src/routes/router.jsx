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
import FoodDetails from "../Components/FoodDetails";
import PrivateRoute from "./PrivateRoute";
import BecomeVolunteerForm from "../Pages/BecomeVolunteerForm";


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
		element:<PrivateRoute> <AddFood></AddFood></PrivateRoute>
	  },
	  {
		path: 'myFood',
		element: <PrivateRoute><MyFood></MyFood></PrivateRoute>
	  },
	  {
		path: 'myRequest',
		element: <PrivateRoute><MyRequest></MyRequest></PrivateRoute>
	  },
	  {
		path: 'food-details/:id',
		element: <FoodDetails></FoodDetails>
	  },{
        path: '/becomeVolunteer',
        element: <BecomeVolunteerForm></BecomeVolunteerForm>
      }
	  

	  ]
	  
	  
	},
	{
		path: '*',
		element: <ErrorPage></ErrorPage>
	  }
	

  ]);

  export default router