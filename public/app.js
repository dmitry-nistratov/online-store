const toCurrency = price =>
  new Intl.NumberFormat("en", {
    currency: "usd",
    style: "currency"
  }).format(price);

document
  .querySelectorAll(".price")
  .forEach(node => (node.textContent = toCurrency(node.textContent)));

// $ - jquery или html элемент
const $card = document.querySelector("#card");
if ($card) {
  $card.addEventListener("click", event => {
    if (event.target.classList.contains("js-remove")) {
      const id = event.target.dataset.id;
      fetch(`/card/remove/${id}`, {
        method: "delete"
      })
        .then(res => res.json())
        .then(card => {
          if (card.devices.length) {
            const html = card.devices
              .map(c => {
                return `<tr>
                          <td>${c.title}</td>
                          <td>${c.count}</td>
                          <td>
                            <button class="btn btn-small js-remove" data-id="${c.id}">Delete</button>
                          </td>
                        </tr>`;
              })
              .join("");
            $card.querySelector("tbody").innerHTML = html;
            $card.querySelector(".price").textContent = toCurrency(card.price);
          } else {
            $card.innerHTML = "<p>Basket is empty</p>";
          }
        });
    }
  });
}
