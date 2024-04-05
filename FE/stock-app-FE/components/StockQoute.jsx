


export default  function StockQoute({stockQoute}) {
    return(
         <>
            <h1>{stockQoute.latestPrice}</h1>
            <i>{stockQoute.companyName}</i>
         </>
    )
}