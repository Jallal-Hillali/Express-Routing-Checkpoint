# Mongoose CRUD Operations

This project demonstrates how to use **Mongoose** with **MongoDB** to perform basic **CRUD** (Create, Read, Update, Delete) operations in a Node.js application.

## Features

- Connects to MongoDB using Mongoose
- Defines a Person schema with fields for `name`, `age`, and `favoriteFoods`
- Allows performing various CRUD operations:
  - Create a person and save to the database
  - Create multiple records at once
  - Find records by name, favorite food, or ID
  - Update records by name or ID
  - Delete records by name or ID
  - Perform advanced search queries with sorting, limiting, and field selection

## Prerequisites

Before running the project, ensure you have the following:

- **Node.js** installed on your machine
- A **MongoDB Atlas** account and a MongoDB URI for connection

## Setup

### 1. Clone the Repository

Clone the project to your local machine using Git:

```bash
git clone https://github.com/CodeByOS/Mongoose-NodeJS
cd Mongoose-NodeJS
```

### 2. Install Dependencies

Run the following command to install the required dependencies:

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root of the project and add the following:

```bash
MONGO_URI=your_mongo_atlas_connection_string_here
```

Replace your_mongo_atlas_connection_string_here with your actual MongoDB Atlas URI.

### 4. Run the Application

To start the application and execute the CRUD operations, run:

```bash
node server.js
```

You should see output in the console indicating the operations performed, such as successful connections, saved data, and retrieved data.

