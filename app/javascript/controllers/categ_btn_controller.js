import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="categ-btn"
export default class extends Controller {
  static targets = [ "button" ]

  connect() {
    const home_btn = document.querySelector('#navHome')

    home_btn.addEventListener('click',() => {
      this.buttonTargets.forEach((btn) => {
        this.add_remove_class(btn)
      })
    })
  }

  add_active(e) {
    
    this.buttonTargets.forEach((btn) => {
      this.add_remove_class(btn)
    })
    
    let active_button = e.target
    active_button.classList.remove('btn-outline-primary', 'link-dark')
    active_button.classList.add('btn-primary', 'text-white', 'pe-none')

    let del_btn = active_button.nextElementSibling
    let btn = del_btn.querySelector('button')

    btn.classList.remove('visually-hidden')
  }

  add_remove_class(btn) {
    btn.classList.remove('btn-primary', 'text-white', 'pe-none')
    btn.classList.add('btn-outline-primary', 'link-dark')

    btn.nextElementSibling.querySelector('button').classList.add('visually-hidden')
  }
}
