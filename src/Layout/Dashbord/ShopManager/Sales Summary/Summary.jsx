import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { NavLink } from "react-router-dom";
import useAuth from "../../../../Hooks/useAuth";
import { useEffect } from "react";
import { useState } from "react";
import { PieChart, Pie,  Cell, ResponsiveContainer, Legend } from 'recharts';
import moment from 'moment';
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";


const COLORS = ['#0088FE', '#FFBB28', '#FF8042'];

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



const Summary = () => {
    const { user } = useAuth()
    const SecureAxios = useAxiosSecure()
    const [sell, setSell] = useState()
    const [currentPage, SetCurrentPage] = useState(0)
    const [itemLength, setItemLength] = useState(0)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await SecureAxios.get(`/sell-data/${user?.email}?page=${currentPage}&size=${4}`);
                const data = response.data;
                setSell(data?.result)
                setItemLength(data?.dataLength)
            } catch (error) {
                console.error('Error fetching sell data:', error);
            }
        };

        fetchData();
    }, [SecureAxios, user?.email, currentPage])

console.log(sell);

    const totalSell = sell?.reduce((acc, current) => {
        const total = current.pay || 0;
        return acc + total;
    }, 0);

    const totalCost = sell?.reduce((total, item) => {
        const itemCost = item.cost || 0;
        return total + itemCost;
    }, 0);

    const tax = parseFloat((totalCost * 7.5) / 100)

    const Profit = ((totalSell - totalCost) - tax).toFixed(2);

    const { isPending, error, refetch, data: products = [] } = useQuery({
        queryKey: ['shop-products'],
        queryFn: async () => {
            const res = await SecureAxios.get(`/shop-products/${user?.email}`)
            return res.data
        }
    })
    if (isPending) return 'Loading...'
    if (error) return 'An error has occurred: ' + error.message

    refetch()

    const totalInvestAmount = products?.reduce((total, item) => {
        const saleAmount = (item.cost * (item.quantity + item.saleCount));
        return total + saleAmount;
    }, 0);

    const count = itemLength;
    const itemPerPage = 4;
    const numberOfPage = Math.ceil(count / itemPerPage)

    const pages = [...Array(numberOfPage).keys()]

    const data = [
        { name: 'Total Sale', value: totalSell },
        { name: 'Total Invest', value: totalInvestAmount },
        { name: 'Total Profit', value: Profit },
      ];



    return (
        <div className=" min-h-screen bg-gradient-to-r from-green-200 via-green-300 to-blue-500">
            <Helmet>
                <title>IMS || Summary</title>
                <link rel="canonical" />
            </Helmet>
            <div className="bg-gradient-to-r from-green-200 via-green-300 to-blue-500">
                <div className=" grid grid-cols-1 md:grid-cols-3 gap-5 w-11/12 mx-auto items-center py-10 md:pt-10">

                    <NavLink >
                        <div className="stat text-gray-700  border-2 bg-orange-300 rounded-lg">
                            <div className="stat-title text-black" >Total Sale</div>
                            <div className="stat-value text-2xl">{totalSell} $</div>

                        </div>
                    </NavLink>

                    <NavLink >
                        <div className="stat text-gray-700 border-2 bg-orange-300 rounded-lg">

                            <div className="stat-title text-black">Total Invest</div>
                            <div className="stat-value text-2xl">{totalInvestAmount} $</div>

                        </div>
                    </NavLink>

                    <NavLink >
                        <div className="stat text-gray-700 border-2 bg-orange-300 rounded-lg">
                            <div className="stat-title text-black">Total Profit</div>
                            <div className="stat-value text-2xl">{Profit} $</div>

                        </div>
                    </NavLink>

                </div>
                {/* table */}
                <div className=" grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 w-11/12 mx-auto">
                    <div className="">
                        <table className="min-w-full border-collapse block md:table ">
                            <thead className="block md:table-header-group">
                                <tr className="border border-grey-500 md:border-none block md:table-row absolute -top-full md:top-auto -left-full md:left-auto  md:relative ">

                                    <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">Seller</th>
                                    <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">Selling Date</th>
                                    <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">Profit</th>

                                </tr>
                            </thead>

                            <tbody className="block md:table-row-group text-black">
                                {
                                    sell?.map(item => <tr key={item._id} className="bg-blue-300 border border-grey-500 md:border-none block md:table-row">

                                        <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell"><span className="inline-block w-1/3 md:hidden font-bold">Name</span>Shop Admin</td>

                                        <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell"><span className="inline-block w-1/3 md:hidden font-bold">Date:</span>
                                        {moment(item.date).format("DD : MMMM : YYYY")}
                                        </td>

                                        <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell"><span className="inline-block w-1/3 md:hidden font-bold">Profit :</span>
                                        {((item.pay - item.cost)-((item.cost * 7.5) / 100)).toFixed(2)}
                                        </td>

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
                       <div className=" h-[70%] mx-auto">
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
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
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

export default Summary;





