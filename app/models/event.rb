class Event < ActiveRecord::Base
  validates(:group_id,
            :title,
            :description,
            :date,
            :location,
            presence: true)

  belongs_to :group
  belongs_to :organizer, primary_key: :id, foreign_key: :organizer_id, class_name: :User
end
