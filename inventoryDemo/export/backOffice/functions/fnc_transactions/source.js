exports = async function(changeEvent) {
  /*
    A Database Trigger will always call a function with a changeEvent.
    Documentation on ChangeEvents: https://docs.mongodb.com/manual/reference/change-events/

    Access the _id of the changed document:
    var docId = changeEvent.documentKey._id;

    Access the latest version of the changed document
    (with Full Document enabled for Insert, Update, and Replace operations):
    var fullDocument = changeEvent.fullDocument;

    var updateDescription = changeEvent.updateDescription;

    See which fields were changed (if any):
    if (updateDescription) {
      var updatedFields = updateDescription.updatedFields; // A document containing updated fields
    }

    See which fields were removed (if any):
    if (updateDescription) {
      var removedFields = updateDescription.removedFields; // An array of removed fields
    }

    Functions run by Triggers are run as System users and have full access to Services, Functions, and MongoDB Data.

    Accessing a mongodb service:
    var collection = context.services.get("mongodb-atlas").db("db_name").collection("coll_name");
    var doc = collection.findOne({ name: "mongodb" });

    To call other named functions:
    var result = context.functions.execute("function_name", arg1, arg2);
  */
  /*===============================================================
  - Date:       Author:           Version:        Notes:
  -----------------------------------------------------------------
  - 2020-06-24  Britton LaRoche   1.0            Initial Release
  -
  ===============================================================*/
  var fullDocument = changeEvent.fullDocument;
  console.log("Inside fnc_transactions");
  //------------------------------------------------
  //verify we need to restock Before proceeeding
  //------------------------------------------------
  if( fullDocument){
    console.log("got fullDocument");
  } else {
    console.log("missing fullDocument");
    return;
  }
  
  if( fullDocument.min_quantity){
    console.log("got fullDocument.min_quantity");
  } else {
    console.log("missing fullDocument.min_quantity");
    return;
  }
  
  if( fullDocument.quantity){
    console.log("got fullDocument.quantity");
  } else {
    console.log("missing fullDocument.quantity");
    return;
  }
  
  if( fullDocument.supplier){
    console.log("got fullDocument.supplier");
  } else {
    console.log("missing fullDocument.supplier");
    return;
  }
  
  if (fullDocument.quantity >= fullDocument.min_quantity){
    console.log("Quantity for " + fullDocument.name + " exceeds min quantity, we have enough Items");
    return;
  }
  var fullCopy = fullDocument;
  var cTransactions = context.services.get("mongodb-atlas").db("InventoryDemo").collection("transactions");
  var vDate = new Date();
  var insertDoc = {};

  var updateDescription = changeEvent.updateDescription;
  console.log(JSON.stringify("Full Document"));
  console.log(JSON.stringify(changeEvent.fullDocument));
  

  console.log("Inside fnc_transactions. Item quantity less than min_quantity. Calling fnc_verifyRestock");
  //we need to restock the item
  //lets contact the supplier
  fullCopy.Item_id = fullDocument._id;
  delete fullCopy._id;
  fullCopy.date = vDate;
  fullCopy.ack = "No Response";
  //cTransactions.insertOne(fullCopy); 
  console.log("Inside fnc_transactions. about to UPDATE!");
  cTransactions.updateOne(
      { "Item_id": fullCopy.Item_id},
      {$set: 
        { "_partition": fullCopy._partition,
          "name": fullCopy.name,
          "price": fullCopy.price,
          "quantity": fullCopy.quantity,
          "min_quantity": fullCopy.min_quantity,
          "supplier": fullCopy.supplier,
          "date": fullCopy.date,
          "ack": fullCopy.ack
      }},
      {upsert: true}
    );
  console.log("Inside fnc_transactions. AFTER UPDATE!");
  context.functions.execute("fnc_verifyRestock", fullCopy.supplier, fullCopy._partition, fullCopy.name, fullCopy.quantity, fullCopy.min_quantity );

  
};
