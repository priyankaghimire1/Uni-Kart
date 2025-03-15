import Header from "./Header";
import MyOrders from "./MyOrders";
function MyOrderspage(){
    return<>
    <Header/>
    <MyOrders profile={false}/>
    </>
}
export default MyOrderspage;