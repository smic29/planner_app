class Category < ApplicationRecord
  belongs_to :user
  has_many :tasks, dependent: :destroy

  validates :name, presence: true

  broadcasts_to ->(category) { "categories" }, inserts_by: :append
  # after_create_commit -> {
  #   broadcast_append_to :cat_list,
  #   partial: "categories/category",
  #   locals: { category: self}, target: "cat_list" }
end
