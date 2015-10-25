class GenreTagging < ActiveRecord::Base
  validates :genre_id, presence: true
  belongs_to :genre, primary_key: :id, foreign_key: :genre_id, class_name: :Genre
  belongs_to :taggable, polymorphic: true
end
