document.querySelectorAll(".price").forEach(node => {
  node.textContent = new Intl.NumberFormat("en", {
    currency: "usd",
    style: "currency"
  }).format(node.textContent);
});
