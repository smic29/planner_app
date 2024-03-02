class CreateTasks < ActiveRecord::Migration[7.1]
  def change
    create_table :tasks do |t|
      t.references :user, null: false, foreign_key: true
      t.references :category, null: false, foreign_key: true
      t.string :title
      t.boolean :complete
      t.datetime :finish_by
      t.text :description

      t.timestamps
    end
  end
end
