import { useContext } from 'react';
import BuyStock from './BuyStock';
import { loginContext } from './MasterPage';

export default  function Stock({Stock}) {
  const isLoggedIn  = useContext(loginContext) 
    return(
         <>
           <div>
           <h3>{Stock.latestPrice}</h3>
            <i>{Stock.companyName}</i>
           </div>
            <div>
            {isLoggedIn[0] && Stock &&  <BuyStock  stockInfo = {Stock}/>}
            </div>
         </>
    )
}