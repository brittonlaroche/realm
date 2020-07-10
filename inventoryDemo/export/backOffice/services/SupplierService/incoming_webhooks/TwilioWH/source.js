/*
  See https://www.twilio.com/docs/api/twiml/sms/twilio_request for
  an example of a payload that Twilio would send.

  Try running in the console below.
*/
/*===============================================================
  - Date:       Author:           Version:        Notes:
  -----------------------------------------------------------------
  - 2020-06-24  Britton LaRoche   1.0            Initial Release
  -
  ===============================================================*/
  
exports = async function(payload) {
  //return payload.FromCity === 'New York';
  
  //exports = function(args) {

  const db = context.services.get("mongodb-atlas").db("InventoryDemo");
  const transactions = db.collection("transactions");
  
  console.log("twiliowebhook: " + payload.Body);
  
  var fromPhone = payload.From;
  var response = payload.Body.trim();
  var trimedPhone = fromPhone.substring(1, fromPhone.length);
  
  console.log("mobile_phone: " + fromPhone + ", response: " + response);
  console.log("trimmedPhone: " + trimedPhone);
  console.log("trimmeResponse: " + response);
 
  var result = await context.functions.execute("fnc_updateTransaction", trimedPhone,  response);

};