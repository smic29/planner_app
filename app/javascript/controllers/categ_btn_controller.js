import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="categ-btn"
export default class extends Controller {
  static targets = [ "button", "div" ]

  connect() {
    const home_btn = document.querySelector('#navHome')
    
    document.addEventListener('turbo:before-stream-render', (e) => {
      const task_frame = document.querySelector('#tasks_list')
      const current_frame_url = task_frame.src.split('/').slice(-2).toString()
      const is_on_dash = task_frame.src.split('/').slice(-1).toString() == 'dashboard'

      const turboStream = e.target;
      const template = turboStream.querySelector('template')
      const content = template.content

      // console.log(turboStream.querySelector('template'))
      this.divTargets.forEach((div) => {
        if (turboStream.target == div.id) {
          const active_a = content.querySelector('a')
          if (!active_a){
            return
          }
          const active_url = active_a.href.split('/').slice(-2).toString()
          const is_on_same_frame = active_url === current_frame_url

          if(!is_on_dash && is_on_same_frame ) {
            active_a.classList.remove('btn-outline-primary', 'link-dark')
            active_a.classList.add('btn-primary', 'text-white', 'pe-none')
    
            const active_b = active_a.nextElementSibling
            const button_itself = active_b.querySelector('button')
    
            button_itself.classList.remove('visually-hidden')
          }
        }
      })
    })
  

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
