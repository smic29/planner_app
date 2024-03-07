class AddDefaultAndNotNullConstraintsToTasks < ActiveRecord::Migration[7.1]
  def change
    change_column_default :tasks, :complete, from: nil, to: false
    change_column_null :tasks, :complete, false

    change_column_null :tasks, :finish_by, false
  end
end
