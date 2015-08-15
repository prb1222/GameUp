class CreateComments < ActiveRecord::Migration
  def change
    create_table :comments do |t|
      t.string :user_id, null: false
      t.string :event_id, null: false
      t.string :body, null: false
      t.timestamps null: false
    end
  end
end
