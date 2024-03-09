class TasksController < ApplicationController
  before_action :authenticate_user!
  before_action :find_category, only: [ :index, :new, :create ]
  before_action :set_task, only: [ :destroy, :edit, :update ]

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
          :tasks,
          partial: "tasks/task",
          locals: { task: @task }
        )}
        format.html { redirect_to category_tasks_path, notice: "Task was successfully created!"}
      else
        format.html { render :new, status: :unprocessable_entity }
      end
    end
  end

  def edit

  end

  def update
    if @task.update(task_params)
      respond_to do |format|
        format.turbo_stream do
          render turbo_stream: turbo_stream.update( @task,
          partial: "tasks/task",
          locals: { task: @task, category: @category })
        end
        format.html { redirect_to category_tasks_path(@category), notice: 'Task was successfull updated.' }
      end
    else
      render :edit, status: :unprocessable_entity
    end
  end

  def destroy
    @task.destroy

    respond_to do |format|
      format.turbo_stream
      format.html { redirect_to category_tasks_path, notice: "Task was successfully deleted" }
    end
  end

  private

  def set_task
    find_category
    @task = @category.tasks.find(params[:id])
  end

  def find_category
    @category = current_user.categories.find(params[:category_id])
  end

  def task_params
    params.require(:task).permit(:title, :description, :finish_by, :complete)
  end

end
