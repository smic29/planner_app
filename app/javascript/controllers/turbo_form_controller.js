import { Controller } from "@hotwired/stimulus"


// Connects to data-controller="turbo-form"
export default class extends Controller {
  connect() {
    console.log('this is connected')
  }

  go(e) {
    if(e.detail.success) {
      const frame = document.querySelector('#tasks_list')
      const href = frame.querySelector('a')
      frame.src = href.href
    }
  }
}
