function handleAllProduct(e) {
    e.preventDefault();
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

    fetch('http://localhost:3000/products', {
        method: 'POST',
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


