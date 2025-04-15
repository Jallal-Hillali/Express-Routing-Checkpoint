// Import the required modules
require("dotenv").config(); // Load environment variables from .env file
const mongoose = require("mongoose"); // Import mongoose for database operations

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, { // Connect to MongoDB using the URI stored in the .env file
    useNewUrlParser: true, // Use the new URL parser for MongoDB
    useUnifiedTopology: true, // Use the new server discovery and monitoring engine
  })
  .then(() => {
    console.log("Connected to MongoDB!"); // Success message on successful connection
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB:", err); // Error message on failed connection
  });

// Define the Person schema with required fields
const personSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Name is a required string
  age: { type: Number }, // Age is an optional number
  favoriteFoods: { type: [String], required: true }, // Favorite foods is a required array of strings
});

// Create a Person model using the schema
const Person = mongoose.model("Person", personSchema);

// Create a new person object and pass the values to the constructor
const person = new Person({
  name: "John Doe", // Name of the person
  age: 30, // Age of the person
  favoriteFoods: ["Pizza", "Burger"], // Array of favorite foods
});

// Save the created person object to the database
person.save(function (err, data) {
  if (err) {
    console.log("Error saving person:", err); // Log error if saving fails
  } else {
    console.log("Person saved:", data); // Log the saved person's data if successful
  }
});

// Create an array of multiple people and save them in one go
const arrayOfPeople = [
  { name: "Jane Smith", age: 25, favoriteFoods: ["Tacos", "Sushi"] },
  { name: "Mike Johnson", age: 35, favoriteFoods: ["Pasta", "Steak"] },
];

// Save multiple people to the database using the create method
Person.create(arrayOfPeople, function (err, data) {
  if (err) {
    console.log("Error creating people:", err); // Log error if creating people fails
  } else {
    console.log("People created:", data); // Log the created people's data if successful
  }
});

// Search for all people with the name "John Doe"
Person.find({ name: "John Doe" }, function (err, data) {
  if (err) {
    console.log("Error finding people:", err); // Log error if finding people fails
  } else {
    console.log("People found:", data); // Log the found people data if successful
  }
});

// Search for a single person who has "Pizza" in their favorite foods
Person.findOne({ favoriteFoods: "Pizza" }, function (err, data) {
  if (err) {
    console.log("Error finding person:", err); // Log error if finding person fails
  } else {
    console.log("Person found:", data); // Log the found person data if successful
  }
});

// Find a person by their _id and add "Hamburger" to their list of favorite foods
Person.findById("60d65a09f5197517b8b697ff", function (err, person) {
  if (err) {
    console.log("Error finding person:", err); // Log error if finding person fails
  } else {
    person.favoriteFoods.push("Hamburger"); // Add "Hamburger" to the favoriteFoods array
    person.save(function (saveErr, updatedPerson) {
      if (saveErr) {
        console.log("Error saving updated person:", saveErr); // Log error if saving fails
      } else {
        console.log("Updated person:", updatedPerson); // Log the updated person's data if successful
      }
    });
  }
});

// Update a person's age by their name using findOneAndUpdate
Person.findOneAndUpdate(
  { name: "John Doe" }, // Search for person by name
  { age: 20 }, // Set the new age to 20
  { new: true }, // Return the updated document instead of the original one
  function (err, updatedPerson) {
    if (err) {
      console.log("Error updating person:", err); // Log error if update fails
    } else {
      console.log("Updated person:", updatedPerson); // Log the updated person's data if successful
    }
  }
);

// Find a person by _id and remove them from the database
Person.findByIdAndRemove(
  "60d65a09f5197517b8b697ff", // Use the person's _id as the search key
  function (err, removedPerson) {
    if (err) {
      console.log("Error removing person:", err); // Log error if removal fails
    } else {
      console.log("Person removed:", removedPerson); // Log the removed person's data if successful
    }
  }
);

// Remove all people with the name "Mary" from the database
Person.remove({ name: "Mary" }, function (err, result) {
  if (err) {
    console.log("Error removing people:", err); // Log error if removal fails
  } else {
    console.log("People removed:", result); // Log the result of the removal (number of people deleted)
  }
});

// Find people who like "Burritos", sort them by name, limit the results, and exclude their age field
Person.find({ favoriteFoods: "Burrito" })
  .sort({ name: 1 }) // Sort by name in ascending order
  .limit(2) // Limit the results to 2 people
  .select("-age") // Exclude the 'age' field from the results
  .exec(function (err, data) {
    if (err) {
      console.log("Error finding people:", err); // Log error if finding people fails
    } else {
      console.log("People found:", data); // Log the found people data if successful
    }
  });

  