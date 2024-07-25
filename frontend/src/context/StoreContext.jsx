import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const StoreContext = createContext(null)

const StoreContextProvider = (props) => {

    const [favItems, setFavItems] = useState({});
    const url= "http://localhost:4000";
    const [token,setToken]= useState("");
    const [item_list,setItemList]= useState([])

    const addToFav = async (itemId) => {
        if (!favItems[itemId]) {
            setFavItems((prev) => ({ ...prev, [itemId]: 1 }))
        }
        else {
            setFavItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }))
        }
        if (token) {
            await axios.post(url+"/api/fav/add",{itemId},{headers:{token}})
        }
    }

    const removeFromFav = async (itemId) => {
        setFavItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }))
        if (token) {
            await axios.post(url+"/api/fav/remove",{itemId},{headers:{token}})
        }
    }

    const getTotalFavAmount = () => {
        let totalAmount = 0;
        for (const item in favItems) {
            if (favItems[item] > 0) {
                let itemInfo = item_list.find((product) => product._id === item)
                totalAmount += itemInfo.price * favItems[item];
            }
        }
        return totalAmount;
    }

    const fetchItemList= async()=>{
        const response= await axios.get(url+"/api/item/list");
        setItemList(response.data.data)
    }
    const loadFavData = async (token)=>{
        const response = await axios.post(url+"/api/fav/get",{},{headers:{token}})
        setFavItems(response.data.favData);
    }

    useEffect(()=>{
        async function loadData(){
            await fetchItemList();
            if (localStorage.getItem("token")) {
                setToken(localStorage.getItem("token"));
                await loadFavData(localStorage.getItem("token"));
            }
        }
        loadData();
    },[])
    

    const contextValue = {
        item_list,
        favItems,
        setFavItems,
        addToFav,
        removeFromFav,
        getTotalFavAmount,
        url,
        token,
        setToken
    }
    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider;