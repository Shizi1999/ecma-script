import { useEffect } from "../ultilities";

function CreateBook() {
    const handleSubmit = async (event) => {
        event.preventDefault();
        const src = document.getElementById('src').value;
        const name = document.getElementById('name').value;
        const author = document.getElementById('author').value;
        const price = document.getElementById('price').value;
        const shortDescription = document.getElementById('shortDescription').value;
        const longDescription = document.getElementById('longDescription').value;

        // Validate form inputs
        if (!src || !name || !author || !price || !shortDescription || !longDescription) {
            alert('Please fill in all fields');
            return; // Stop form submission
        }
        const book = {
            name: name,
            short_description: shortDescription,
            list_price: price,
            images: [
                {
                    base_url: src,
                },
            ],
            id: Date.now() + "",
            description: longDescription,
            author: [
                {
                  "id": 9173,
                  "name": author,
                  "slug": author
                }
              ]
        };

        try {
            const response = await fetch('http://localhost:3000/books', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(book),
            });

            if (response.ok) {
                // Book created successfully
                alert('Book created successfully');
            } else {
                // Error creating book
                alert('Error creating book');
            }
        } catch (error) {
            alert('Error creating book', error);
        }
    };

    useEffect(function () {
        const createBookBtn = document.getElementById('create-book');
        createBookBtn.addEventListener('click', handleSubmit);
    })

    return `
        <section class="bg-gray-100">
            <div class="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
                <div class="grid grid-cols-1 gap-x-16 gap-y-8 lg:grid-cols-5">
                    <div class="rounded-lg bg-white p-8 shadow-lg lg:col-span-3 lg:p-12">
                        <div class="space-y-4">
                            <div>
                                <label class="sr-only" for="src">URL ảnh</label>
                                <input
                                    class="w-full rounded-lg border-gray-200 p-3 text-sm"
                                    placeholder="URL ảnh"
                                    type="text"
                                    id="src"
                                    required
                                />
                            </div>
                            <div>
                                <label class="sr-only" for="name">Tên sách</label>
                                <input
                                    class="w-full rounded-lg border-gray-200 p-3 text-sm"
                                    placeholder="Tên sách"
                                    type="text"
                                    id="name"
                                    required
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
                                ></textarea>
                            </div>

                            <div class="mt-4">
                                <button
                                    id="create-book"
                                    class="inline-block w-full rounded-lg bg-black px-5 py-3 font-medium text-white sm:w-auto"
                                >
                                    Tạo sản phẩm
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    `;
}

export default CreateBook;

// Path: tiki/src/pages/UpdateBook.js