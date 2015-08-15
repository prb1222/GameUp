class Comment < ActiveRecord::Base
  validates :event_id, :user_id, :body, presence: true
  belongs_to :event
  belongs_to :user
end
