const { stockArray } = require("../json/array");

function getSymbol(str) {
    console.log(str);
    const stockNameBefore = stockArray.find((stock, i) => {
        return stock.title.toLowerCase().includes(str)
    })
    console.log("stockNameBefore: ", stockNameBefore)
    const symbol = stockNameBefore.ticker.replace(/-/, '.');
    return symbol;
}

module.exports = { getSymbol }