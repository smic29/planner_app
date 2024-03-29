import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="accordion"
export default class extends Controller {
  connect() {
    document.addEventListener('turbo:before-stream-render', (e) => {
      const turboStream = e.target;
      const template = turboStream.querySelector('template');
      const content = template.content
      const turboFrame = content.querySelector('turbo-frame');
      const updateId = turboFrame ? turboFrame.id : null;

      if (this.element.id === updateId){
        const button = content.querySelector(`#button_${updateId}`)
        button.classList.remove('collapsed')

        const div = content.querySelector(`#collapse${updateId}`)
        div.classList.add('show')
      }
    })
  }
}
