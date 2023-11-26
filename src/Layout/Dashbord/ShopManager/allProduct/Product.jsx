import { MdOutlineDelete } from "react-icons/md";
import { GrDocumentUpdate } from "react-icons/gr";
import useAuth from "../../../../Hooks/useAuth";
import usePublicAxios from "../../../../Hooks/usePublicAxios";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

const Product = () => {
    const {user} = useAuth()
    const publicAxios = usePublicAxios()
    const { isPending, error, refetch , data: products = [] } = useQuery({
        queryKey: ['shop-products'],
        queryFn: async () => {
            const res = await publicAxios.get(`/shop-products/${user?.email}` )
            return res.data
        }
    })
    if (isPending) return 'Loading...'
    if (error) return 'An error has occurred: ' + error.message

    refetch()
    const handelDelete = (id) =>{
        Swal.fire({
            title: 'Are you sure?',
            text: "Delete this product",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                publicAxios.delete(`/delete-product/${id}`)
                    .then(res => {
                        console.log(res.data);
                        if (res.data.deletedCount > 0) {
                            toast.success('Product deleted successful')
                            refetch()
                            // publicAxios.patch()
                            //     .then((res) => {
                            //         console.log(res.data);
                            //     })
                            //     .catch(error => console.error(error));
                        }
                    })
                    .catch(error => {
                        console.error(error);
                    });
            }
        });
    }
   
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

export default Product;