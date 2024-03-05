import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="accordion"
export default class extends Controller {
  connect() {
    document.addEventListener('turbo:before-stream-render', (e) => {
      const turboStream = e.target;

      const template = turboStream.querySelector('template');
      
      const content = template.content
      console.log(content)
      const updateId = content.querySelector('turbo-frame').id

      if (this.element.id === updateId){
        const button = content.querySelector(`#button_${updateId}`)
        button.classList.remove('collapsed')

        console.log(button)

        const div = content.querySelector(`#collapse${updateId}`)
        div.classList.add('show')
      }
      // const button = content.querySelector('.accordion-button');
      // button.classList.remove('collapsed');

      // const lastDiv = content.querySelector('.accordion-collapse collapse');
      // lastDiv.classList.add('show');
    })
  }
}
