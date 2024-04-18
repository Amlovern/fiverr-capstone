# Nerdrr

Inspired by Fiverr, Nerdrr is an online community where users can list services that they can provide, called "gigs", that other users can order. This site is based around "nerdy" topics such as Card Games, Tabletop Games, Video Games, and Anime.

Check out a live version of Nerdrr here: [https://nerdrr.herokuapp.com/](https://nerdrr.herokuapp.com)

![Splash Page](https://github.com/Amlovern/nerdrr/assets/97067452/2a4bc08c-8b40-4a27-b1b9-a1e291d5ee0a)

## Technologies Used
 - Python3
 - SQL Alchemy
 - Sequelize
 - Javascript
 - CSS
 - HTML5
 - React
 - Redux
 - NodeJS
 - AWS S3

## Getting started
1. Clone this repository (only this branch)

   ```bash
   git clone https://github.com/Amlovern/nerdrr.git
   ```

2. Install dependencies

      ```bash
      pipenv install --dev -r dev-requirements.txt && pipenv install -r requirements.txt
      ```

3. Create a **.env** file based on the example with proper settings for your
   development environment
   
4. Setup your PostgreSQL user, password, and database and make sure it matches your **.env** file

5. Get into your pipenv, migrate your database, seed your database, and run your Flask app

   ```bash
   pipenv shell
   ```

   ```bash
   flask db upgrade
   ```

   ```bash
   flask seed all
   ```

   ```bash
   flask run
   ```

6. Change the working directory into react-app and install dependencies

    `npm install`
    
7. Start the app using:

    `npm start`

## Feature List

- Splash Page
  - All visitors can view recent gigs that have been created
  - Recent gigs will be separated by the category they fall under
- Sign-Up Page
  - Users can sign up to fully experience the site
  - Users can sign in as a demo user to test the site out before joining
- Login Page
  - Users can sign in to their account to fully experience the site
  - Users can sign in as a demo user to test the site out before signing in
- My Orders Page
  - Logged-in users can view orders they have placed
  - A user can click on an order card to be redirected to that order's confirmation page
- Create a New Gig Page
  - Logged-in users can create a new gig to provide a service to other users
- Gig Detail Page
  - Users can view a gig's detail page to view different aspects of the gig before ordering:
    - Gig Title
    - Gig Owner
    - Gig Category
    - Gig Description
    - Gig Price
    - Gig Delivery Timeline
    - Gig Cancellation Timeline
- Order Confirmation Page
  - Logged-in users can view order details for an order they have placed
  - Different aspects of the order they can view:
    - Order Confirmation Number
    - Gig Title for Order
    - Date Order was Placed
    - Date Order is Due
    - Last Date to Cancel or Make Changes
    - Order Delivery Instructions

## Snapshots


### Sign-Up Page
![Sign-Up](https://github.com/Amlovern/nerdrr/assets/97067452/8b30a2eb-7ab7-4c1e-8fab-ccfc76b47374)

### Login Page
![Login](https://github.com/Amlovern/nerdrr/assets/97067452/cedb4cc1-7ed2-491a-bd4f-15db9baeaeb9)

### My Orders Page
![My Orders](https://github.com/Amlovern/nerdrr/assets/97067452/7e9f63c1-4134-4e14-8197-c847cb64bfe6)

### Create a New Gig Page
![New Gig](https://github.com/Amlovern/nerdrr/assets/97067452/447fd8d8-c99b-4445-b7bf-73c448f2b536)

### Gig Details Page
![Gig Details](https://github.com/Amlovern/nerdrr/assets/97067452/b434a39c-7815-4643-ba0e-f4187027ac5a)

### Search Results Page
![Search Results](https://github.com/Amlovern/nerdrr/assets/97067452/7369f1ff-78d1-495e-97de-0ca33aef1f5f)

### User pages to display all gigs by a certain user
![My Gigs](https://github.com/Amlovern/nerdrr/assets/97067452/8b98c735-322b-48e3-80fd-ff5b7cb13436)

### Category Page
![Category Page](https://github.com/Amlovern/nerdrr/assets/97067452/df6bf726-7e2b-4808-9f3f-cf6c1bc457ef)
