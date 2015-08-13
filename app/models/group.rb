class Group < ActiveRecord::Base
  validates(:owner_id,
            :title,
            :location,
            :description,
            :member_name,
            presence: true)

  belongs_to(:owner,
             primary_key: :id,
             foreign_key: :owner_id,
             class_name: :User)

  has_many :events, dependent: :destroy
  has_many :group_memberships, primary_key: :id, foreign_key: :group_id, class_name: :GroupMembership , dependent: :destroy
  has_many :members, through: :group_memberships, source: :user
end
