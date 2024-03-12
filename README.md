# Angular Registration App

This Angular application provides a simple user registration form with username validation and country selection. The form is powered by Angular Reactive Forms and communicates with a mock API to check username availability and register new users.
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.2.12.

## Running the Application Locally

1. Clone the repository:
   git clone repo-url
2. npm install
3. Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Technologies Used

- **Angular**: A powerful front-end framework for building dynamic web applications.
- **Angular Material**: A set of UI components designed by Google for Angular applications, used to enhance the visual appeal and functionality.
- **RxJS**: A library for reactive programming using Observables, providing a convenient way to work with asynchronous data and events.
- **HttpClient Module**: Angular's built-in module for making HTTP requests to APIs.

## APIs Used

- **Countries API**: Mock API used to retrieve a list of countries for the country selection dropdown.
  - Endpoint: `https://my-json-server.typicode.com/shrushtishahjashds/usheru_registration_app_dev/countries`

- **Username Availability API**: Mock API used to check the availability of a chosen username.
  - Endpoint: `https://dev-026lxd7jmuitd5j.api.raw-labs.com/mock/api/username-available`

- **User Registration API**: Mock API used to register new users.
  - Endpoint: `https://my-json-server.typicode.com/shrushtishahjashds/usheru_registration_app_dev/register`

## Application Overview

Registration Form
The registration form consists of the following fields:

Username: A unique alphanumeric identifier for the user.
Country: A dropdown list to select the user's country.
Username Availability Check
When entering a username, the application checks its availability by requesting the username-available API endpoint.

User Registration
Upon successful completion of the form, the application sends a POST request to the register API endpoint to register the user.

Folder Structure
src/app/registration: Contains the registration component and service.






