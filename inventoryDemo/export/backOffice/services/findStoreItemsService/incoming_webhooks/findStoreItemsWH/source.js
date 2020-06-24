// This function is the webhook's request handler.
exports = async function(payload) {
  /*===============================================================
  - Date:       Author:           Version:        Notes:
  -----------------------------------------------------------------
  - 2020-06-24  Britton LaRoche   1.0            Initial Release
  -
  ===============================================================*/
    // Data can be extracted from the request as follows:
    console.log(JSON.stringify("findStoreItemsWH called ... executing..." ));
    var customer = context.services.get("mongodb-atlas").db("InventoryDemo").collection("InventoryItem");
    var body = {};
    var result = {};
    if (payload.body) {
      console.log(JSON.stringify(payload.body));
      body = EJSON.parse(payload.body.text());
      console.log(JSON.stringify(body));
      result = customer.findOne(body);
      console.log(JSON.stringify("return document" ));
      console.log(JSON.stringify(result));
    }
    return  result; 
};