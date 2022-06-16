const { MongoClient, TypedEventEmitter, ObjectId } = require("mongodb");

async function main() {
  const MongoClient = require("mongodb").MongoClient;
  let uri = "mongodb://localhost:27017";
  const client = new MongoClient(uri);
  try {
    await client.connect();
    await listOfData(client);

    // insertProject
    // await insertProject_document(client, "project 1", "80% progress", {_id:ObjectId('62ab69ffee33c126b5791a92')});
    // await insertProject_document(client, "project 2", "40% progress", {_id:ObjectId('62ab69ffee33c126b5791a92')});

    //insertProject_Type
    // await insertProject_Type(client, "Game development", "20", "30,000$");
    // await insertProject_Type(client, "App development", "45", "4,000$");
    //insertErrorsDocument
    // await insertErrorsDocument(client, "erorr1", "404", {
    //   _id: ObjectId("62a7341a9f2ad3482122c4c0"),
    // });
    // await insertErrorsDocument(client, "erorr1", "404", {
    //   _id: ObjectId("62a734696a0046ed94d0f18c"),
    // });
    //update
    //  await update(client, "30,000$", "60.000$");
    //removeErrorById
    // await removeErrorById(client, { _id: ObjectId("62ab71dbe1759c79dc294490") });


    await displayErorr(client);


    console.log("conected!!!!!!");
  } catch (error) {
    console.log(Error);
  } finally {
    client.close();
    console.log("disconcted");
  }
}

async function listOfData(client) {
  const dbList = await client.db().admin().listDatabases();
  dbList.databases.forEach((db) => {
    console.log(db.name);
  });
}

async function insertProject_document(
  client,
  projectName,
  progress,
  projectTipeId
) {
  const project = {
    name: projectName,
    projectProgress: progress,
    projectTipe: projectTipeId,
  };
  const result = await client
    .db("pms")
    .collection("Project_documents")
    .insertOne(project);

  console.log(result);
}

async function insertProject_Type(client,typeName,  NumOfEmployees, projectPrice) {
  const type = {name: typeName, NumOfEmployees: NumOfEmployees, price: projectPrice,};
  const result = await client
    .db("pms")
    .collection("Project_type")
    .insertOne(type);
  console.log(result);
}

async function insertErrorsDocument(client, erorrName, erorrNum, projectId) {
  const erorr = { Name: erorrName, num: erorrNum, project: projectId };
  const result = await client
    .db("pms")
    .collection("errors_documents")
    .insertOne(erorr);
  console.log(result);
}

async function update(client, oldName, newName) {
  const result = await client
    .db("pms")
    .collection("Project_type")
    .updateOne({ price: oldName }, { $set: { price: newName } });
}

async function displayErorr(client) {
  
  const anErorr = await client
    .db("pms")
    .collection("errors_documents")
    .findOne({ _id: ObjectId("62ab71dbe1759c79dc29448f") });
  console.log(anErorr);
}

async function removeErrorById(client, erorrId) {
  
  const result = await client
    .db("pms")
    .collection("errors_documents")
    .remove(erorrId);
  console.log(result);
}

main();
