# Planner App

## Current Deploy:
- [Planner App(Railway)](https://plannerapp-production.up.railway.app/)
  - Currently unstable and frequently crashes.
  - Used for redis instance
- [Planner App(Render)](https://planner-app-elox.onrender.com/)
  - Full functionality.

## Style Addition
- The goal is to put a copyright with a link to my github as the app footer.

## Progress
- [x] Added a footer with a link to github page.
- [x] Added an animated background for some added design.
- [ ] Add social icons and links when hovering footer.

## Resources
- [Animated Backgrounds](https://animatedbackgrounds.me/)

## Issues Encountered
1. SASS changes not being automatically seen in development.
   - [css files not updating with rails 7](https://www.reddit.com/r/rails/comments/12xlnxg/css_files_not_updating_with_rails_7/)
   - Found that this was caused by `rails assets:precompile` being called in the development environment. The fix I found mentioned removing the precompiled assets and put it back to development mode. This is done by running `rails assets:clobber`