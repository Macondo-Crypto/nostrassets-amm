const req = require("./request");
async function nostrassetsGraph (token,type,order_by)
{
    var options = {
        'method': 'POST',
        'url': 'https://graph.nostrassets.com/api/graph_data',
        'headers': {
          'user-agent': ' Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(
            {
                "query": `query ($offset: Int!, $limit: Int!) {\n  nostr_market_order(\n    limit: $limit\n    offset: $offset\n    where: {status: {_in: [\n\"INIT\", \n\"PUSH_MARKET_SUCCESS\", \n\"PART_SUCCESS\"]}, type: {_eq: \n\"${type}\"}, token: {_eq: \n\"${token}\"}}\n    order_by: {price: ${order_by}}\n  ) {\n    avg_price\n    create_time\n    deal_money\n    deal_volume\n    event_id\n    id\n    modify_time\n    owner\n    price\n    status\n    token\n    token_address\n    total_price\n    trade_fee\n    type\n    volume\n    __typename\n  }\n  nostr_market_order_aggregate(\n    where: {status: {_in: [\n\"INIT\", \n\"PUSH_MARKET_SUCCESS\", \n\"PART_SUCCESS\"]}, type: {_eq: \n\"SELL\"}, token: {_eq: \n\"TREAT\"}}\n  ) {\n    aggregate {\n      count\n      __typename\n    }\n    __typename\n  }\n}`,
                "variables": {
                  "limit": 1,
                  "offset": 0
                }
              }
        )
      };
      return req.doRequest(options);
}

module.exports = {
    nostrassetsGraph,
}