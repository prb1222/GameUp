class AddLocationDataToModels < ActiveRecord::Migration
  def change
    remove_column :groups, :location
    remove_column :events, :location
    remove_column :users, :location

    add_column :groups, :city, :string
    change_column_null :groups, :city, :string
  end
end
