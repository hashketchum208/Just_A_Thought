const { Schema, model } = require('mongoose');

const thoughtSchema = new Schema(
  {
    thoughtText: { 
      type: String,
      required: true, 
    },
    createdAt: { 
      type: Date, 
      default: Date.now, 
      get: currentDate,
    },
    username: { 
      type: String, 
      required: true,
    },
    react: [{ 
      reactBody: { 
        type: String, 
        required: false, 
        maxLength: 280, 
        minLength: 1,
      },
      username: { 
        type: String, 
        required: false,
      },
      createdAt: { 
        type: Date, 
        default: Date.now, 
        get: currentDate, 
      },
    }],
  },
  {
    toJSON: {
      getters: true,
    },
    _id: true,
  }
);

function currentDate(createdAt) {
  return (createdAt = new Date().toLocaleDateString());
}

const Thought = model('thought', thoughtSchema);

module.exports = Thought;