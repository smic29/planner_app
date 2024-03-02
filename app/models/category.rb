class Category < ApplicationRecord
  belongs_to :user
  has_many :tasks

  validates :name, presence: true

  broadcasts_to ->(category) { :cat_list }

end
