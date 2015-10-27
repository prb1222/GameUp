class Genre < ActiveRecord::Base
  validates :name, presence: true, uniqueness: true
  has_many :genre_taggings, primary_key: :id, foreign_key: :genre_id, class_name: :GenreTagging
  has_many :tagged_objects, through: :genre_taggings, source: :taggable
end
