// This function is the webhook's request handler.
exports = async function(payload, response) {
  /*===============================================================
  - Date:       Author:           Version:        Notes:
  -----------------------------------------------------------------
  - 2020-10-15  Britton LaRoche   1.0            Initial Release
  -
  ===============================================================*/
    // Data can be extracted from the request as follows:
    console.log(JSON.stringify("SaveTFModelWH called ... executing..." ));
    var model = context.services.get("mongodb-atlas").db("InventoryDemo").collection("tfModel");
    var body = {};
    var result = {};
    if (payload.body) {
      console.log(JSON.stringify(payload.body));
      body = EJSON.parse(payload.body.text());
      console.log("body: " + JSON.stringify(body));
      var myFileName = body.fileName;
      if (myFileName) {
        //remove the old model data
        await model.deleteMany({"fileName":myFileName});
      } else {
        return {"error":"unable to store tensorflow model without fileName"};
      }
      result = await model.insertOne(body);
      console.log(JSON.stringify("return document" ));
      console.log(JSON.stringify(result));
    } else {
      console.log(JSON.stringify("No payload body." ));
      const payloadText = JSON.stringify(payload);
      model.insertOne({"payload": payloadText});
    }
    return  result; 
};

