function fetchProduct() {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    if (!id) {
        alert('Product id not found');
        return
    }
    return fetch('http://localhost:3000/products/' + id, {
        mnethod: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    }).then(response => response.json())
        .then(data => {
            return new Promise((resolve, reject) => {
                resolve(data);
            });
        }).catch((error) => {
            console.error('Error:', error);
        })

}

function handleUpdateProduct(e) {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    if (!id) {
        alert('Product id not found');
        return
    }

    const name = document.getElementById('prdName').value;
    const image = document.getElementById('image').value;
    const desc = document.getElementById('desc').value;
    if (!name) {
        alert('Please enter name');
        return
    }

    if (!image) {
        alert('Please enter image');
        return
    }

    if (!desc) {
        alert('Please enter description');
        return
    }

    const data = {
        name,
        image,
        desc
    }

    fetch('http://localhost:3000/products/' + id, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    }).then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            window.location.href = 'index.html';
        })
        .catch((error) => {
            console.error('Error:', error);
        })
}