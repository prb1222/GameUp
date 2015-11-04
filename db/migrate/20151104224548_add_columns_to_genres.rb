class AddColumnsToGenres < ActiveRecord::Migration
  def change
    add_column :genres, :color, :string
    add_column :genres, :fa_icon, :string
    change_column_null :genres, :color, false
    change_column_null :genres, :fa_icon, false
  end
end
