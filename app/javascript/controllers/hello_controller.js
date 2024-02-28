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
    // const frame = this.element.querySelector("#login_signup_frame") I was trying to use frame.src to check, but it wasn't working.
    // This works right now and is a bit simple, but I'll get back to it once I understand hotwire more. maybe...
    
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
