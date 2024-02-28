# Planner App

## Made with:
- Ruby
- Ruby on Rails
- HTML/CSS/JavaScript
- Bootstrap
- Postgres

## User Stories
- [ ] I want to create a category that can be used to organize my tasks.
- [ ] I want to edit a category to update the category's details.
- [ ] I want to view a category to show the category's details.
- [ ] I want to create a task for a specific category so that I can organize tasks quicker.
- [ ] I want to edit a task to update task's details.
- [ ] I want to view a task to show task's details.
- [ ] I want to delete a task to lessen my unnecessary daily tasks.
- [ ] I want to view my tasks for today for me to remind what are my priorities for today.
- [x] I want to create my account so that I can have my own credentials.
- [ ] I want to login my account so that I can access my account and link my own tasks.

## TODO
- [x] Fix sign up validation errors. 02/27/24
- [x] Turn notice into a dismissable alert. Look into what can be done for alerts.
- [ ] Category Model & Task Model.
- [x] Find out why notices are not appearing when in Turbo Frame
  - Listed #2 in Issues Encountered.

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