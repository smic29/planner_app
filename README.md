# Planner App

## Current Deploy:
- [Planner App(Render)](https://planner-app-elox.onrender.com/)
  - Stable but doesn't have ActionCable functionality yet.

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

## Deployment Process
This app is currently deployed in railway(unstable) and render(stable)

### Resources
- [Youtube Tutorial](https://www.youtube.com/watch?v=PsS0bF_xmXQ)
- [Rails Guide: ActionCable](https://guides.rubyonrails.org/action_cable_overview.html)
- [Issue # 1](https://github.com/rails/rails/issues/32947#issuecomment-470380517)
- [Issue # 2](https://stackoverflow.com/questions/6282307/execjs-and-could-not-find-a-javascript-runtime)

### Issues Encountered on build and deploy
This is the most stable deploy of this project. Although the main feature, which I want to showcase, broadcasts with ActionCables, is still not functional.

1. secret_key_base / master key issue on assets:precompile
 - Add an environment variable on render:  `SECRET_KEY_BASE = {your_secret_key}` 

### What I've learned throughout the deployment process:
   - Broadcasts with ActionCables is still quite difficult with free plans.
   - I think I'd need to get a hobby plan then add a redis instance?
     - Still studying what I could do about this, thus I kept the broadcast code commented out.
   - Currently working by utilizing render as the main view deploy and an instance of redis in railway.app

### How I made Action cable work
  - The first thing required is having a redis instance, which luckily I had since I tried to first deploy this project on railway.app. Using the REDIS_URL variable in railway, I added an environment variable in render under the same name.
  - After the REDIS_URL variable was set, I made sure that the production url for `cable.yml` was set to the same variable.