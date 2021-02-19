// This function is the webhook's request handler.
exports = async function(payload, response) {
  /*===============================================================
  - Date:       Author:           Version:        Notes:
  -----------------------------------------------------------------
  - 2020-10-15  Britton LaRoche   1.0            Initial Release
  -
  ===============================================================*/
    // Data can be extracted from the request as follows:
    console.log(JSON.stringify("getTFModelWH called ... executing..." ));
    var model = context.services.get("mongodb-atlas").db("InventoryDemo").collection("tfModel");
    var body = {};
    var result = {};
    if (payload.body) {
      console.log(JSON.stringify(payload.body));
      body = EJSON.parse(payload.body.text());
      console.log("body: " + JSON.stringify(body));
      var bodyDoc = JSON.parse(body);
      console.log("bodyDoc: " + JSON.stringify(bodyDoc));
      var myFileName = bodyDoc.fileName;
      if (myFileName) {
        console.log("fileName: " + myFileName);
      } else {
        return {"error":"unable to retrieve tensorflow model without fileName"};
      }
      result = await model.findOne({"fileName": myFileName});
      console.log(JSON.stringify("return document" ));
      console.log(JSON.stringify(result));
    } else {
      console.log(JSON.stringify("No payload body." ));
    }
    return  result; 
};

