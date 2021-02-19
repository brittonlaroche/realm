exports = function(changeEvent) {
  console.log("fnc_IOT_HIST called");
  const history = context.services.get("mongodb-atlas").db("InventoryDemo").collection("IOT_DATA_HIST");
  const item = context.services.get("mongodb-atlas").db("InventoryDemo").collection("InventoryItem");
  const fullDocument = changeEvent.fullDocument;
  
  //Take the object_id and make it the parent_id
  //Remove the object_id for a new one in the history collection
  var fullCopy = fullDocument;
  fullCopy.parent_id = fullDocument._id;
  delete fullCopy._id;
  
  // add a date saved to this model in the history collection
  var nDate = new Date();
  fullCopy.date_transmitted = nDate;
  
  history.insertOne(fullCopy);
  console.log(JSON.stringify(fullCopy));
  //now lets update the inventory items with the temperature for all items with a matching sensorId
  
  item.updateMany(
    { "sensorId":  fullCopy.sensorId },
              { $set: 
                {
                  "temp": fullCopy.temperature
                }
              }
  );
  

};