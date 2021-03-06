class GroupMembership < ActiveRecord::Base
  validates :group_id, :user_id, presence: true
  validates :group, uniqueness: { scope: :user }
  belongs_to :user, primary_key: :id, foreign_key: :user_id, class_name: :User
  belongs_to :group, primary_key: :id, foreign_key: :group_id, class_name: :Group
end
