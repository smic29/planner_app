import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="categ-btn"
export default class extends Controller {
  static targets = [ "button" ]

  connect() {
    const home_btn = document.querySelector('#navHome')

    home_btn.addEventListener('click',() => {
      this.buttonTargets.forEach((btn) => {
        btn.classList.remove('btn-primary', 'text-white', 'pe-none')
        btn.classList.add('btn-outline-primary', 'link-dark')
      })
    })
  }

  add_active(e) {
    
    this.buttonTargets.forEach((btn) => {
      btn.classList.remove('btn-primary', 'text-white', 'pe-none')
      btn.classList.add('btn-outline-primary', 'link-dark')
    })
    
    let active_button = e.target
    active_button.classList.remove('btn-outline-primary', 'link-dark')
    active_button.classList.add('btn-primary', 'text-white', 'pe-none')
    
  }
}
