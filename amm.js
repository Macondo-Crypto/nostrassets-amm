/**
 * Basic logic of AMM : 
 * 
 *  1.Buy token in lower price 
 *  2.Sell token in heigher price 
 */

const api = require("./utils/api");


function sleep (ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
}
var i = 0;
async function loop_TREAT()
{

    var r = await api.nostrassetsGraph("TREAT","SELL","asc");
    var buyFrom = r?.data?.nostr_market_order[0]
    // console.log(buyFrom)

    var r = await api.nostrassetsGraph("TREAT","BUY","desc");
    var sellTo = r?.data?.nostr_market_order[0]
    // console.log(sellTo)

    var subPriceAlam = buyFrom.price * 0.008 // make amm when 1% price change
    // var subPriceAlam = buyFrom.price * 0
    if(sellTo.price-buyFrom.price > subPriceAlam)
    {
        console.log(`🚀 New TREAT price amm for ${sellTo.price-buyFrom.price}:: `,buyFrom,sellTo)
    }else{
        // console.log(i)
        i++
    }
}

async function loop_TRICK()
{

    var r = await api.nostrassetsGraph("TRICK","SELL","asc");
    var buyFrom = r?.data?.nostr_market_order[0]
    // console.log(buyFrom)

    var r = await api.nostrassetsGraph("TRICK","BUY","desc");
    var sellTo = r?.data?.nostr_market_order[0]
    // console.log(sellTo)
    var subPriceAlam = buyFrom.price * 0.008 // make amm when 1% price change
    // var subPriceAlam = buyFrom.price * 0
    if(sellTo.price-buyFrom.price > subPriceAlam)
    {
        console.log(`🚀 New TRICK price amm for ${sellTo.price-buyFrom.price}:: `,buyFrom,sellTo)
    }else{
        // console.log(i)
        i++
    }
}
async function init()
{
    while(true)
    {
        await loop_TREAT();
        await sleep(30000)
        await loop_TRICK();
        await sleep(30000)
    }
}

init()