import { Link } from 'react-router-dom'
import styles from './listpro.module.scss'
const ListProduct = ({ data, deletePro }) => {
    return (
        <div className="container">
            <div className="bg-blue-700 w-44 text-center py-[9px] rounded mb-1">
                <Link className={styles.addpro} to={'product-form'}>Thêm sản phẩm</Link>
            </div>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg" >
                <table className="w-full text-sm text-center rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr >
                            <th scope="col" className="px-6 py-3">
                                #
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Product Title
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Price
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Category
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Image
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((product, index) => (
                            <tr key={index} className={styles.table_header}>
                                <td className="px-6 py-4">
                                    {index}
                                </td>
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {product.title}
                                </th>
                                <td className="px-6 py-4">
                                    {product.price}
                                </td>
                                <td className="px-6 py-4">
                                    {product.description}
                                </td>
                                <td className="px-6 py-4">
                                    <img src={product.thumbnail} alt="" />
                                </td>
                                <td className="px-6 py-4 flex mt-[30px]">
                                    <Link to={`product-form/${product.id}`} className="bg-blue-600 px-2 py-1 ms-2 rounded text-white no-underline">Edit</Link>
                                    <button className="bg-red-600 px-2 py-1 ms-2 rounded text-white" onClick={() => {
                                        if(confirm("Are you sure you want to")){
                                            deletePro(product.id);
                                        }
                                    }}>Xóa</button>
                                </td>
                            </tr>
                        )
                        )}
                    </tbody>
                </table>
            </div>

        </div>
    )
}

export default ListProduct