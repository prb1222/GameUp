class EventAttendee < ActiveRecord::Base
  validates :user_id, :event_id, presence: true
  belongs_to :event, primary_key: :id, foreign_key: :event_id, class_name: :Event
  belongs_to :user, primary_key: :id, foreign_key: :user_id, class_name: :User
  validate :ensure_member

  def ensure_member
    unless user.groups.include?(event.group)
      errors["base"] << "Must be a member"
    end
  end
end
