class AddRankToImages < ActiveRecord::Migration
  def change
    add_column :groups, :profile_id, :integer
    add_column :groups, :jumbo_id, :integer
  end
end
