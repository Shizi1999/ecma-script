import { useEffect, useState } from "../ultilities";

const Dashboard = function () {
  const [books, setBooks] = useState([]);
  // fetch
  useEffect(function () {
    fetch("http://localhost:3000/books")
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        // console.log(data);
        setBooks(data);
      });
  }, []);

  useEffect(function () {
    // Add event
    const deleteBtns = document.querySelectorAll(".btn-delete");
    deleteBtns.forEach(function (btn) {
      btn.addEventListener("click", function () {
        const result = confirm("Bạn đã chắc chắn muốn xóa sản phẩm chưa ?");
        if (result) {
          const id = btn.dataset.id;
          handleDeleteBook(id);
        }
      });
    });
  });

  const handleDeleteBook = function (id) {
    fetch("http://localhost:3000/books/" + id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  return /*html*/ `
        <h1 class="text-xl">Thông tin sản phẩm</h1>
        <a href="/admin/create-book">
          <button class="bg-green-600 font-medium text-white px-4 py-2 rounded text-xs hover:bg-green-700">Thêm mới sản phẩm</button>
        </a>

        <div class="">
            <table class="w-full bg-white text-sm">
            <thead class="ltr:text-left rtl:text-right">
                <tr>
                    <th class="w-[5%] px-4 py-2 font-medium text-gray-900">STT</th>
                    <th class="w-[25%] px-4 py-2 font-medium text-gray-900">Tên sách</th>
                    <th class="w-[30%] px-4 py-2 font-medium text-gray-900">Mô tả ngắn</th>
                    <th class="w-[10%] px-4 py-2 font-medium text-gray-900">Giá sách</th>
                    <th class="w-[20%] px-4 py-2 font-medium text-gray-900">Ảnh minh họa</th>
                    <th class="w-[10%] px-4 py-2"></th>
                </tr>
            </thead>

            <tbody class="divide-y divide-gray-200">
                ${books
                  .map(
                    (book, index) => /*html*/ `
                    <tr>
                        <td class="px-4 py-2 font-medium text-gray-900">${
                          index + 1
                        }</td>
                        <td class="px-4 py-2 text-gray-700">${book.name}</td>
                        <td class="px-4 py-2 text-gray-700">${
                          book.short_description
                        }</td>
                        <td class="px-4 py-2 text-gray-700">${
                          book.list_price
                        }</td>
                        <td class="px-4 py-2 text-gray-700">
                            <img src="${book.images[0].base_url}"/>
                        </td>
                        <td class="whitespace-nowrap px-4 py-2">
                            <a
                            href="/admin/book/${book.id}" 
                            class="inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700"
                            >
                            Cập nhật sản phẩm
                            </a>
                            <button data-id="${
                              book.id
                            }" class="btn-delete bg-red-600 font-medium text-white px-4 py-2 rounded text-xs  hover:bg-red-700">Xoá sản phẩm</button>
                            
                        </td>
                    </tr>
                `
                  )
                  .join("")}
            </tbody>
            </table>
        </div>
    `;
};

export default Dashboard;
