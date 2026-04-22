const cards = document.querySelectorAll(".service-card");
const pagination = document.getElementById("pagination");

const itemsPerPage = 6;
let currentPage = 1;

function showPage(page) {
  currentPage = page;

  const start = (page - 1) * itemsPerPage;
  const end = start + itemsPerPage;

  cards.forEach((card, index) => {
    card.style.display = index >= start && index < end ? "block" : "none";
  });

  renderPagination();
}

function renderPagination() {
  const totalPages = Math.ceil(cards.length / itemsPerPage);
  pagination.innerHTML = "";

  for (let i = 1; i <= totalPages; i++) {
    const link = document.createElement("a");
    link.href = "#";
    link.innerText = i;

    if (i === currentPage) {
      link.classList.add("active");
    }

    link.addEventListener("click", function (e) {
      e.preventDefault();
      showPage(i);
    });

    pagination.appendChild(link);
  }
}

showPage(1);
