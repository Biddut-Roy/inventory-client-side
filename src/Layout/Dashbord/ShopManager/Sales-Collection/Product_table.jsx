
import { MdOutlineShoppingCartCheckout } from "react-icons/md";
import PropTypes from 'prop-types';

const Product_table = ({ product, handelCheckOut , outOffStock }) => {
   const {photo ,_id , product_name , quantity , discount , sellingPrice} = product
    return (
        <tbody className="block md:table-row-group text-black">
            <tr className="bg-gray-300 border border-grey-500 md:border-none block md:table-row">
                <td className="p-2 md:border md:border-grey-500 text-center block md:table-cell"><span className="inline-block w-1/3 md:hidden font-bold">ID:</span>{_id}</td>

                <td className="p-2 md:border md:border-grey-500 text-center block md:table-cell"><span className="inline-block w-1/3 md:hidden font-bold">
                </span><div className="flex justify-center">
                        <div className="avatar">
                            <div className="mask mask-squircle w-12 h-12">
                                <img src={photo} alt="Avatar Tailwind CSS Component" />
                            </div>
                        </div>
                    </div></td>

                <td className="p-2 md:border md:border-grey-500 text-center block md:table-cell"><span className="inline-block w-1/3 md:hidden font-bold">Name</span>{product_name}</td>

                <td className="p-2 md:border md:border-grey-500 text-center block md:table-cell"><span className="inline-block w-1/3 md:hidden font-bold">Quantity</span>{quantity}</td>

                <td className="p-2 md:border md:border-grey-500 text-center block md:table-cell"><span className="inline-block w-1/3 md:hidden font-bold">Discount</span>{discount} %</td>

                <td className="p-2 md:border md:border-grey-500 text-center block md:table-cell"><span className="inline-block w-1/3 md:hidden font-bold">Selling_price</span>Price: {(sellingPrice).toFixed(2)}</td>

                {
                    quantity <= 0 ?
                        <td  className="p-2 md:border md:border-grey-500 text-center block md:table-cell">
                            <span className="inline-block w-1/3 md:hidden font-bold">Actions</span>
                            <button onClick={()=>outOffStock(quantity)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 border border-blue-500 rounded"><MdOutlineShoppingCartCheckout />lol</button>
                        </td>
                        :
                        <td className="p-2 md:border md:border-grey-500 text-center block md:table-cell">
                            <span className="inline-block w-1/3 md:hidden font-bold">Actions</span>
                            <button onClick={() => {
                                handelCheckOut(product)

                            }} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 border border-blue-500 rounded"><MdOutlineShoppingCartCheckout /></button>
                        </td>
                }
            </tr>
        </tbody>
    );
};

Product_table.propTypes = {
    product: PropTypes.shape({
      photo: PropTypes.string.isRequired,
      _id: PropTypes.string.isRequired,
      product_name: PropTypes.string.isRequired,
      quantity: PropTypes.number.isRequired,
      discount: PropTypes.number.isRequired,
      sellingPrice: PropTypes.number.isRequired,
    }).isRequired,
    handelCheckOut: PropTypes.func.isRequired,
    outOffStock: PropTypes.func.isRequired,
}  

export default Product_table;