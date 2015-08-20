class Group < ActiveRecord::Base
  validates(:owner_id,
            :title,
            :city,
            :description,
            :member_name,
            presence: true)

  geocoded_by :location
  after_validation :geocode

  belongs_to(:owner,
             primary_key: :id,
             foreign_key: :owner_id,
             class_name: :User)

  belongs_to(:profile_pic,
              primary_key: :id,
              foreign_key: :profile_id,
              class_name: :Image)

  belongs_to(:jumbo_pic,
              primary_key: :id,
              foreign_key: :jumbo_id,
              class_name: :Image)

  has_many :events, dependent: :destroy
  has_many :group_memberships, primary_key: :id, foreign_key: :group_id, class_name: :GroupMembership , dependent: :destroy
  has_many :members, through: :group_memberships, source: :user
  has_many :images, as: :imageable, dependent: :destroy

  def location
    "#{city}, #{state}"
  end
end
