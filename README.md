# Bio-Bid

You can find the deployed project at https://biobidlabs.com/.

## Contributors

[Alston Garrett](https://github.com/Neytoro)
| [Andrea Harris](https://github.com/aharris1012)
| [Joshua Agins](https://github.com/jagins)
| [James Morris](https://github.com/)
| [Emmanuelle Berda](https://github.com/)
| [Josiah Roa](https://github.com/josiahroa18)
| [David Shestopal](https://github.com/DavidShestopal)
| [Brandon Fulmer](https://github.com/nobro777)

<br>
<br>

![MIT](https://img.shields.io/packagist/l/doctrine/orm.svg)
![React](https://img.shields.io/badge/react-v16.7.0--alpha.2-blue.svg)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![Maintainability](https://api.codeclimate.com/v1/badges/5172c7cb7e3b192f2a43/maintainability)](https://codeclimate.com/github/Lambda-School-Labs/bio-bid-fe/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/5172c7cb7e3b192f2a43/test_coverage)](https://codeclimate.com/github/Lambda-School-Labs/bio-bid-fe/test_coverage)

## Project Overview

[Trello Board](https://trello.com/b/lO90hEuU/labs-22-bio-bid)

[Product Canvas](https://www.notion.so/Bio-Bid-Dashboard-a9a7a54106e34ec9adc20ee33268c0b7)

[UX Design files](https://www.figma.com/file/o45cmaotaVWtBtlRblcMei/Bio-Bid%2C-Emmanuelle-%26-James?node-id=409%3A5265)

# Description

Connecting clinical trial sponsors to the right services providers for their needs.

#### Note

BioBids main landing page will reside on Alex’s (stakeholder) WordPress website. From there it will be a button which when clicked will redirect the user to our BioBids application. Once on our application, you’ll be met with a list of service providers. To access other items in our application you will need to use specific routes in your url. For example to access the “bids” page you’d need to go to https://biobidlabs.com then include /bids in your url for the bids page.

Example: https://biobidlabs.com/bids

### Key Features

- Dashboard for all users with a searchable table.
- Profile page with a description of what they offer, link to their site, picture or logo.
- Verified each company manually to approve them.
- Administrator Log in - is able to bid on services.
- Staff Log in - is able to update the dashboard and flag "potential" services.
- Reviews for service providers.
- Ability to search for specific service providers.
- Ability to add/edit company profile pages

## Tech Stack

### Front end built using:

#### React.js

This framework was chosen as it's the framework we feel the most comfortable and flexible using.

Dependencies:

- Apollo-Boost
- Bootstrap
- Dotenv
- Graphql
- jquery
- js-search
- Material-Table
- Moment
- React-Apollo
- React-Router-Dom
- Reactstrap
- Styled-Components
- Styled-Icons
- Typescript

#### Front end deployed to `Heroku.com`

#### [Back end](https://github.com/Lambda-School-Labs/bio-bid-fe/) built using:

#### Node.js

- Apollo/GraphQL
- Prisma
- PostGres
- Jest & Babel (Testing)

# APIs

## 2️⃣ Authentication API here

🚫Replace text below with a description of the API

Water's like me. It's laaazy ... Boy, it always looks for the easiest way to do things A little happy sunlight shining through there. Let all these little things happen. Don't fight them. Learn to use them. Even the worst thing we can do here is good.

# Environment Variables

In order for the app to function correctly, the user must set up their own environment variables. There should be a .env file containing the following:

    *  REACT_APP_SERVER_ENDPOINT - this is your local url to your locally deployed server. (http://localhost:5000/)

# Content Licenses

| Image Filename | Source / Creator | License                                                                      |
| -------------- | ---------------- | ---------------------------------------------------------------------------- |
| doodles.png    | Nicole Bennett   | [Creative Commons](https://www.toptal.com/designers/subtlepatterns/doodles/) |
| rings.svg      | Sam Herbert      | [MIT](https://github.com/SamHerbert/SVG-Loaders)                             |

# 4️⃣ Testing

🚫Document what you used for testing and why

# Installation Instructions

🚫explain how to install the required dependencies to get this project up and running with yarn and NPM

## Other Scripts

    * build - creates a build of the application
    * start - starts the production server after a build is created
    * test - runs tests in **tests** directory
    * eject - copy the configuration files and dependencies into the project so you have full control over them

# Contributing

When contributing to this repository, please first discuss the change you wish to make via issue, email, or any other method with the owners of this repository before making a change.

Please note we have a [code of conduct](./CODE_OF_CONDUCT.md). Please follow it in all your interactions with the project.

## Issue/Bug Request

**If you are having an issue with the existing project code, please submit a bug report under the following guidelines:**

- Check first to see if your issue has already been reported.
- Check to see if the issue has recently been fixed by attempting to reproduce the issue using the latest master branch in the repository.
- Create a live example of the problem.
- Submit a detailed bug report including your environment & browser, steps to reproduce the issue, actual and expected outcomes, where you believe the issue is originating from, and any potential solutions you have considered.

### Feature Requests

We would love to hear from you about new features which would improve this app and further the aims of our project. Please provide as much detail and information as possible to show us why you think your new feature should be implemented.

### Pull Requests

If you have developed a patch, bug fix, or new feature that would improve this app, please submit a pull request. It is best to communicate your ideas with the developers first before investing a great deal of time into a pull request to ensure that it will mesh smoothly with the project.

Remember that this project is licensed under the MIT license, and by submitting a pull request, you agree that your work will be, too.

#### Pull Request Guidelines

- Ensure any install or build dependencies are removed before the end of the layer when doing a build.
- Update the README.md with details of changes to the interface, including new plist variables, exposed ports, useful file locations and container parameters.
- Ensure that your code conforms to our existing code conventions and test coverage.
- Include the relevant issue number, if applicable.
- You may merge the Pull Request in once you have the sign-off of two other developers, or if you do not have permission to do that, you may request the second reviewer to merge it for you.

### Attribution

These contribution guidelines have been adapted from [this good-Contributing.md-template](https://gist.github.com/PurpleBooth/b24679402957c63ec426).

## Documentation

See [Backend Documentation](🚫*link to your backend readme here*) for details on the backend of our project.
