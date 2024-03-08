import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="modal-title"
export default class extends Controller {
  connect() {
    const turboFrame = this.element.querySelector('turbo-frame')
    const title = this.element.querySelector('#signedInModalLabel')
    
    turboFrame.addEventListener('turbo:frame-load', (e) => {
      const url = e.target.src 
      
      if (this.urlMatchesPattern(url, ['users','new'])) {
        title.innerHTML = "Add a new Category"
      }  
      
      if (this.urlMatchesPattern(url, ['edit','tasks'])) {
        title.innerHTML = "Edit a Task"
      }

      if (this.urlMatchesPattern(url, ['new','tasks'])) {
        title.innerHTML = "Add a new Task"
      }
    })
  }

  urlMatchesPattern(url, patterns) {
    const segments = url.split('/')
    return patterns.every(pattern => segments.includes(pattern))
  }

  
}
