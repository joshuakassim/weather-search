# weather-search

## Prerequisites

Node.js and NPM. (Install from the official Node.js website, https://nodejs.org/)
Git (Install from the official website, https://git-scm.com/)

## Installation intructions

### Option 1: Using existing MongoDB database and URI, and JWT_SECRET

#### 1. Clone the repository
##### Open a terminal and navigate to the directory in which you want the project to be.
##### Run the command
    git clone https://github.com/joshuakassim/weather-search.git

#### 2. Install dependencies
##### Navigate to the cloned repo and intall dependecies
    cd weather-search
    npm install
    cd frontend
    npm install

#### 3. Run
##### Navigate back from frontend
    cd ..
##### Run the application by running the command
    npm run dev

### Option 2: Using your own MongoDB database and URI, and JWT_SECRET

#### 1. Clone the repository
##### Open a terminal and navigate to the directory in which you want the project to be.
##### Run the command
    git clone https://github.com/joshuakassim/weather-search.git

#### 2. Install dependencies
##### Navigate to the cloned repo and intall dependecies
    cd weather-search
    npm install
    cd frontend
    npm install

#### 3. Install dependencies
##### Create your own MongoDB database and obtain your URI (https://www.mongodb.com/cloud/atlas/register).
##### Modify the .env file by removing the existing URI and pasting your own.
##### Change the JWT_SECRET to whatever you want.

#### 4. Run
##### Navigate back from frontend
    cd ..
##### Run the application by running the command
    npm run dev

## Test users
#### User 1
    Name: John Doe
    Username: john
    Password: john

#### User 2
    Name: Jane Doe
    Username: jane
    Password: jane

## Test Cases

### Intro screen
#### Test Cases:
##### Click login button => redirects to login screen (/login)
##### Click register button => redirects to register screen (/register)


### Register screen
#### Test Case 1: Valid Data
##### Click register button=> redirects to home screen (/)
#### Test Case 2: Missing data
##### Click register button => displays message “Invalid user data”
#### Test Case 3: Incorrect data
##### Click register button => displays message “Username already exists”

### Login screen
#### Test Case 1: Valid Data
##### Click login button => redirects to home screen (/)
#### Test Case 2: Invalid data
##### Click login button => displays message “Invalid username or password”

### Home and Weather screens
#### Test case 1: Interaction with chart
##### Click precipitation, temperature or wind speed buttons => toggles corresponding line chart
#### Test Case 2: Search with missing data
##### Click search button => displays message “Enter a city”
#### Test Case 3: Search for invalid city
##### Click search button => displays message “Please enter a valid city”
#### Test Case 4: Search for valid city
##### Click search button => redirects to weather screen (/search/{city}, where {city} is a placeholder for the city name)

### Profile screen
#### Test case
##### Click update button => displays message “Profile updated"
