class CategoriesController < ApplicationController
  before_action :authenticate_user!
  before_action :set_category, only: [:show, :edit, :update, :destroy]

  def index
    @categories = current_user.categories
    @tasks = current_user.tasks.where('finish_by = ?', Date.today.beginning_of_day )
    @user = current_user
  end

  def show

  end

  def edit

  end

  def update
    if @category.update(category_params)
      respond_to do |format|
        format.html { redirect_to category_tasks_path(@category), notice: 'Category was successfully updated.' }
        format.turbo_stream { flash.now[:notice] = "Category Updated"
                              render turbo_stream: turbo_stream.update("toasts", partial: "shared/toast")
                            }
      end
    else
      render :edit, status: :unprocessable_entity
    end
  end

  def destroy
    @category.destroy

    respond_to do |format|
      format.turbo_stream { flash.now[:notice] = "Category deleted" }
      format.html { redirect_to user_categories_path, notice: "Category was successfully deleted."}
    end
    # redirect_to user_categories_path, notice: 'Category was successfully deleted.'
  end

  def new
    @category = current_user.categories.build
  end

  def create
    @category = current_user.categories.build(category_params)

    respond_to do |format|
      if @category.save
        format.turbo_stream { flash.now[:notice] = "Category was successfully created"
                              render :create, locals: { category: @category }
                            }
        format.html { redirect_to user_categories_path, notice: "Category was successfully created."}
      else
        format.html { render :new, status: :unprocessable_entity }
      end
    end
  end

  private

  def set_category
    @category = current_user.categories.find(params[:id])
  end

  def category_params
    params.require(:category).permit(:name, :description)
  end
end
