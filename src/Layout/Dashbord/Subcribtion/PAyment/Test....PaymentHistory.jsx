// import { useState } from "react";
// import useAuth from "../../Hooks/useAuth";
// import useAxiosSecure from "../../Hooks/useAxiosSecure";


// const PaymentHistory = () => {
//     const [history , setHistory] = useState([])
//     const {user}=useAuth()
//     const secureAxios = useAxiosSecure()

//      secureAxios.get(`/payments/${user?.email}`)
//      .then(res => setHistory(res.data))

//     return (
//         <div>
//             <h2 className="text3-xl">Total Payments: {history.length}</h2>
//             <div className="overflow-x-auto">
//                 <table className="table table-zebra">
//                     {/* head */}
//                     <thead>
//                         <tr>
//                             <th>#</th>
//                             <th>price</th>
//                             <th>Transaction Id</th>
//                             <th>Status</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {history.map((payment, index) => <tr key={payment._id}>
//                             <th>{index + 1}</th>
//                             <td>${payment.price}</td>
//                             <td>{payment.transactionId}</td>
//                             <td>{payment.status}</td>
//                         </tr>)}
                        
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     );
// };

// export default PaymentHistory;