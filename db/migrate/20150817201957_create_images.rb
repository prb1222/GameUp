class CreateImages < ActiveRecord::Migration
  def change
    create_table :images do |t|
      t.string :image_url, null: false
      t.references :imageable, polymorphic: true, index: true, null: false
      t.timestamps null: false
    end
  end
end
