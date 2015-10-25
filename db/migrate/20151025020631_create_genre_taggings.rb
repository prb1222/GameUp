class CreateGenreTaggings < ActiveRecord::Migration
  def change
    create_table :genre_taggings do |t|
      t.integer :genre_id, null: false
      t.references :taggable, polymorphic: true, index: true, null: false
      t.timestamps null: false
    end

    add_index :genre_taggings, :genre_id
  end
end
