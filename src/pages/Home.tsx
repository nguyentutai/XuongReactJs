import { useContext, useEffect } from "react";
import { ProductContext } from "../contexts/ProductProvider";

function Home() {
	const { products, dispathProducts } = useContext(ProductContext);
    useEffect(() => {
        fetch('http://localhost:3000/products')
            .then(response => response.json())
            .then(data => {
                dispathProducts({
                    type: "SET_PRODUCT",
                    payload: data
                })
            })
            .catch(error => {
                console.log(error);
            })
    }, [])
	return (
		<div className="m-5">
			<h1>Danh sách sản phẩm</h1>
			<div className="flex flex-wrap justify-around gap- w-[100%] mt-6">
				{products?.map((product) => (
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