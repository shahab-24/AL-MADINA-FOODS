// import { useEffect, useState } from "react";
// import useAuth from "../Hooks/useAuth";
// import axios from "axios";


// const AvailableFoods = () => {
// 	const {user }= useAuth()
// 	 const [foods, setFoods] = useState([])

// 	 useEffect(() => {
// 		axios.get('http://localhost:3000/add-foods')
// 		.then(response => {
// 			console.log(response)
// 			const myFood = response.data
// 			console.log(myFood)
// 			setFoods(myFood)
// 		})
// 		.catch(error => {
// 			console.log(error.message)
// 		})
// 	 },[])
// 	return (
// 		<div>
// <h2>Available foods{foods.length}</h2>
// <h3>foods</h3>
// {
// 	foods.map(food => <p>{food.foodName}</p>)
// }
// 		</div>
// 	);
// };

// export default AvailableFoods;

import { useEffect, useState } from 'react';
import axios from 'axios';
import AOS from 'aos';
import 'aos/dist/aos.css';
import useAuth from '../Hooks/useAuth';

const AvailableFoods = () => {
    const [foods, setFoods] = useState([]);
	const [searchText, setSearchText] = useState("")
    const [filteredFoods,setFilteredFoods] = useState([])
	const {user} = useAuth()

    useEffect(() => {
        AOS.init({ duration: 1000 }); // Initialize AOS
        
                axios.get('http://localhost:3000/available-foods')
				.then(result => {
					// const newFood = result.data;
                    // console.log(newFood)
					setFoods(result.data);
                    setFilteredFoods(result.data)
				})
				.catch(error => {
				console.log(error.message)
				})        
    }, []);

    useEffect(()=> {
        const searchedFoods = foods.filter(food => food.foodName.toLowerCase().includes(searchText.toLowerCase()))
        setFilteredFoods(searchedFoods)

    },[searchText, foods])


    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <h1 className="text-4xl font-bold text-center mb-8">Available Foods</h1>
			<div><input onChange={(e) => setSearchText(e.target.value)} type="search" name="searchTerm" value={searchText} placeholder="Search foods..." className='bg-transparent border-2 border-cyan-500 my-4'/> </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredFoods.map((food) => (
                    <div
                        key={food._id}
                        className="bg-white rounded-lg shadow-lg p-4 hover:shadow-xl transition-shadow"
                        data-aos="fade-up"
                    >
                        <img
                            src={food.foodImage}
                            alt={food.foodName}
                            className="w-full h-48 object-cover rounded-md mb-4"
                        />
                        <h2 className="text-2xl font-semibold mb-2">{food.foodName}</h2>
                        <p className="text-gray-700">Quantity: {food.foodQuantity}</p>
                        <p className="text-gray-700">Location: {food.pickupLocation}</p>
                        <p className="text-gray-700">Expires: {new Date(food.expireDate).toLocaleString()}</p>
                        <p className="text-gray-600 mt-2 italic">{food.additionalNotes}</p>
                        <div className="mt-4 flex items-center">
                            <img
                                src={food.foodUser.donatorImage || 'https://via.placeholder.com/50'}
                                alt="Donator"
                                className="w-10 h-10 rounded-full mr-3"
                            />
                            <p className="text-sm text-gray-500">{food.foodUser.donatorEmail}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AvailableFoods;
