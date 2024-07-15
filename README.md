<h1 style="margin: 30px 0 30px; font-weight: bold;">Vendure App</h1>
<h2>E-Commerce application with React Native, GraphQL and TypeScript</h4>

Welcome to the React Native eCommerce app inspired by Vendure, an eCommerce platform made for developers who want to create customizable and flexible online stores. This application, "Vendure App", allows developers who use Vendure for the web, to have the same opportunity to use in mobile app.

Note: This application is only for client mode, i.e. front-end.

## Feature Demo
| Module | Home                                                                                        | Home                                                                                       | Furniture                                                                                        |Equipment                                                                                 |
| ------ | ---------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| Home   | <img src="assets/feature_demo/Home/home.png" alt="Home" width="200"/> | <img src="assets/feature_demo/Home/home2.png" alt="Home2" width="200"/> | <img src="assets/feature_demo/Home/category_furniture.png" alt="Furniture" width="190"/> | <img src="assets/feature_demo/Home/category_equipment.png" alt="Equipment" width="200"/> |

| Module | Category                                                                                        | Search                                                                                       | Searching                                                                                        | Product                                                                                        |Product                                                                                 |
| ------ | ---------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| Category   | <img src="assets/feature_demo/Category/Category.png" alt="Category" width="200"/> | <img src="assets/feature_demo/Category/Button_search.png" alt="Button_search" width="200"/> | <img src="assets/feature_demo/Category/Searching.png" alt="Searching" width="200"/> | <img src="assets/feature_demo/Category/Product.png" alt="Product" width="200"/> | <img src="assets/feature_demo/Category/Similar.png" alt="Similar" width="200"/> |

| Module | cart                                                                                        | Products                                                                                       | Payment                                                                                        |Pay                                                                                 |
| ------ | ---------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| Cart   | <img src="assets/feature_demo/Cart/Cart.png" alt="Cart" width="200"/> | <img src="assets/feature_demo/Cart/Payment_.png" alt="Payment_" width="200"/> | <img src="assets/feature_demo/Cart/Payment2.png" alt="Payment2" width="200"/> | <img src="assets/feature_demo/Cart/Pay.png" alt="Pay" width="200"/> |

| Module | Login                                                                                        | Register                                                                                       | Profile                                                                                        |Account Information                                                                                 |
| ------ | ---------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| Profile   | <img src="assets/feature_demo/Profile/Login.png" alt="Login" width="200"/> | <img src="assets/feature_demo/Profile/Register_.png" alt="png" width="200"/> | <img src="assets/feature_demo/Profile/Profile_.png" alt="Profile_" width="200"/> | <img src="assets/feature_demo/Profile/Profile2.png" alt="Profile2" width="200"/> |

| Module | History                                                                                        | Purchase Detail                                                                                       | Address                                                                                       | Address Edition                                                                                        |Secutiry                                                                                 |Settings                                                                                 |
| ------ | ---------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| Profile   | <img src="assets/feature_demo/Profile/Profile3.png" alt="Profile3" width="200"/> | <img src="assets/feature_demo/Profile/History_purchase_detal.png" alt="Purchase_detail" width="200"/> | <img src="assets/feature_demo/Profile/Profile4.png" alt="Profile4" width="200"/> | <img src="assets/feature_demo/Profile/Profile5.png" alt="Profile5" width="200"/> | <img src="assets/feature_demo/Profile/Profile6.png" alt="Profile6" width="200"/> | <img src="assets/feature_demo/Profile/Profile7.png" alt="Profile7" width="200"/> |


## System Requirements
   - Node.js (v14.x or higher)
   - Expo CLI
   - Npm (recommended)

## Project Configuration

1. Clone the repository:

   ```bash
      git clone https://github.com/Josemarsilvestre/vendureApp.git
      cd vendureApp
   ```
2. Install the dependencies:

   ```bash
      npm install
   ```
## Backend Configuration

This application uses GraphQL in the backend to make calls to the Vendure API.

Make sure you configure the environment variables in the .env, correctly. For testing, you can use the vendure API, mentioned below:

   ```bash
      API_URL=https://demo.vendure.io/shop-api
   ```

## Project Execution

To launch the app on an emulator or physical device, type:

   ```bash
      npx expo start
   ```

From there, you can choose to run the app on an emulator, on a connected device, or through Expo Go, via the QR code.

## To sign in

To log in, you can use the same methodologies that are on the Vendure website, the demo.

   ```bash
      username: test@vendure.io
      password: test
   ```

## Useful links

If you are a beginner, these links may be useful to better understand the project.

* [www.vendure.io](https://www.vendure.io/)
* [Live Demo](https://demo.vendure.io/)

## Project Structure

The structure of the project is organized as follows:

   - /assets: Static assets such as images and fonts.
   - /reports: weekly report of the application, school use.
   - /src: Configuration of the api, mutation, context, gql and types that the application uses.
   - /utils: Utility functions for common tasks.

## Contribution
Contributions are welcome! If you encounter bugs, performance issues, or have suggestions for new features, feel free to open an issue or submit a pull request.

## License
This project is licensed under the MIT License(https://opensource.org/licenses/MIT).
