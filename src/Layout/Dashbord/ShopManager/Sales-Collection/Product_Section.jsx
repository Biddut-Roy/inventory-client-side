import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../../Hooks/useAuth";
import usePublicAxios from "../../../../Hooks/usePublicAxios";
import { Link } from "react-router-dom";
import { GrDocumentUpdate } from "react-icons/gr";
import { MdOutlineDelete } from "react-icons/md";


const Product_Section = () => {
    const {user} = useAuth()
    const publicAxios = usePublicAxios()
    const { isPending, error, refetch , data: products = [] } = useQuery({
        queryKey: ['products-collection'],
        queryFn: async () => {
            const res = await publicAxios.get(`/shop-products/${user?.email}` )
            return res.data
        }
    })
    if (isPending) return 'Loading...'
    if (error) return 'An error has occurred: ' + error.message
    

    return (
        <div className="overflow-x-auto text-black">
        <table className="table">
            <thead className=" text-black">
                <tr>
                    <th>
                        <label>
                            
                        </label>
                    </th>
                    <th >image</th>
                    <th>Name</th>
                    <th>Quantity</th>
                    <th>update</th>
                    <th>Delate</th>
                </tr>
            </thead>
          {
            products.map(product =><tbody key={product._id}>
                <tr>
                    <th>
                        <label>
                            <input type="checkbox" className="checkbox" />
                        </label>
                    </th>
                    <td>
                        <div className="flex items-center">
                            <div className="avatar">
                                <div className="mask mask-squircle w-12 h-12">
                                    <img src={product?.photo} alt="Avatar Tailwind CSS Component" />
                                </div>
                            </div>
                        </div>
                    </td>
                    <td>
                       <h1>{product?.product_name}</h1>
                    </td>
                    <td>{product?.quantity}</td>
                    <th>
                        <Link to={`/dashboard/updateProduct/${product?._id}`}><button  className="btn btn-ghost btn-md text-2xl text-blue-700"><GrDocumentUpdate /></button></Link>
                    </th>
                    <th>
                        <button onClick={()=>handelDelete(product?._id)} className="btn btn-ghost btn-md  text-red-500 text-2xl "><MdOutlineDelete /></button>
                    </th>
                </tr>
               
            </tbody>)
          }
        </table>
    </div>
    );
};

export default Product_Section;