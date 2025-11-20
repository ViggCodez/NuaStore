# Mini E-commerce Application

A responsive, functional mini e-commerce website built with React and Redux Toolkit, consuming the Fake Store API.

## Features

- **Product Listing**: Responsive grid layout with search and category filtering.
- **Product Details**: Full product information with rating and quantity selector.
- **Shopping Cart**: Manage items, update quantities, and view totals. Persists to `localStorage`.
- **Checkout**: Simple form with validation and order confirmation.
- **State Management**: Redux Toolkit for efficient global state management.
- **Caching**: In-memory caching for products to minimize API calls.
- **Styling**: Custom Vanilla CSS with a modern, clean design system (no heavy frameworks).

## Tech Stack

- **Frontend**: React (Vite)
- **State Management**: Redux Toolkit, React Redux
- **Routing**: React Router DOM
- **API**: Axios
- **Icons**: Lucide React
- **Styling**: Vanilla CSS (CSS Variables)

## Setup & Run

1.  **Clone the repository**
    ```bash
    git clone <repository-url>
    cd ecom-nua
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Run the development server**
    ```bash
    npm run dev
    ```

4.  **Run tests** (if applicable)
    ```bash
    npm test
    ```

## Design Decisions & Trade-offs

-   **Vanilla CSS vs Tailwind**: Chose Vanilla CSS to demonstrate core CSS skills and keep the bundle size small, as requested. Used CSS variables for consistent theming.
-   **Redux Toolkit**: Selected for robust state management, especially for the cart and product caching, which scales better than Context API for this complexity.
-   **Caching Strategy**: Implemented a simple check in the Redux thunk to return existing state if data is already present. This avoids redundant network requests on navigation.
-   **Validation**: Implemented custom form validation in the Checkout component to avoid adding heavy form libraries for a simple use case.

## Folder Structure

```
src/
├── components/     # Reusable UI components (Navbar, etc.)
├── pages/          # Page components (ProductList, ProductDetail, Cart, Checkout)
├── services/       # API service configuration
├── store/          # Redux slices and store setup
├── hooks/          # Custom hooks (if any)
├── App.jsx         # Main application component with routing
├── main.jsx        # Entry point
└── index.css       # Global styles
```

## Bonus Enhancements

-   **Persistent Cart**: Cart data is saved to `localStorage` so users don't lose their items on refresh.
-   **Responsive Design**: Fully responsive layout that adapts to mobile, tablet, and desktop screens.
-   **Loading & Error States**: Proper feedback for network requests and potential errors.
