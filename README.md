# Planner App

## Made with:
- Ruby
- Ruby on Rails
- HTML/CSS/JavaScript
- Bootstrap
- Postgres

## Project References:
- [Hotwire Handbook]('https://hotwired.dev/')

## User Stories
- [x] I want to create a category that can be used to organize my tasks.
- [x] I want to edit a category to update the category's details.
- [x] I want to view a category to show the category's details.
- [x] I want to create a task for a specific category so that I can organize tasks quicker.
- [ ] I want to edit a task to update task's details.
- [x] I want to view a task to show task's details.
- [x] I want to delete a task to lessen my unnecessary daily tasks.
- [ ] I want to view my tasks for today for me to remind what are my priorities for today.
- [x] I want to create my account so that I can have my own credentials.
- [x] I want to login my account so that I can access my account and link my own tasks.

## TODO
- [x] Fix sign up validation errors. 02/27/24
- [x] Turn notice into a dismissable alert. Look into what can be done for alerts.
- [x] Category Model & Task Model.
  - [x] Category Model
  - [x] Task Model
- [x] Find out why notices are not appearing when in Turbo Frame
  - Listed #2 in Issues Encountered.
- [x] Fix main page layout
- [x] Find a way to fix creation so that it happens with Turbo Stream. Modal? Div appears somewhere on screen?
  - Went with a modal that closes after successful submission.
- [x] Complete main page layout with categories and Tasks
- [x] Category turbo-frame will not properly update if empty.
- [x] Clear task new form on complete then redirect back to add button? Maybe just make it a modal again?
  - Made it a modal as well, shares same modal with creating a new task.
- [x] Fix form submission of new task: It doesn't close the modal.
- [ ] Look into the need for being able to delete Categories?
- [ ] Broadcast issues with append.
  - Found a way to fix the devise:warden issue by not using the current_user global variable. Still broken, though.
- [ ] Implement tests.
- [ ] Broadcast tasks?
- [ ] Find way to have user switch to a task to a different category if they want to delete a category
- [ ] have `.turbo_stream.erb` files instead of putting them within the controller.
- [ ] Add default values for complete and finish_by in task model.
- [ ] Do a check of all routes that aren't needed

## Issues Encountered
1. Invalid form inputs will cover the inputs in `divs.field_with_errors`. Found a fix here: [Stack Overflow]('https://stackoverflow.com/questions/5267998/rails-3-field-with-errors-wrapper-changes-the-page-appearance-how-to-avoid-t/8380400#8380400').<br>
   Fix was to place below code in `config/application.rb`
   ```ruby
   config.action_view.field_error_proc = Proc.new { |html_tag, instance|
      html_tag
    }
    ```
2. `:notice` was not being updated properly when a CRUD action was performed within a turbo-frame. The work around I did for this was to just have the buttons for new submit and delete  to default to the root page. See code:
    ```ruby
    , data: { turbo_frame: "_top" }
    ```
    This was added to the buttons that would cause a redirect based on the controller. Doing so allowed notices to happen once more.
    Feels like a work around at this point, and will be looking to update after learning more about Hotwire.

3. Had troubles with implementing a modal for adding a new category. What I did was a button within the category list that would open up the modal which contains the turbo frame for new.html.erb
  ```ruby
  <div class="modal fade" id="signedInModal" tabindex="-1" aria-labelledby="signedInModalLabel" aria-hidden="true" data-controller="new-category-modal">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="signedInModalLabel">Modal title</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <%= turbo_frame_tag "inside_modal", src: new_user_category_path(current_user) do %>
            
        <% end %>
      </div>
    </div>
  </div>
  </div>
  ```
  At this point, it's like this, but I still have plans in the future of reusing this modal. Having `new_user_category_path` is just the current one that works. While that solved the modal displaying issue, the main one I encountered was having the modal close after successfully creating a form. And for that I had to use a stimulus controller: 
  ```js 
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
  ```
  Not gonna lie, the connect code was mainly solved by prompts I gave chatGPT for how I can close the modal using jQuery. The idea that led to prompting AI for that question is noticing that if I place a `data-bs-dimiss = "modal` inside a button, I am able to close the modal itself. But I couldn't find a way to simulate having a button like that in stimulus. For the `submitEnd()` function, I found that out in this [YouTube Video]('https://www.youtube.com/watch?v=1QQ9j3z7NGw').

  4. While testing ActionCable, and testing my understanding of turbo streams, I accidentally created an infinite loop of create. I was unable to close the server using Ctrl+C. Due to this, I was able to find a way to kill running rails servers by using the following:
  - `lsof -wni tcp:localhostPORT` to find the PID
  - `kill -9 PID` to stop the running servers on that port.