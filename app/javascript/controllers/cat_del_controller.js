import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="cat-del"
export default class extends Controller {
  connect() {
    this.element.addEventListener('click',() => {
      const turboFrame = document.querySelector('turbo-frame#tasks_list')

      turboFrame.src = '/dashboard'
    })
  }
}
