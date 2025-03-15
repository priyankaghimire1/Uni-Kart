import WishList from "./WishList";
import Header from "./Header";
function Wishlistpage(props){
    return <>
    <Header/>
    <WishList wishlist={false}/>
    </>
}
export default Wishlistpage;