class CreateGroups < ActiveRecord::Migration
  def change
    create_table :groups do |t|
      t.integer :owner_id, null: false
      t.string :title, null: false
      t.string :location, null: false
      t.string :description, null: false
      t.string :member_name, null: false
      t.timestamps null: false
    end
  end
end
