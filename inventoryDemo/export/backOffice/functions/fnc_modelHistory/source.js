exports = function(changeEvent) {
  const history = context.services.get("mongodb-atlas").db("InventoryDemo").collection("tfModel_hist");
  const fullDocument = changeEvent.fullDocument;
  
  //Take the object_id and make it the parent_id
  //Remove the object_id for a new one in the history collection
  var fullCopy = fullDocument;
  fullCopy.parent_id = fullDocument._id;
  delete fullCopy._id;
  
  // add a date saved to this model in the history collection
  var nDate = new Date();
  fullCopy.date = nDate;
  
  history.insertOne(fullCopy);

};
