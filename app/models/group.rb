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
             
  has_many :events
end
