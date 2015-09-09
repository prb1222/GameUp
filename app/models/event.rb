class Event < ActiveRecord::Base
  validates(:group_id,
            :title,
            :description,
            :date,
            :address,
            :city,
            presence: true)

  geocoded_by :location
  after_validation :geocode

  belongs_to :group
  belongs_to :organizer, primary_key: :id, foreign_key: :organizer_id, class_name: :User
  has_many :event_attendees, primary_key: :id, foreign_key: :event_id, class_name: :EventAttendee, dependent: :destroy
  has_many :attendees, through: :event_attendees, source: :user
  has_many :comments, dependent: :destroy
  has_many :commenting_users, through: :comments, source: :user
  has_many :images, as: :imageable, dependent: :destroy

  def location
    "#{address}, #{city}, #{state}"
  end

  def jumbo_info
    result = {}
    result[:group] = group.title
    result[:group_id] = group.id
    result[:event_id] = self.id
    result[:comments_length] = comments.length
    result[:date] = date
    result[:title] = title
    result
  end
end
