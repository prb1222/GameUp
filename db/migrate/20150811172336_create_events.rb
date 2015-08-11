class CreateEvents < ActiveRecord::Migration
  def change
    create_table :events do |t|
      t.integer :group_id, null: false
      t.string :title, null: false
      t.string :description, null: false
      t.datetime :date, null: false
      t.string :location, null: false
      t.timestamps null: false
    end

    add_index :events, :group_id
    add_index :groups, :owner_id
  end
end
