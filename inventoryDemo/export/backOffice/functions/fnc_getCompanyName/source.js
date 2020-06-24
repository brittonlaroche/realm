exports = async function(arg){
  /*
    Accessing application's values:
    var x = context.values.get("value_name");

    Accessing a mongodb service:
    var collection = context.services.get("mongodb-atlas").db("dbname").collection("coll_name");
    var doc = collection.findOne({owner_id: context.user.id});

    To call other named functions:
    var result = context.functions.execute("function_name", arg1, arg2);

    Try running in the console below.
  */
  /*===============================================================
  - Date:       Author:           Version:        Notes:
  -----------------------------------------------------------------
  - 2020-06-24  Britton LaRoche   1.0            Initial Release
  -
  ===============================================================*/
  
  var collection = context.services.get("mongodb-atlas").db("InventoryDemo").collection("codes");
  
  var doc = await collection.findOne({CODE_TYPE: "COMPANY_NAME"});
  var vcompanyName = doc.VALUE;
  console.log("Company Name: " + vcompanyName);
  
  return vcompanyName;
  

};