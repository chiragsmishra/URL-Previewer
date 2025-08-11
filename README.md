# URL Previewer

This is a simple web application that generates a preview card for a given URL, displaying the title, description, and image associated with it.

## Overview

The application consists of a React front-end and a Node.js (Express) back-end. The user enters a URL in the input field, and upon clicking the "Fetch Preview" button, the front-end sends a request to the back-end. The back-end then fetches the HTML of the provided URL, parses the meta tags to extract the relevant information, and returns it to the front-end to be displayed in a preview card.

## Features

-   URL input with a "Fetch Preview" button.
-   Displays a preview card with title, description, and image.
-   Shows a loading state while fetching the preview.
-   Displays clear error messages for invalid URLs or fetch failures.
-   Handles pages with missing metadata.

## Tech Stack

-   **Front-end:** React, Vite, Tailwind CSS
-   **Back-end:** Node.js, Express

## Setup and Installation

### Prerequisites

-   Node.js and npm installed on your machine.

### Back-end

1.  Navigate to the `backend` directory:
    ```bash
    cd backend
    ```
2.  Install the dependencies:
    ```bash
    npm install
    ```
3.  Create a `.env` file in the `backend` directory and add the following environment variables:
    ```
    # Server Configuration
    PORT=3000
    NODE_ENV=development

    # Frontend Configuration
    FRONTEND_URL=http://localhost:5173

    # HTTP Client Configuration
    USER_AGENT="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
    REQUEST_TIMEOUT=15000   
    ```

### Front-end

1.  Navigate to the `frontend` directory:
    ```bash
    cd frontend
    ```
2.  Install the dependencies:
    ```bash
    npm install
    ```

## Running the Application

### Back-end

1.  Navigate to the `backend` directory:
    ```bash
    cd backend
    ```
2.  Start the server:
    ```bash
    npm start
    ```
    The back-end will be running on `http://localhost:3000`.

### Front-end

1.  Navigate to the `frontend` directory:
    ```bash
    cd frontend
    ```
2.  Start the development server:
    ```bash
    npm run dev
    ```
    The front-end will be running on `http://localhost:5173`.

## Assumptions and Trade-offs

-   **HTML Parsing:** We use cheerio on the backend for fast HTML parsing. It works well for extracting meta tags from static pages but doesn’t run JavaScript or handle dynamic content. For dynamic pages, tools like Puppeteer can load and execute JavaScript before parsing.

-   **Error Handling:** The error handling is basic. It catches fetch issues and bad URLs but doesn’t distinguish between errors like 404 vs 500 or give very detailed parsing messages.

-   **Security:** There are no extra security steps like rate limiting or input checks.

