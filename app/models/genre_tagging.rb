class GenreTagging < ActiveRecord::Base
  validates :genre_id, :taggable_type, :taggable_id, presence: true
  validates :genre_id, uniqueness: {scope: [:taggable_id, :taggable_type]}
  belongs_to :genre, primary_key: :id, foreign_key: :genre_id, class_name: :Genre
  belongs_to :taggable, polymorphic: true
end
