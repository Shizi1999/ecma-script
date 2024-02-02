import { useEffect, useState } from "../ultilities";
import { isEmpty } from "lodash";

const UpdateBook = function (id) {
    const [book, setBook] = useState({});

    useEffect(function () {
        fetch("http://localhost:3000/books/" + id)
            .then((res) => res.json())
            .then((data) => setBook(data));
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const name = document.getElementById('name').value;
        const author = document.getElementById('author').value;
        const price = document.getElementById('price').value;
        const shortDescription = document.getElementById('shortDescription').value;
        const longDescription = document.getElementById('longDescription').value;

        // Validate form inputs
        if (!name || !author || !price || !shortDescription || !longDescription) {
            alert('Please fill in all fields');
            return; // Stop form submission
        }
        const updateBook = {
            name: name,
            short_description: shortDescription,
            list_price: price,
            id: Date.now() + "",
            description: longDescription,
            authors: [
                {
                    "id": 9173,
                    "name": author,
                    "slug": author
                }
            ]
        };

        try {
            const response = await fetch('http://localhost:3000/books/' + id, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...book,
                    ...updateBook
                }),
            });

            if (response.ok) {
                // Book created successfully
                alert('Book updated successfully');
            } else {
                // Error creating book
                alert('Error update book');
            }
        } catch (error) {
            alert('Error update book', error);
        }
    };

    useEffect(function () {
        const updateBookBtn = document.getElementById('update-book-btn');
        if (updateBookBtn) {
            updateBookBtn.addEventListener('click', handleSubmit);
        }
    })

    if (isEmpty(book)) {
        return /*html*/ ` <div>Not Found</div>`;
    }

    return /*html*/ `
<section class="bg-gray-100">
    <div class="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
    <div class="grid grid-cols-1 gap-x-16 gap-y-8 lg:grid-cols-5">
        <div class="lg:col-span-2 lg:py-12">
            <img src="${book.images?.[0].base_url}"/>
        </div>

        <div class="rounded-lg bg-white p-8 shadow-lg lg:col-span-3 lg:p-12">
        <div class="space-y-4">
            <div>
                <label class="sr-only" for="name">Tên sách</label>
                <input
                    class="w-full rounded-lg border-gray-200 p-3 text-sm"
                    placeholder="Tên sách"
                    type="text"
                    id="name"
                    required
                    value="${book.name}"
                />
            </div>

            <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                    <label class="sr-only" for="author">Tác giả</label>
                    <input
                        class="w-full rounded-lg border-gray-200 p-3 text-sm"
                        placeholder="Tác giả"
                        type="text"
                        id="author"
                        required
                        value="${book.authors?.[0].name}"
                    />
                </div>
                <div>
                    <label class="sr-only" for="price">Giá tiền</label>
                    <input
                        class="w-full rounded-lg border-gray-200 p-3 text-sm"
                        placeholder="Giá tiền"
                        type="number"
                        id="price"
                        required
                        value="${book.list_price}"
                    />
                </div>
            </div>

            <div>
                <label class="sr-only" for="shortDescription">Mô tả ngắn</label>
                <input
                    class="w-full rounded-lg border-gray-200 p-3 text-sm"
                    placeholder="Đây là phần mô tả ngắn"
                    type="text"
                    id="shortDescription"
                    required
                    value="${book.short_description}"
                />
            </div>

            <div>
                <label class="sr-only" for="longDescription">Mô tả dài</label>
                <textarea
                    class="w-full rounded-lg border-gray-200 p-3 text-sm"
                    placeholder="Chỗ này là phần Description"
                    rows="8"
                    id="longDescription"
                    required
                >${book.description}</textarea>
            </div>

            <div class="mt-4">
                <button
                    id="update-book-btn"
                    class="inline-block w-full rounded-lg bg-black px-5 py-3 font-medium text-white sm:w-auto"
                >
                    Cập nhật sản phẩm
                </button>
            </div>
        </div>
        </div>
    </div>
    </div>
</section>
    `;
};
export default UpdateBook;
