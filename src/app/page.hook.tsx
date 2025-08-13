'use client'

import useGetCountry from "./service/home.services";

const useHome = () => {
    const { data: listCountry, isLoading: isLoadingCountry } = useGetCountry();
          

    console.log(listCountry, '***listCountry')




    return {
        listCountry,
        isLoadingCountry
    }
}

export default useHome