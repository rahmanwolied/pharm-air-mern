// admin.js

// Function to fetch and update total orders
function fetchTotalOrders() {
    fetch('https://api.example.com/orders')
      .then(response => response.json())
      .then(data => {
        const totalOrdersElement = document.getElementById('total-orders');
        totalOrdersElement.textContent = data.totalOrders;
      })
      .catch(error => console.error('Error fetching total orders:', error));
  }
  
  // Function to fetch and update total customers
  function fetchTotalCustomers() {
    fetch('https://api.example.com/customers')
      .then(response => response.json())
      .then(data => {
        const totalCustomersElement = document.getElementById('total-customers');
        totalCustomersElement.textContent = data.totalCustomers;
      })
      .catch(error => console.error('Error fetching total customers:', error));
  }
  
  // Function to fetch and update recent orders
  function fetchRecentOrders() {
    fetch('https://api.example.com/recent-orders')
      .then(response => response.json())
      .then(data => {
        const recentOrdersElement = document.getElementById('recent-orders');
        // Iterate through data and create table rows
        data.forEach(order => {
          const row = document.createElement('tr');
          row.innerHTML = `
            <td>${order.orderNumber}</td>
            <td>${order.date}</td>
            <td>${order.customerName}</td>
            <td>${order.total}</td>
            <td>${order.status}</td>
          `;
          recentOrdersElement.appendChild(row);
        });
      })
      .catch(error => console.error('Error fetching recent orders:', error));
  }
  
  // Function to fetch and update top selling products
  function fetchTopSellingProducts() {
    fetch('https://api.example.com/top-selling-products')
      .then(response => response.json())
      .then(data => {
        const topSellingElement = document.getElementById('top-selling');
        // Iterate through data and create table rows
        data.forEach(product => {
          const row = document.createElement('tr');
          row.innerHTML = `
            <td>${product.name}</td>
            <td>${product.price}</td>
            <td>${product.stock}</td>
            <td>${product.sales}</td>
          `;
          topSellingElement.appendChild(row);
        });
      })
      .catch(error => console.error('Error fetching top selling products:', error));
  }
  
  // Call the functions to fetch and update data on page load
  window.onload = function() {
    fetchTotalOrders();
    fetchTotalCustomers();
    fetchRecentOrders();
    fetchTopSellingProducts();
  };
  