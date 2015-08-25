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

  def self.default_user_url
    "https://res.cloudinary.com/dj7rafx1m/image/upload/v1440023472/placeholder_gyicx0.png"
  end

  def self.default_group_url
    "https://res.cloudinary.com/dj7rafx1m/image/upload/v1440006093/gqszmwaqb97woi5r7zvj.png"
  end

  def self.bowser_url
    "https://res.cloudinary.com/dj7rafx1m/image/upload/v1440024567/Bowser_-_New_Super_Mario_Bros_2_nppyzk.png"
  end
end
