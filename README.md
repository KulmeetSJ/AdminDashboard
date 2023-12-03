# Admin Dashboard 

This project is an Admin Dashboard that renders and displays data in a tabular format. The data is retrieved from the [Geektrust Members API](https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json) and provides various functionalities for managing the displayed data.

## Features
### 1. Data Display
The Admin Dashboard fetches data from the Geektrust Members API and presents it in a clear and organized tabular format.

### 2. Functionalities
2.1 Delete
Users can delete individual entries from the table by clicking the "Delete" button associated with each row.

2.2 Select
Users can select individual rows by clicking the checkbox associated with each row.

2.3 Select All
A "Select All" checkbox is provided at the top of the table, allowing users to select all displayed rows at once.

2.4 Edit
Users can edit the details of a specific row by clicking the "Edit" button. This switches the row to an editable mode, allowing changes to be made.

2.5 Save Edit
After making changes in the editable mode, users can save the edits by clicking the "Save" button.

2.6 Delete All
A "Delete All" button is provided, allowing users to delete all the selected rows at once.

2.7 Pagination
The table supports pagination, dividing the data into manageable pages for easier navigation.

## Technologies Used
- React
- Tailwind CSS
- React Paginate

## Usage

1. Clone the repository:
   ```git clone https://github.com/your-username/admin-dashboard.git```
2. Install dependencies:
   ```npm install```
3. Start the application:
   ```npm start```
4. Open the application in your browser:
   ```http://localhost:3000```

### Acknowledgments
Data provided by Geektrust
Feel free to explore and use this Admin Dashboard for managing tabular data efficiently. If you have any suggestions or encounter issues, please let us know!

### Deployment

Deployed on [Vercel](admin-dashboard-eight-sage.vercel.app)


