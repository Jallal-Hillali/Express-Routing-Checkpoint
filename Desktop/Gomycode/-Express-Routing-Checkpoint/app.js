const express = require("express");
const app = express();
const path = require("path");

// Middleware to check if the current time is within working hours (9 AM to 5 PM, Monday to Friday)
function workingHoursMiddleware(req, res, next) {
  const now = new Date();
  const dayOfWeek = now.getDay(); // 0 = Sunday, 6 = Saturday
  const hour = now.getHours();

  // Check if it's Monday to Friday, between 9 AM and 5 PM
  if (dayOfWeek >= 1 && dayOfWeek <= 5 && hour >= 9 && hour < 17) {
    next(); // Allow request to proceed
  } else {
    res
      .status(403)
      .send(
        "The website is only available during working hours (Monday to Friday, 9 AM to 5 PM)"
      );
  }
}

// Use the working hours middleware for all routes
app.use(workingHoursMiddleware);

// Set up the views folder (optional if using templates)
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Serve static files (CSS, images, etc.)
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.get("/", (req, res) => {
  res.render("home"); // This is for rendering the home page
});

app.get("/our-services", (req, res) => {
  res.render("services"); // This is for rendering the services page
});

app.get("/contact-us", (req, res) => {
  res.render("contact"); // This is for rendering the contact page
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

