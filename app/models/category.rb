class Category < ApplicationRecord
  belongs_to :user

  validates :name, presence: true

  broadcasts_to ->(category) { :cat_list }

end
