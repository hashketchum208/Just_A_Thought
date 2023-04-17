const { Schema, Types } = require('mongoose');

const commentSchema = new Schema(
  {
    commentId: {
      type: Schema.Types.ObjectId, 
      default: () => new Types.ObjectId(),
    },
    commentBody: { 
      type: String, 
      required: true, 
      maxLength: 280, 
      minLength: 1,
    },
    username: { 
      type: String, 
      required: true,
    },
    createdAt: { 
      type: Date, 
      default: Date.now, 
      get: currentDate, 
    },
  },
  {
    toJSON: {
      getters: true,
    },
    _id: false,
  }
);

function currentDate(createdAt) {
  return (createdAt = new Date().toLocaleDateString());
}


module.exports = commentSchema;