import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  
  connect() {
    this.updateActiveLinks()
  }

  turboLoad() {
    this.updateActiveLinks()
  }
  
  updateActiveLinks() {
    const links = this.element.querySelectorAll(".nav-link")
    const frame = this.element.querySelector("#login_signup_frame")
    
    links.forEach(link => {
      
      link.addEventListener('click',() => {
         links.forEach(otherLink => {
          otherLink.classList.remove("active")
         })

         link.classList.add("active")
        
      })
    })
  }
}
