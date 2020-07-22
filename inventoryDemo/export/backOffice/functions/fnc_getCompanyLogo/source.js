exports = async function(aStoreId){
  /*
    Accessing application's values:
    var x = context.values.get("value_LOGO");

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
  var vcompanyLOGO = "";
  var storeIDLength = aStoreId.length;
  var storeIDLengthTrimmed = storeIDLength -1;
  console.log("Inside fnc_getCompanyLOGO looking for store_id: " + aStoreId);
    
  var doc = await collection.findOne({STORE_ID: aStoreId});
  
  if(doc) {
    if(doc.COMPANY_LOGO){
      vcompanyLOGO = doc.COMPANY_LOGO;
      console.log("Company LOGO: " + vcompanyLOGO);
    }
  }
    
  if (vcompanyLOGO === ""){
    // we didn't get the company LOGO so we might have a default of 161
    // and they are using store 162
    // lets look for a regex starting with 16
    var fisrtPartOfSToreID = "^" + aStoreId.substring(0,storeIDLengthTrimmed );
    console.log("Inside fnc_getCompanyLOGO fisrtPartOfSToreID: " + fisrtPartOfSToreID);
    
    var searchDoc = {"STORE_ID": { "$regex": BSON.BSONRegExp(fisrtPartOfSToreID) }}
    console.log("searchDoc: " + JSON.stringify(searchDoc));
    doc = await collection.findOne(searchDoc);
    vcompanyLOGO = doc.COMPANY_LOGO;
    console.log("Company LOGO: " + vcompanyLOGO);
  }
  
  return vcompanyLOGO;
};