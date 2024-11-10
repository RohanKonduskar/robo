const menuItems = [
    { name: "DOSA", price: 50 },
    { name: "RICE", price: 80 },
    { name: "UPMA", price: 50 },
    { name: "SODA", price: 10 },
    { name: "POHE", price: 20 }
];

// Load menu for the specific table
if (window.location.pathname.includes('menu.html')) {
    const params = new URLSearchParams(window.location.search);
    const tableNumber = params.get('table');
    document.getElementById('table-number').textContent = tableNumber;

    const menuItemsContainer = document.getElementById('menu-items');
    menuItems.forEach(item => {
        const menuItemDiv = document.createElement('div');
        menuItemDiv.classList.add('menu-item');
        menuItemDiv.innerHTML = `
            <label>
                ${item.name} (Rs ${item.price})
                <input type="number" id="quantity-${item.name}" min="0" value="0" />
            </label>
        `;
        menuItemsContainer.appendChild(menuItemDiv);
    });

    // Handle form submission
    document.getElementById('order-form').addEventListener('submit', function (e) {
        e.preventDefault();

        const selectedItems = [];
        menuItems.forEach(item => {
            const quantity = document.getElementById(`quantity-${item.name}`).value;
            if (quantity > 0) {
                selectedItems.push({
                    name: item.name,
                    quantity: quantity,
                    price: item.price,
                    total: quantity * item.price
                });
            }
        });

        if (selectedItems.length > 0) {
            // Save order to local storage
            const orderHistory = JSON.parse(localStorage.getItem('orderHistory')) || [];
            orderHistory.push({ table: tableNumber, items: selectedItems });
            localStorage.setItem('orderHistory', JSON.stringify(orderHistory));

            alert(`Order placed! Total: Rs ${selectedItems.reduce((total, item) => total + item.total, 0)}`);
            window.location.href = 'order-history.html';
        } else {
            alert('Please select at least one item.');
        }
    });
}

// Load order history
if (window.location.pathname.includes('order-history.html')) {
    const orderHistory = JSON.parse(localStorage.getItem('orderHistory')) || [];
    const orderHistoryList = document.getElementById('order-history');
    orderHistory.forEach(order => {
        const orderDiv = document.createElement('li');
        orderDiv.textContent = `Table ${order.table}: ${order.items.map(item => `${item.name} x${item.quantity}`).join(', ')}`;
        orderHistoryList.appendChild(orderDiv);
    });
}
