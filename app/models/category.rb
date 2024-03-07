class Category < ApplicationRecord
  belongs_to :user
  has_many :tasks

  validates :name, presence: true

  broadcasts_to ->(category) { :cat_list }
  after_create_commit -> {
    broadcast_prepend_to :cat_list,
    partial: "categories/category",
    locals: { category: self}, target: "cat_list" }
end
