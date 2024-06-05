import { useEffect, useState } from "react";
import "./App.css";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import LayoutWebsite from "./components/LayoutWebsite";
import Home from "./pages/Home";
import instance from "../src/axios"
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import LayoutAdmin from "./components/LayoutAdmin";
import ListProduct from "./pages/admin/Listproduct/ListProducts";
import ProductForm from "./pages/admin/ProductForm/ProductForm";
import Notfound from "./pages/Notfound";
import IProducts from "./interfaces/IProducts";


function App() {
  const navigate = useNavigate()
  const [products, setProducts] = useState<IProducts[]>([]);
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
  const handleAddPro = async (datas: IProducts) => {
    try {
      const { data } = await instance.post("/products", datas);
      setProducts([...products, data])
      navigate('/admin')
    } catch (error) {
      console.log(error);
    }
  }

  // xóa sản phẩm
  const handleDelete = async (id: number) => {
    try {
      await instance.delete(`/products/${id}`);
      setProducts(products.filter((item: IProducts) => item.id != id))
    } catch (error) {
      console.log(error);
    }
  }


  // sửa sản phẩm
  const handleEditPro = async (id: number | string, datas: IProducts) => {
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
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
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