// Call Api
function getProducts() {
    return fetch('http://localhost:3000/products')
        .then(response => response.json())
        .then(data => {
            return new Promise((resolve, reject) => {
                resolve(data);
            });
        });
}

function deleteProduct(id) {
    const confirmDelete = confirm('Are you sure you want to delete this product?');
    if (!confirmDelete) {
        return;
    }

    fetch('http://localhost:3000/products/' + id, {
        method: 'DELETE',
    }).then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            window.location.href = 'index.html';
        })
        .catch((error) => {
            console.error('Error:', error);
        })
}