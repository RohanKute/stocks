import BuyStock from './BuyStock';


export default  function Stock({Stock , isLoggedIn}) {
    return(
         <>
           <div>
           <h3>{Stock.latestPrice}</h3>
            <i>{Stock.companyName}</i>
           </div>
            <div>
            {Stock && isLoggedIn &&  <BuyStock />}
            </div>
         </>
    )
}