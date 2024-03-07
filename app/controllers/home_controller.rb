class HomeController < ApplicationController
  before_action :authenticate_user!, only: [ :dash ]

  def index

  end

  def dash
    @tasks = current_user.tasks.where('finish_by = ?', Date.today.beginning_of_day )
  end

end
