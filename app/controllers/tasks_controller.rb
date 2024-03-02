class TasksController < ApplicationController
  before_action :authenticate_user!
  before_action :find_category, only: [ :index, :new, :create ]

  def index
    @tasks = @category.tasks
  end

  def new
    @task = current_user.tasks.build(category: @category)
  end

  def create
    @task = current_user.tasks.build(task_params)
    @task.category = @category

    respond_to do |format|
      if @task.save
        format.turbo_stream { render turbo_stream: turbo_stream.append(
          :task_list,
          partial: "tasks/task",
          locals: { task: @task }
        )}
        format.html { redirect_to category_tasks_path, notice: "Category was successfully created!"}
      else
        format.html { render :new, status: :unprocessable_entity }
      end
    end
  end

  private

  def find_category
    @category = current_user.categories.find(params[:category_id])
  end

  def task_params
    params.require(:task).permit(:title, :description, :finish_by, :complete)
  end

end
