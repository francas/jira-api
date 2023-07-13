# Jira API Component Issues

This project is a solution to retrieve and display components without a component lead, along with the number of issues for each component, using the Jira REST API.

## Requirements

-   Node.js (v14 or above)
-   Axios library
-   dotenv package

## Setup

1. Install the dependencies:

```
npm install
```

2. Enter the Jira credentials in `.env` file. If the Jira API endpoint has public access and does not require authentication, you can omit the `JIRA_EMAIL` and `JIRA_API_TOKEN` values in the `.env` file. The script will still work as expected.

## Usage

To run the script and retrieve the components without a component lead and their issue count, execute the following command:

```
node jira-api.js
```
