import React, { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/Login";
import Notfound from "./pages/Notfound";
import instance from "./axios";
import ListProduct from "./pages/admin/ListProduct/ListProducts";
import ProductForm from "./pages/admin/ProductForm/ProductForm";
import LayoutWebsite from "./components/LayoutWebsite";
import LayoutAdmin from "./components/LayoutAdmin";

function App() {
	const navigate = useNavigate()
	const [products, setProducts] = useState([]);
	useEffect(() => {
		(async () => {
			try {
				const { data } = await instance.get("/products");
				setProducts(data);
			} catch (error) {
				console.log(error);
			}
		})();
	}, []);

	// thêm sản phẩm
	const handleAddPro = async (datas) => {
		try {
			const { data } = await instance.post("/products", datas);
			setProducts([...products, data])
			navigate('/admin')
		} catch (error) {
			console.log(error);
		}
	}

	// xóa sản phẩm
	const handleDelete = async (id) => {
		try {
			const { data } = await instance.delete(`/products/${id}`);
			setProducts(products.filter(item => item.id != id))
		} catch (error) {
			console.log(error);
		}
	}


	// sửa sản phẩm
	const handleEditPro = async (id, datas) => {
		try {
			const { data } = await instance.put(`/products/${id}`, datas);
			setProducts(products.map(pro => {
				if (pro.id != id)
					return pro
				else
					return data
			}))
			navigate('admin')
		} catch (error) {
			console.log(error);
		}
	}
	return (
		<>
			<main>
				<Routes>
					<Route path="" element={<LayoutWebsite />}>
						<Route path="" element={<Home data={products} />} />
						<Route path="home" element={<Navigate to="/" />} />
						<Route path="about" element={<About />} />
						<Route path="login" element={<Login />} />
					</Route>
					<Route path="admin" element={<LayoutAdmin />}>
						<Route path='' element={<ListProduct data={products} deletePro={handleDelete} />} />
						<Route path='product-form/:id' element={<ProductForm editPro={handleEditPro} />} />
						<Route path='product-form' element={<ProductForm addPro={handleAddPro} />} />
					</Route>
					<Route path="*" element={<Notfound />} />
				</Routes>
			</main>
		</>
	);
}

export default App;
