# Fillout Take Home Assignment Attempt

## Table of Contents

* Prerequisites
* Getting Started
* Running the Project
* Project Structure
* Technologies Used
* Implementation of Filter functionility

## Prerequisites
- Node.js installed on your machine


## Getting Started
1. Clone the repository: `git clone https://github.com/aryag-hashtechy/take-home-assignment.git`
2. Navigate to the project directory: `cd project-name`
3. Install dependencies: `npm install`

## Running the Project

- To start the application, run: `npm run serve`
- Visit `http://localhost:5050` in your browser to view the application

## Project Structure

```
src/
├── config/
│   └── config.ts
├── controllers/
│   └── basic-controller.ts
├── helper/
│   └── helper.ts
├── models/
│   ├── index.ts
│   ├── questions.ts
│   └── options.ts
├── routes/
│   └── basic-route.ts
├── seeders/
│   └── formSeeders.ts
├── server.ts
.env
node_modules/

```

## Technologies Used
* Express.js: A flexible Node.js web application framework used for handling HTTP requests and defining routes.

* TypeScript: A superset of JavaScript providing optional static typing and other features for enhanced code maintainability.

* Sequelize: A promise-based Node.js ORM for relational databases like MySQL, used for database management and query abstraction.

* MySQL: An open-source relational database management system employed for storing structured data in the project.

## Implementation of Filter functionility

Fetching Data:

* The application retrieves form submissions data from https://api.fillout.com/v1/api/forms/${process.env.FORM_ID}/submissions.
* It extracts the first object from the array and stores it in the database.


**Endpoint for Filtered Responses**

**Route: /:formId/filteredResponses**

- This endpoint allows clients to retrieve filtered form responses based on specified criteria.
- Clients need to provide the form ID in the URL path (:formId) to specify the form for which they want to retrieve responses.
- Filter criteria are passed as a encoded array of objects in the request query parameters.

- It returns the filtered data










