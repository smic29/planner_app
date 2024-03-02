class TasksController < ApplicationController
  before_action :authenticate_user!
  before_action :find_category, only: [ :index ]

  def index
    @tasks = @category.tasks
  end

  private

  def find_category
    @category = current_user.categories.find(params[:category_id])
  end
end
