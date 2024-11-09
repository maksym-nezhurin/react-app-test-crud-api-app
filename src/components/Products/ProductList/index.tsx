import {useEffect, useState} from "react";
import ApiService from "../../../utils/fetchWrapper.tsx";
import {IProduct} from "../../../types";
import {ProductListItem} from "../ProductListItem";

const apiUrl = import.meta.env.VITE_API_URL;
const API_URL = `${apiUrl}/api/products`;

export const ProductList = () => {
    const apiService = new ApiService({baseURL: `${API_URL}`});
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const getProducts = async () => {
            const response = await apiService.get<{}>('/');

            setProducts(response.reverse())
        }

        getProducts().then();
    }, []);

    return <div className={"grid grid-cols-2 gap-4"}>{
        products.map((product: IProduct) => <ProductListItem key={product._id} {...product} className={"mb-2"} />)
    }</div>
}