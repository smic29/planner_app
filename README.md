# Planner App

## Current Deploy:
- [Planner App(Railway)](https://plannerapp-production.up.railway.app/)
  - Currently unstable and frequently crashes.
  - Used for redis instance
- [Planner App(Render)](https://planner-app-elox.onrender.com/)
  - Full functionality.

## Made with:
- Ruby
- Ruby on Rails
- HTML/CSS/JavaScript
- Bootstrap
- Postgres

## Project References:
- [Hotwire Handbook](https://hotwired.dev/)
- [Hotrails Tutorial](https://www.hotrails.dev/turbo-rails/turbo-streams)
- [Issue #5: Updating Turbo-stream render template](https://github.com/hotwired/turbo/pull/20)

## User Stories
- [x] I want to create a category that can be used to organize my tasks.
- [x] I want to edit a category to update the category's details.
- [x] I want to view a category to show the category's details.
- [x] I want to create a task for a specific category so that I can organize tasks quicker.
- [x] I want to edit a task to update task's details.
- [x] I want to view a task to show task's details.
- [x] I want to delete a task to lessen my unnecessary daily tasks.
- [x] I want to view my tasks for today for me to remind what are my priorities for today.
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
- [x] Broadcast issues with append.
  - Found a way to fix the devise:warden issue by not using the current_user global variable.
  - Fixed by adding a target to locals in Category model.
    ```ruby
    after_create_commit -> {
    broadcast_prepend_to :cat_list,
    partial: "categories/category",
    locals: { category: self}, target: "cat_list" }
    ```
- [x] Add task fields for complete by and completed? columns.
- [x] Look into the need for being able to delete Categories?
  - Just allowed deletion. Can't see why not.
- [x] Add default values for complete and finish_by in task model.
- [x] Make sure modal has a title of what it is displaying. Or remove it. I dunno
  - Added a stimulus controller that checks the turbo frame src:
  - ```ruby
      connect() {
        const turboFrame = this.element.querySelector('turbo-frame')
        const title = this.element.querySelector('#signedInModalLabel')
        
        turboFrame.addEventListener('turbo:frame-load', (e) => {
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
    ```
- [x] Do something about the 'TypeError' happening when editing a category within the task index.
  - Likely has something to do with the stimulus. Check on that => Yeah that's it.
  - Added a check if there's a turbo frame on the render that'll happen. Then just assigns null if there's none.
  - ```js
      const turboFrame = content.querySelector('turbo-frame');
      const updateId = turboFrame ? turboFrame.id : null;
    ```
- [x] Ideas for Task for today:
  - [x] Badges on Categories.
  - Notification type button that would open? -- Maybe... maybe not.
- [x] Broadcast tasks?
  - Refactored task partial to use `task.category` instead of passing @category to the partial. This change made `broadcasts_to -> (task) { "tasks" }` possible.
  - A lot to still learn and implement. But this worked, and I'm happy.
- [x] Category badges only update when Categories are updated. Adding new tasks will not update it.
  - This was done by adding a broadcasts_to within the task model that targets the category list partial:
  - ```ruby
       broadcasts_to ->(task) { "tasks" }, inserts_by: :append
      after_create_commit -> {
        broadcast_replace_to "categories",
        target: self.category,
        partial: "categories/category",
        locals: { category: self.category }
      }
    ```
  - just need to add this to create, delete, and update.
  - See what happens when broadcasting is finished for Tasks.
- [x] Turbo streams need to be reviewed. Every user can see others' updates / additions
  - Found a way using Hotwire tutorial to keep category streams unique for each user.
  - ```ruby
      # Broadcast was updated to:
      broadcasts_to ->(category) { [category.user, "categories"] }, inserts_by: :append

      # Then I added current_user to the turbo_stream tag:
      <%= turbo_stream_from current_user, "categories" %>
    ```
- [x] Category updates will reset the active category button
  - Might want to reference accordion for fix.
  - Fixed by adding a stimulus controller that listens for a `turbo:before-stream-render` event. It will then check if the stream target matches the div ID then will add classes from there. Code is in `app/javascript/controllers/categ_btn_controller`
- [x] Implement tests.
  - See Issue #6 for installation in WSL
  - [x] System test for landing page.
- [x] Fix notifications.
  - [x] Done for categories
  - [x] Done for user sign in and log out.
- [ ] Find a way to post a patch request after checking a checkbox.
- [ ] Find way to have user switch to a task to a different category if they want to delete a category
- [ ] Do a check of all routes that aren't needed
  - Remove users? As per code review 3/9/24
    - Rails error screen when going to `/users` path
- [ ] Add validation for categories to be unique.
- [ ] Do some pre-final style changes.
  - Currently only working for sign in and sign out.
- [ ] Feature to display task for today, tomorrow, or next week.
- [ ] Updates on task will broadcast replace and already open accordion.
  - Review the controller or just sign this off as a feature. omegalul
- [ ] Re route 404 errors
  - Possible Resources:
    - [Error Reroutes](https://reintech.io/blog/how-to-create-a-custom-error-page-in-rails)
- [ ] Fix production ActionCables

## Issues Encountered
1. Invalid form inputs will cover the inputs in `divs.field_with_errors`. Found a fix here: [Stack Overflow](https://stackoverflow.com/questions/5267998/rails-3-field-with-errors-wrapper-changes-the-page-appearance-how-to-avoid-t/8380400#8380400).<br>
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
  Not gonna lie, the connect code was mainly solved by prompts I gave chatGPT for how I can close the modal using jQuery. The idea that led to prompting AI for that question is noticing that if I place a `data-bs-dimiss = "modal` inside a button, I am able to close the modal itself. But I couldn't find a way to simulate having a button like that in stimulus. For the `submitEnd()` function, I found that out in this [YouTube Video](https://www.youtube.com/watch?v=1QQ9j3z7NGw).

  4. While testing ActionCable, and testing my understanding of turbo streams, I accidentally created an infinite loop of create. I was unable to close the server using Ctrl+C. Due to this, I was able to find a way to kill running rails servers by using the following:
  - `lsof -wni tcp:localhostPORT` to find the PID
  - `kill -9 PID` to stop the running servers on that port.

  5. Not an issue, I think, but I wanted the turbo-stream render on my task index to have the targetted update show up as opened just so the edit can be seen right away. Took awhile to understand how to get it done, but I was able to accomplish my intent by having an accordion_controller:
  ```js
    // Connects to data-controller="accordion"
  export default class extends Controller {
    connect() {
      document.addEventListener('turbo:before-stream-render', (e) => {
        const turboStream = e.target;
        const template = turboStream.querySelector('template');
        const content = template.content
        const updateId = content.querySelector('turbo-frame').id

        if (this.element.id === updateId){
          const button = content.querySelector(`#button_${updateId}`)
          button.classList.remove('collapsed')

          const div = content.querySelector(`#collapse${updateId}`)
          div.classList.add('show')
        }
      })
    }
  }
  ```
    - Basically, the controller listens for the turbo-stream before-render event then accesses the template included in that stream to update the necessary elements to keep the tab open.
  
  6. Test issues:
    - Since I'm running WSL, I experienced multiple issues, but these are the steps I've done:
      - `sudo apt install libnss3-dev libgdk-pixbuf2.0-dev libgtk-3-dev libxss-dev`
      - `sudo apt install libnss3`
      - `sudo apt install -y chromium-browser`
      - `sudo apt install chromium-chromedriver`
  
  7. Form submit on within a turbo-frame:
     - Had an issue arise with category edit form. Since it's within the index view of task, when I added a turbo stream respond on controller:
        ```ruby
          respond_to do |format|
            format.html { redirect_to category_tasks_path(@category), notice: 'Category was   successfully updated.' }
            format.turbo_stream { flash.now[:notice] = "Category Updated"
                                    render turbo_stream: turbo_stream.update("toasts", partial: "shared/toast")
                                  }
          end
        ```
       - Submitting successfully would then not revert the turbo frame back to where it was. Thus, I added a stimulus controller that would refresh the frame based on the cancel link I had within the category edit view:
      ```js
      export default class extends Controller {
        connect() {
          console.log('this is connected')
        }

        go(e) {
          if(e.detail.success) {
            const frame = document.querySelector('#tasks_list')
            const href = frame.querySelector('a')
            frame.src = href.href
          }
        }
      }
      ```
       - I feel like this process could be further improved, but for now (03/12/24) it works.

## Deployment Process
This app is currently deployed in railway(unstable) and render(stable)

### Resources
- [Youtube Tutorial](https://www.youtube.com/watch?v=PsS0bF_xmXQ)
- [Rails Guide: ActionCable](https://guides.rubyonrails.org/action_cable_overview.html)
- [Issue # 1](https://github.com/rails/rails/issues/32947#issuecomment-470380517)
- [Issue # 2](https://stackoverflow.com/questions/6282307/execjs-and-could-not-find-a-javascript-runtime)

### What I've learned throughout the deployment process:
   - Broadcasts with ActionCables is still quite difficult with free plans.
   - I think I'd need to get a hobby plan then add a redis instance?
     - Still studying what I could do about this, thus I kept the broadcast code commented out.
   - Currently working by utilizing render as the main view deploy and an instance of redis in railway.app
   - ActionCables have been made functional by using a redis instance.

### How I made Action cable work
  - The first thing required is having a redis instance, which luckily I had since I tried to first deploy this project on railway.app. Using the REDIS_URL variable in railway, I added an environment variable in render under the same name.
  - After the REDIS_URL variable was set, I made sure that the production url for `cable.yml` was set to the same variable.