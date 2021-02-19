exports = async function(argItemDoc){
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
  console.log("fnc_notifySpoilage argItemDoc: " + JSON.stringify(argItemDoc));
 
  const twilio = context.services.get("SupplierService");
  const ourNumber = context.values.get("ourNumber");
  var recipient = argItemDoc.supplier;
  if (recipient) {
    twilio.send({
      from: ourNumber,
      to: recipient,
      body: `This is an alert that ${argItemDoc.name} has spoiled due to high temperature in ${argItemDoc._partition}. Please check the back office application.`
    });
  }
  return storeDoc;
};