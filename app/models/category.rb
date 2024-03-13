class Category < ApplicationRecord
  belongs_to :user
  has_many :tasks, dependent: :destroy

  validates :name, presence: true

  broadcasts_to ->(category) { [category.user, "categories"] }, inserts_by: :append
  after_update_commit -> {
    broadcast_replace_later_to [ category.user, "categories"],
    partial: "categories/category",
    locals: { category: self, tasks: Task }, target: "categories" }

  def task_count
    tasks.where('finish_by = ?', Date.today.beginning_of_day).count
  end

end
