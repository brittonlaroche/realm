exports = async function(aPhone, aResponse){
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
  var transactions = context.services.get("mongodb-atlas").db("InventoryDemo").collection("transactions");
  var vDate = new Date();
  console.log("inside fnc_updateTransaction");
  console.log("Phone: " + aPhone);
  console.log("aResponse: " + aResponse);
  
  var result = transactions.updateOne(
      {"supplier": aPhone, "ack": "No Response"}, 
      {$set: {
          "ack": aResponse,
          "response_date": vDate 
          }
      }
  );
  
  console.log("result: " + JSON.stringify(result));
  return result;
};