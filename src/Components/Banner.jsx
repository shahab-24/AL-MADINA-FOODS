import strawberry from '../assets/img/strawberry.jpg'
import icecream from '../assets/img/icecream.jpg'
import fastfood from '../assets/img/fastfood.jpg'

const Banner = () => {
	return (
		<div className='grid grid-cols-3 w-[100%] mx-auto container my-20 '>
			
			<div><img className='object-cover w-[100%] h-[500px]' src={strawberry} alt="" /></div>
			<div><img className='object-cover  w-[100%]  h-[500px] 'src={icecream} alt="" /></div>
			<div><img className='object-cover  w-[100%]  h-[500px]' src={fastfood} alt="" /></div>
		</div>
	);
};

export default Banner;