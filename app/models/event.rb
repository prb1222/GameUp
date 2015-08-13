class Event < ActiveRecord::Base
  validates(:group_id,
            :title,
            :description,
            :date,
            :location,
            presence: true)

  belongs_to :group
  belongs_to :organizer, primary_key: :id, foreign_key: :organizer_id, class_name: :User
  has_many :event_attendees, primary_key: :id, foreign_key: :event_id, class_name: :EventAttendee
  has_many :attendees, through: :event_attendees, source: :user
end
