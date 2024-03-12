import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="toast"
export default class extends Controller {
  connect() {
    this.element.classList.add('fade')
    this.element.classList.add('show')

    setTimeout(() => {
      this.element.classList.remove('show')
      this.element.classList.add('fade')
      this.element.classList.add('hide')
    }, 5000)
  }
}
