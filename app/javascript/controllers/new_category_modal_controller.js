import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="new-category-modal"
export default class extends Controller {
  connect() {
    this.element.addEventListener('modal:close', () => {
      $(this.element).modal("hide");
      this.clearFormFields();
    })
  }

  submitEnd(e){
    if (e.detail.success) {
      this.element.dispatchEvent(new CustomEvent('modal:close'))
    }
  }

  clearFormFields() {
    const form = this.element.querySelector('form');
    form.reset();
  }
}
