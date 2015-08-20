class AddLongitudeAndLatitude < ActiveRecord::Migration
  def change
    add_column :users, :longitude, :float
    add_column :users, :latitude, :float
    change_column_null :users, :longitude, false
    change_column_null :users, :latitude, false

    add_column :groups, :longitude, :float
    add_column :groups, :latitude, :float
    change_column_null :groups, :longitude, false
    change_column_null :groups, :latitude, false

    add_column :events, :longitude, :float
    add_column :events, :latitude, :float
    change_column_null :events, :longitude, false
    change_column_null :events, :latitude, false
  end
end
