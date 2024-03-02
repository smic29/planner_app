class Task < ApplicationRecord
  belongs_to :user
  belongs_to :category

  validates :title, presence: true

  # broadcasts_to ->(task) { :task_list }
  # Maybe look into this in the future.
end
