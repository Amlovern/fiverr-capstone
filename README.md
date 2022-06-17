# Nerdrr

Inspired by Fiverr, Nerdrr is an online community where users can list services that they can provide, called "gigs", that other users can order. This site is based around "nerdy" topics such as Card Games, Tabletop Games, Video Games, and Anime.
Check out a live version of Nerdrr here: [https://nerdrr.herokuapp.com/](https://nerdrr.heorkuapp.com)

## Technologies Used
 - Python3
 - Sql Alchemy
 - Sequelize
 - Javascript
 - CSS
 - HTML5
 - React
 - Redux
 - NodeJS

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
   
4. Setup your PostgreSQL user, password and database and make sure it matches your **.env** file

5. Get into your pipenv, migrate your database, seed your database, and run your flask app

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

6. Change working directory into react-app and install dependencies

    `npm install`
    
7. Start the app using:

    `npm start`

## Feature List

- Splash Page
  - All visitors are able to view recent gigs that have been created
  - Recent gigs will be separated by the category they fall under
- Sign-Up Page
  - Users can sign up to fully experience the site
  - Users can sign in as a demo user to test the site out before joining
- Login Page
  - Users can sign in to their account to fully experience the site
  - Users can sign in as a demo user to test the site out before signing in
- My Orders Page
  - Logged in users can view orders they have placed
  - A user can click on a order card to be redirected to that order's confirmation page
- Create a New Gig Page
  - Logged in users can create a new gig to provide a service to other users
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
  - Logged in users can view order details for an order they have placed
  - Different aspects of the order the can view:
    - Order Confirmation Number
    - Gig Title for Order
    - Date Order was Placed
    - Date Order is Due
    - Last Date to Cancel or Make Changes
    - Order Delivery Instructions

## Snapshots

### Splash Page
![Splash Page](https://user-images.githubusercontent.com/97067452/174206331-1b0b6970-a025-4029-a117-0c4773d74637.png)

### Sign-Up Page
![Sign-Up](https://user-images.githubusercontent.com/97067452/174206432-d890d906-0966-44be-8d56-fe8f34c0ccec.png)

### Login Page
![Login](https://user-images.githubusercontent.com/97067452/174206495-e30c83a1-6d78-41ad-83d4-d317cf485b91.png)

### My Orders Page
![My Orders](https://user-images.githubusercontent.com/97067452/174207621-2ac3ffa9-9e37-439d-918e-d2e6a473c56c.png)

### Create a New Gig Page
![New Gig](https://user-images.githubusercontent.com/97067452/174207653-28eeff00-af2b-4f68-b16f-69af9f712336.png)

### Gig Details Page
![Gig Details](https://user-images.githubusercontent.com/97067452/174207744-cc799eab-a525-4aeb-ae96-ce976f8d010e.png)

### Order Confirmation Page
![Order Confirmation](https://user-images.githubusercontent.com/97067452/174207892-63d33e23-05cb-47de-97ae-31b73ab03150.png)

## Future Features

 - Search Feature
 - AWS Buckets for pictures
 - User pages to display all gigs by a certain user
 - Category Pages to display all gigs from a certain category
 - Reviews and Ratings for gigs
 - Different price tiers on gigs with varyings services
