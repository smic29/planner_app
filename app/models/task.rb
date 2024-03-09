class Task < ApplicationRecord
  belongs_to :user
  belongs_to :category

  validates :title, presence: true
  validate :finish_by_in_future

  broadcasts_to ->(task) { "tasks" }, inserts_by: :append
  after_create_commit -> {
    broadcast_replace_to "categories",
    target: self.category,
    partial: "categories/category",
    locals: { category: self.category }
  }
  after_destroy_commit -> {
    broadcast_replace_to "categories",
    target: self.category,
    partial: "categories/category",
    locals: { category: self.category }
  }
  after_update_commit -> {
    broadcast_replace_to "categories",
    target: self.category,
    partial: "categories/category",
    locals: { category: self.category }
  }

  def finish_by_in_future
    return if finish_by.blank? || finish_by >= Date.today
    errors.add(:finish_by, "must be today or in the future")
  end

  # Maybe look into this in the future.
end
