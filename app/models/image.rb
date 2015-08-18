class Image < ActiveRecord::Base
  validates :image_url, :imageable_type, :imageable_id, presence: true
  belongs_to :imageable, polymorphic: true
  
  has_many(:group_profile,
              primary_key: :id,
              foreign_key: :profile_id,
              class_name: :Group)

  has_many(:group_jumbo,
              primary_key: :id,
              foreign_key: :jumbo_id,
              class_name: :Group)
end
