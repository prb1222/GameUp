class AddLocationToMultiple < ActiveRecord::Migration
  def change
    add_column :users, :location, :string
    change_column_null :users, :location, false

    add_column :groups, :state, :string
    change_column_null :groups, :state, false

    add_column :events, :address, :string
    change_column_null :events, :address, false
    add_column :events, :city, :string
    change_column_null :events, :city, false
    add_column :events, :state, :string
    change_column_null :events, :state, false

    change_column_null :groups, :city, false
  end
end
