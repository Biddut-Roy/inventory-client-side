import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";



const Store_Data = () => {
    const SecureAxios = useAxiosSecure()
    const { isPending, refetch, data } = useQuery({
        queryKey: ['all-Store'],
        queryFn: async () => {
            const res = await SecureAxios.get('/all-product')
            return res.data
        }
    })
    if (isPending) return 'Loading...'
    refetch()

const result = {};

data.forEach(entry => {
  const { user_email, saleCount, quantity, shop_Name } = entry;

  if (!result[user_email]) {
    result[user_email] = {
      totalSaleCount: saleCount,
      totalQuantity: quantity,
      shopNames: shop_Name,
      userEmail: user_email,
    };
  } else {

    result[user_email].totalSaleCount += saleCount;
    result[user_email].totalQuantity += quantity;

    if (!result[user_email].shopNames.includes(shop_Name)) {
      result[user_email].shopNames.push(shop_Name);
    }
  }
});

const finalResult = Object.values(result);

    
    return (
        <div className=" min-h-screen bg-gradient-to-r from-green-200 via-green-300 to-blue-500">
            <Helmet>
                <title>IMS || Store-Data</title>
                <link rel="canonical" />
            </Helmet>
            <div className="bg-gradient-to-r from-green-200 via-green-300 to-blue-500">

                <div className=" flex flex-col w-11/12 md:w-full lg:w-11/12 mx-auto">
                    <div className="border-solid border-2">
                        <table className="min-w-full border-collapse block md:table ">
                            <thead className="block md:table-header-group">
                                <tr className="border border-grey-500 md:border-none block md:table-row absolute -top-full md:top-auto -left-full md:left-auto  md:relative ">

                                    <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">Shop-Name</th>
                                    <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">Email</th>
                                    <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">TotalSell</th>
                                    <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">Quantity</th>

                                </tr>
                            </thead>

                            <tbody className="block md:table-row-group text-black">
                                {
                                 finalResult.map((item,idx)=><tr key={idx} className="bg-blue-300 border border-grey-500 md:border-none block md:table-row">

                                        <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell"><span className="inline-block w-1/3 md:hidden font-bold">Name :</span>{item.shopNames}</td>

                                        <td className="p-2 md:border  md:border-grey-500 text-left block md:table-cell"><span className="inline-block w-1/3 md:hidden font-bold">Email :</span>
                                        {item.userEmail}
                                        </td>

                                        <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell"><span className="inline-block w-1/3 md:hidden font-bold">Sell:</span>{item.totalSaleCount}</td>

                                        <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell"><span className="inline-block w-1/3 md:hidden font-bold">Quantity:</span>{item.totalQuantity}</td>

                            

                                    </tr>)
                                }
                            </tbody>
                         
                        </table>
                        {/* <div className="">
                          {
                                pages.map(page => <button
                                    onClick={() => SetCurrentPage(page)}
                                    className={currentPage === page ? " btn btn-sm text-blue-700 my-5 mx-3" : "btn btn-sm  my-5 mx-3"}
                                    key={page}>
                                    {page}
                                </button>)
                            }
                          </div> */}
                    </div> 
                </div>
            </div>
        </div>
    );
};

export default Store_Data;








