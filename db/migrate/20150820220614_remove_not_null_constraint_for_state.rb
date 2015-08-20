class RemoveNotNullConstraintForState < ActiveRecord::Migration
  def change
    change_column_null :groups, :state, true
    change_column_null :events, :state, true
  end
end
