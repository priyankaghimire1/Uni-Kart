import Header from "./Header";
import Myproducts from "./Myproducts";
import { useParams } from "react-router-dom";
function Myproductspage(){
    const p= useParams()
    console.log(p.pid);
    return <>
    <Header/>
    {!p.pid&&(
    <Myproducts profile={false} pid={p.pid}/>)}
    {p.pid&&(
        <Myproducts profile={false} pid={p.pid}/>)}
    </>
}
export default Myproductspage;