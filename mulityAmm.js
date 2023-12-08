const api = require("./utils/api");


function sleep (ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
}

async function test()
{
    const a = await api.promiseNostrassets();
    console.log(a)
}

async function dataMatch(BUYFROM,SELLTO,TOKEN)
{
    var subPriceAlam = BUYFROM[0].price * 0.01
    if(SELLTO[0].price-BUYFROM[0].price > subPriceAlam)
    {
        console.log(`🍺 ${TOKEN} Avable for amm :: BUYFROM :: ${BUYFROM[0].id} : ${BUYFROM[0].price}` , ` | SELL TO :: ${SELLTO[0].id} : ${SELLTO[0].price}`)
        //Check order type 
    }
}

async function loopAmm()
{
    const data = await api.promiseNostrassets();
    var TRICKSELL = data[0];
    var TRICKBUY = data[1];
    var TREATSELL = data[2];
    var TREATBUY = data[3];

    await dataMatch(TRICKSELL,TRICKBUY,"TRICK")
    await dataMatch(TREATSELL,TREATBUY,"TREAT")
}

async function init()
{
    while(true)
    {
        await loopAmm();
        await sleep(30000)
    }
}

// test()
init()