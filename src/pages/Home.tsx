import IProducts from "../interfaces/IProducts";


interface IProps {
	data: IProducts[]
}

function Home(props: IProps) {
	return (
		<div className="m-5">
			<h1>Danh sach san pham</h1>
			<div className="flex flex-wrap justify-around gap- w-[100%] mt-6">
				{props.data.map((product) => (
					<div key={product.id} className="card rounded shadow w-[18%] p-4 mt-10">
						<img className="max-w-[100%] h-[250px]" src={product.thumbnail} alt="" />
						<h2 className="mt-4">{product.name}</h2>
						<p>${product.price}</p>
						<p>{product.description}</p>
						<button className="btn btn-danger">Add to cart</button>
					</div>
				))}
			</div>
		</div>
	);
}

export default Home;