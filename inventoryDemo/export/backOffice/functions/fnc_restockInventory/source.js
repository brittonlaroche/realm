exports = function(changeEvent) {
  /*
    A Database Trigger will always call a function with a changeEvent.
    Documentation on ChangeEvents: https://docs.mongodb.com/manual/reference/change-events/

    Access the _id of the changed document:
    const docId = changeEvent.documentKey._id;

    Access the latest version of the changed document
    (with Full Document enabled for Insert, Update, and Replace operations):
    const fullDocument = changeEvent.fullDocument;

    const updateDescription = changeEvent.updateDescription;

    See which fields were changed (if any):
    if (updateDescription) {
      const updatedFields = updateDescription.updatedFields; // A document containing updated fields
    }

    See which fields were removed (if any):
    if (updateDescription) {
      const removedFields = updateDescription.removedFields; // An array of removed fields
    }

    Functions run by Triggers are run as System users and have full access to Services, Functions, and MongoDB Data.

    Access a mongodb service:
    const collection = context.services.get(<SERVICE_NAME>).db("db_name").collection("coll_name");
    const doc = collection.findOne({ name: "mongodb" });

    Note: In Atlas Triggers, the service name is defaulted to the cluster name.

    Call other named functions if they are defined in your application:
    const result = context.functions.execute("function_name", arg1, arg2);

    Access the default http client and execute a GET request:
    const response = context.http.get({ url: <URL> })

    Learn more about http client here: https://docs.mongodb.com/realm/functions/context/#context-http
  */
  /*===============================================================
  - Date:       Author:           Version:        Notes:
  -----------------------------------------------------------------
  - 2020-06-24  Britton LaRoche   1.0            Initial Release
  -
  ===============================================================*/
  
  var transactions = context.services.get("mongodb-atlas").db("InventoryDemo").collection("transactions");
  var inventory = context.services.get("mongodb-atlas").db("InventoryDemo").collection("InventoryItem");
  const fullDocument = changeEvent.fullDocument;
  
  var vDate = new Date();
  console.log("inside fnc_restockInventory");
  console.log("fullDocument: " + JSON.stringify(fullDocument));

  if (fullDocument.ack){
    if (fullDocument.ack == "No Response"){
      console.log("reset detected returning");
      return;
    }
  }

  console.log("inside fnc_restockInventory checking repsonse for number");
  var vQuantity = parseInt(fullDocument.ack);
  if (isNaN(vQuantity)) {
    console.log("inside fnc_restockInventory, fullDocument.ack is not a number: " + fullDocument.ack);
    //context.functions.execute("fnc_reprimandSupplier", fullDocument.supplier );
    /*
    transactions.updateOne(
      {"_id": fullDocument._id}, 
      {$set: {
          ack: "No Response",
          ackOriginal: fullDocument.ack
          }
      }
    );
    context.functions.execute("fnc_verifyRestock", fullDocument.supplier, fullDocument._partition, fullDocument.name, fullDocument.quantity );
    */
    return;
  }
  var result = inventory.updateOne(
      {"_id": fullDocument.Item_id}, 
      {$inc: {
          quantity: vQuantity 
          }
      }
  );
  
  console.log("result: " + JSON.stringify(result));
  return result;
};
