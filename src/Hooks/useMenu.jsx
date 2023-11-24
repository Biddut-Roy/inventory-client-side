import { useQuery } from "@tanstack/react-query";
// import { useEffect, useState } from "react";
import usePublicAxios from "./usePublicAxios";



const useMenu = () => {
    const axiosPublic = usePublicAxios()


    const { data : menu = [] , isPending: loading , refetch } = useQuery({
        queryKey : ['menu'],
        queryFn : async () =>{
            const res = await axiosPublic.get('/menu')
            return res.data
        }
    })

    return [menu , loading , refetch];
};

export default useMenu;