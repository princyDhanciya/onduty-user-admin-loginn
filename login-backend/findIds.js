// Assuming you have already connected to your MongoDB instance
var collection = db.collection('myCollection');

collection.find({}).toArray(function(err, docs) {
  if (err) {
    console.error(err);
    return;
  }
  
  // Iterate over the documents and print the _id of each document
  docs.forEach(function(doc) {
    console.log(doc._id);
  });
});
