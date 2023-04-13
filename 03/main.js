function loading(event) {
  const button = event.currentTarget
  button.classList.add("loading")
  const text = button.textContent
  button.innerHTML = `
        <i class="ph-circle-notch"></i>
        ${text}
        `
}
