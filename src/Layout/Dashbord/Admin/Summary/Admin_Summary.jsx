import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { NavLink } from "react-router-dom";
import usePublicAxios from "../../../../Hooks/usePublicAxios";
import useAuth from "../../../../Hooks/useAuth";
import { useEffect } from "react";
import { useState } from "react";
import { PieChart, Pie,  Cell, ResponsiveContainer, Legend } from 'recharts';
import moment from 'moment';
import useADminData from "../../../../Hooks/useADminData";
import { AiTwotoneNotification } from "react-icons/ai";


const COLORE = ['#0088FE', '#FFBB28', '#FF8042'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};



const Admin_Summary = () => {
    const publicAxios = usePublicAxios()
    const {Admin} = useADminData();
    const [sell, setSell] = useState()
    const [currentPage, SetCurrentPage] = useState(0)
    const [itemLength, setItemLength] = useState(0)
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await publicAxios.get(`/all-shop-data?page=${currentPage}&size=${4}`);
                const data = response.data;
                setSell(data?.pagination)
                setItemLength(data?.dataLength)
            } catch (error) {
                console.error('Error fetching sell data:', error);
            }
        };
        fetchData();
    }, [publicAxios , currentPage])
    
console.log(sell);

    const { isPending, error, refetch, data: products = [] } = useQuery({
        queryKey: ['all-product'],
        queryFn: async () => {
            const res = await publicAxios.get('/all-product')
            return res.data
        }
    })
    if (isPending) return 'Loading...'
    if (error) return 'An error has occurred: ' + error.message

    refetch()

    const totalProduct = products?.reduce((total, item) => {
        const allProduct = item.quantity || 0 ;
        return total + allProduct;
    }, 0);

    const totalSealCount = products?.reduce((total, item) => {
        const allSeal = item.saleCount || 0 ;
        return total + allSeal;
    }, 0);

    const count = itemLength;
    const itemPerPage = 4;
    const numberOfPage = Math.ceil(count / itemPerPage)

    const pages = [...Array(numberOfPage).keys()]

    const data = [
        { name: 'Total Income', value: Admin?.user?.income},
        { name: 'All Product', value: totalProduct },
        { name: 'Total Sale', value: totalSealCount },
      ];

    return (
        <div className=" min-h-screen bg-gradient-to-r from-green-200 via-green-300 to-blue-500">
            <Helmet>
                <title>IMS || Admin-Summary</title>
                <link rel="canonical" />
            </Helmet>
            <div className="bg-gradient-to-r from-green-200 via-green-300 to-blue-500">
                <div className=" grid grid-cols-1 md:grid-cols-3 gap-5 w-11/12 mx-auto items-center py-10 md:pt-10">

                    <NavLink >
                        <div className="stat text-gray-700  border-2 bg-orange-300 rounded-lg">
                            <div className="stat-title text-center text-black" >Total Income</div>
                            <div className="stat-value text-center">{Admin?.user?.income} $</div>

                        </div>
                    </NavLink>

                    <NavLink >
                        <div className="stat text-gray-700 border-2 bg-orange-300 rounded-lg">

                            <div className="stat-title text-center text-black">Total Product</div>
                            <div className="stat-value text-center">{totalProduct}</div>

                        </div>
                    </NavLink>

                    <NavLink >
                        <div className="stat text-gray-700 border-2 bg-orange-300 rounded-lg">
                            <div className="stat-title text-center text-black">Total Sales</div>
                            <div className="stat-value text-center">{totalSealCount} </div>

                        </div>
                    </NavLink>

                </div>
                {/* table */}
                <div className=" flex flex-col w-11/12 mx-auto">
                    <div className="border-solid border-2">
                        <table className="min-w-full border-collapse block md:table ">
                            <thead className="block md:table-header-group">
                                <tr className="border border-grey-500 md:border-none block md:table-row absolute -top-full md:top-auto -left-full md:left-auto  md:relative ">

                                    <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">Name</th>
                                    <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">Email</th>
                                    <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">Shop Name</th>
                                    <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">Roll</th>
                                    <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">Promotion</th>

                                </tr>
                            </thead>

                            <tbody className="block md:table-row-group text-black">
                                {
                                    sell?.map(item => <tr key={item._id} className="bg-blue-300 border border-grey-500 md:border-none block md:table-row">

                                        <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell"><span className="inline-block w-1/3 md:hidden font-bold">Name :</span>{item.name}</td>

                                        <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell"><span className="inline-block w-1/3 md:hidden font-bold">Email :</span>
                                        {item.email}
                                        </td>

                                        <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell"><span className="inline-block w-1/3 md:hidden font-bold">Shop Name: :</span>{item.shop_name || " "}</td>

                                        <td className={ item?.roll == "admin" ? "p-2 font-bold md:border md:border-grey-500 bg-orange-600 block md:table-cell" : "p-2 md:border md:border-grey-500 text-left block md:table-cell"}><span className="inline-block w-1/3 md:hidden font-bold">Roll :</span>{item?.roll || " "}</td>

                                        <td  className="p-2 md:border md:border-grey-500 text-left block md:table-cell"><button className="bg-blue-500 text-2xl md:text-3xl lg:text-4xl hover:bg-blue-700 text-white font-bold py-1 px-2 border border-blue-500 rounded"><AiTwotoneNotification /></button></td>

                                    </tr>)
                                }
                            </tbody>
                            {
                                pages.map(page => <button
                                    onClick={() => SetCurrentPage(page)}
                                    className={currentPage === page ? " btn btn-sm text-blue-700 my-5 mx-3" : "btn btn-sm  my-5 mx-3"}
                                    key={page}>
                                    {page}
                                </button>)
                            }
                        </table>

                    </div>
                    {/* chart */}
                    <div className=" min-h-screen">
                       <div className=" h-[65%] mx-auto">
                       <ResponsiveContainer width="100%" height="100%">
                            <PieChart width={400} height={400}>
                                <Pie
                                    data={data}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    label={renderCustomizedLabel}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    dataKey="value"
                                >
                                    {data.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORE[index % COLORE.length]} />
                                    ))}
                                </Pie>
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                       </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Admin_Summary ;













