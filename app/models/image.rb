class Image < ActiveRecord::Base
  validates :image_url, :imageable_type, :imageable_id, presence: true
  belongs_to :imageable, polymorphic: true
end
