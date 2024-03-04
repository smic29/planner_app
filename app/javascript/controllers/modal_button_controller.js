import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="modal-button"
export default class extends Controller {
  connect() {
    // console.log("Hello from the modal-button")
  }

  handleClick(event) {
    event.preventDefault()
    const link = event.currentTarget.href
    const targetFrame = event.currentTarget.dataset.turboFrame

    if (targetFrame) {
      const frame = document.getElementById(targetFrame)
      frame.src = link;
    }
  }
}
