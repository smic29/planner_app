class HomeController < ApplicationController
  before_action :authenticate_user!, only: [ :dash ]

  def index

  end

  def dash
    @tasks = current_user.tasks
  end

end
