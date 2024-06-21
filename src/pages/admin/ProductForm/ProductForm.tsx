import { useNavigate, useParams } from 'react-router-dom'
import styles from './productform.module.scss'
import { useForm } from 'react-hook-form';
import { useContext, useEffect } from 'react';
import instance from '../../../axios';
import IProducts from '../../../interfaces/IProducts';
import { ProductContext } from '../../../contexts/ProductProvider';



const ProductForm = () => {
    const { id } = useParams();
    const { dispathProducts } = useContext(ProductContext)
    const navigate = useNavigate();
    const {
        register,
        reset,
        handleSubmit,
        formState: { errors }
    } = useForm<IProducts>();

    if (id) {
        useEffect(() => {
            (async () => {
                try {
                    const { data } = await instance.get('/products/' + id)
                    reset(data)
                } catch (error) {
                    console.log(error)
                }
            })();
        }, [id])
    }
    const submit = (data: IProducts) => {
        if (id) {
            fetch('http://localhost:3000/products/' + id, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            }).then((res) => res.json().then(data => {
                dispathProducts({
                    type: "UPDATE_PRODUCT",
                    payload: data
                })
            }))
            alert('Cập nhật sản phẩm thành công')
            navigate('/admin')
        } else {
            fetch('http://localhost:3000/products', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            }).then((res) => res.json().then(data => {
                dispathProducts({
                    type: "ADD_PRODUCT",
                    payload: data
                })
                alert("Thêm sản phẩm thành công")
            }))
            navigate('/admin')
        }
    }
    return (
        <div className={styles.form} >
            <form className="w-full" onSubmit={handleSubmit(submit)}>
                <h3 className="text-left mb-4 text-black">{id ? 'Sửa sản phẩm' : 'Thêm sản phẩm'}</h3>
                <div className="mb-2">
                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Tên sản phẩm</label>
                    <input type="text" id="name" {...register('title', {
                        required: "Vui lòng nhập vào tên sản phẩm",
                        minLength: {
                            value: 6,
                            message: "Giá sản phẩm lớn hơn 6 kí tự"
                        }
                    })} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder='Tên sản phẩm' />
                    <p className="mt-1 text-sm text-red-600 dark:text-red-500"><span className="font-medium"></span>{errors?.title?.message}</p>
                </div>
                <div className="mb-2">
                    <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Giá sản phẩm</label>
                    <input type="number" id="price" {...register('price', {
                        required: "Vui lòng nhập vào giá sản phẩm",
                        min: {
                            value: 0,
                            message: "Giá sản phẩm phải lớn hơn 0"
                        }
                    })} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder='Giá sản phẩm' />
                    <p className="mt-1 text-sm text-red-600 dark:text-red-500"><span className="font-medium">{errors?.price?.message}</span></p>
                </div>
                <div className="mb-2">
                    <label htmlFor="repeat-des" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Mô tả sản phẩm</label>
                    <textarea id="repeat-des" {...register('description', {
                        required: "Vui lòng nhập mô tả của sản phẩm"
                    })} className="shadow-sm min-h-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder='Mô tả sản phẩm' />
                    <p className="mt-1 text-sm text-red-600 dark:text-red-500"><span className="font-medium"></span>{errors?.description?.message}</p>
                </div>
                <button type="submit" className="text-white bg-blue-700
                 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 
                 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 
                 dark:hover:bg-blue-700 dark:focus:ring-blue-800">{id ? 'Edit' : 'Add'}</button>
            </form>
        </div>
    )
}

export default ProductForm