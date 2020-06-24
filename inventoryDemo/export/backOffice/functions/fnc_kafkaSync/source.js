exports = async function(changeEvent) {
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
  const fullDocument = changeEvent.fullDocument;
  const inventory = context.services.get("mongodb-atlas").db("InventoryDemo").collection("InventoryItem");
  const kafka = context.services.get("mongodb-atlas").db("InventoryDemo").collection("kafka_sink");
  
  console.log("inside fnc_kafkaSync");
  console.log("fullDocument: " + JSON.stringify(fullDocument));
  
  var objId = new BSON.ObjectId(fullDocument.Item_id);
  var vAddQuantity = parseInt(fullDocument.ack);
  var vPartition = fullDocument.partition;
  
  var result = await inventory.updateOne(
      { "_id": objId},
      {$inc: 
        { 
          "quantity": vAddQuantity
      }}
    );
  console.log("fullDocument: " + JSON.stringify(result)); 
  return result; 
};
