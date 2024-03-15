import { hideLoading, showLoading } from "react-redux-loading-bar";
import api from "../../utils/api";

const ActionType = {
  RECEIVE_DETAIL_THREAD: 'RECEIVE_DETAIL_THREAD',
  CLEAR_DETAIL_THREAD: 'CLEAR_DETAIL_THREAD',
  UP_VOTE_DETAIL_THREAD: 'UP_VOTE_DETAIL_THREAD',
  DOWN_VOTE_DETAIL_THREAD: 'DOWN_VOTE_THREAD',
  NEUTRAL_VOTE_DETAIL_THREAD: 'NEUTRAL_VOTE_DETAIL_THREAD',
  CREATE_COMMENT: 'CREATE_COMMENT',
  UP_VOTE_COMMENT: 'UP_VOTE_COMMENT',
  DOWN_VOTE_COMMENT: 'DOWN_VOTE_COMMENT',
  NEUTRAL_VOTE_COMMENT: 'NEUTRAL_VOTE_COMMENT',
};

function receiveDetailThreadActionCreator(detailThread) {
  return {
    type: ActionType.RECEIVE_DETAIL_THREAD,
    payload: {
      detailThread,
    },
  };
}

function upVoteDetailThreadActionCreator({ threadId, userId }) {
  return {
    type: ActionType.UP_VOTE_DETAIL_THREAD,
    payload: {
      threadId,
      userId,
    },
  };
}

function downVoteDetailThreadActionCreator({ threadId, userId }) {
  return {
    type: ActionType.DOWN_VOTE_DETAIL_THREAD,
    payload: {
      threadId,
      userId,
    },
  };
}

function neutralVoteDetailThreadActionCreator({ threadId, userId, target }) {
  return {
    type: ActionType.NEUTRAL_VOTE_DETAIL_THREAD,
    payload: {
      threadId,
      userId,
      target,
    },
  };
}

function clearDetailThreadActionCreator() {
  return {
    type: ActionType.CLEAR_DETAIL_THREAD,
  };
}

function createCommentActionCreator(comment) {
  return {
    type: ActionType.CREATE_COMMENT,
    payload: {
      comment,
    },
  };
}

function upVoteCommentActionCreator({ commentId, userId }) {
  return {
    type: ActionType.UP_VOTE_COMMENT,
    payload: {
      commentId,
      userId,
    },
  };
}

function downVoteCommentActionCreator({ commentId, userId }) {
  return {
    type: ActionType.DOWN_VOTE_COMMENT,
    payload: {
      commentId,
      userId,
    },
  };
}

function neutralVoteCommentActionCreator({ commentId, userId, target }) {
  return {
    type: ActionType.NEUTRAL_VOTE_COMMENT,
    payload: {
      commentId,
      userId,
      target,
    },
  };
}

function asyncReceiveDetailThread(threadId) {
  return async (dispatch) => {
    dispatch(showLoading());
    dispatch(clearDetailThreadActionCreator());

    try {
      const detailThread = await api.getDetailThread(threadId);
      dispatch(receiveDetailThreadActionCreator(detailThread));
    } catch (error) {
      return Promise.reject(error.message);
    }

    dispatch(hideLoading());
  };
}

function asyncUpVoteDetailThread({ threadId, isDownVoted }) {
  return async (dispatch, getState) => {
    dispatch(showLoading());

    const { authUser: { id } } = getState();
    dispatch(upVoteDetailThreadActionCreator({ threadId, userId: id }));
    // if signed in user, has downvoted, then neutral downvote
    dispatch(neutralVoteDetailThreadActionCreator({ threadId, userId: id, target: 'down-vote' }));

    try {
      await api.upVoteThread(threadId);
    } catch (error) {
      dispatch(neutralVoteDetailThreadActionCreator({ threadId, userId: id, target: 'up-vote' }));
      // if signed in user, has downvoted, then downvote again
      if (isDownVoted) {
        dispatch(downVoteDetailThreadActionCreator({ threadId, userId: id }));
      }
    }

    dispatch(hideLoading());
  };
}

function asyncDownVoteDetailThread({ threadId, isUpVoted }) {
  return async (dispatch, getState) => {
    dispatch(showLoading());

    const { authUser: { id } } = getState();
    dispatch(downVoteDetailThreadActionCreator({ threadId, userId: id }));
    // if signed in user, has upvoted, then neutral upvote
    dispatch(neutralVoteDetailThreadActionCreator({ threadId, userId: id, target: 'up-vote' }));

    try {
      await api.downVoteThread(threadId);
    } catch (error) {
      dispatch(neutralVoteDetailThreadActionCreator({ threadId, userId: id, target: 'down-vote' }));
      // if signed in user, has upvoted, then upvote again
      if (isUpVoted) {
        dispatch(upVoteDetailThreadActionCreator({ threadId, userId: id }));
      }
    }

    dispatch(hideLoading());
  };
}

function asyncNeutralVoteDetailThread({ threadId, target }) {
  return async (dispatch, getState) => {
    dispatch(showLoading());

    const { authUser: { id } } = getState();
    dispatch(neutralVoteDetailThreadActionCreator({ threadId, userId: id, target }));

    try {
      await api.neutralVoteThread(threadId);
    } catch (error) {
      // check button clicked, up vote or down vote
      if (target === 'up-vote') {
        dispatch(upVoteDetailThreadActionCreator({ threadId, userId: id }));
      } else {
        dispatch(downVoteDetailThreadActionCreator({ threadId, userId: id }));
      }
    }

    dispatch(hideLoading());
  };
}

function asyncCreateComment({ threadId, content }) {
  return async (dispatch) => {
    try {
      dispatch(showLoading());

      const comment = await api.createComment({ threadId, content });
      dispatch(createCommentActionCreator(comment));
      return comment;
    } catch (error) {
      return Promise.reject(error.message);
    } finally {
      dispatch(hideLoading());
    }
  };
}

function asyncUpVoteComment({ commentId, isDownVoted }) {
  return async (dispatch, getState) => {
    dispatch(showLoading());

    const {
      authUser: { id },
      detailThread: { id: threadId }
    } = getState();

    dispatch(upVoteCommentActionCreator({ commentId, userId: id }));
    // if signed in user, has downvoted, then neutral downvote
    dispatch(neutralVoteCommentActionCreator({ commentId, userId: id, target: 'down-vote' }));

    try {
      await api.upVoteComment({ threadId, commentId });
    } catch (error) {
      dispatch(neutralVoteCommentActionCreator({ commentId, userId: id, target: 'up-vote' }));
      // if signed in user, has downvoted, then downvote again
      if (isDownVoted) {
        dispatch(downVoteCommentActionCreator({ commentId, userId: id }));
      }
    }

    dispatch(hideLoading());
  };
}

function asyncDownVoteComment({ commentId, isUpVoted }) {
  return async (dispatch, getState) => {
    dispatch(showLoading());

    const {
      authUser: { id },
      detailThread: { id: threadId }
    } = getState();

    dispatch(downVoteCommentActionCreator({ commentId, userId: id }));
    // if signed in user, has upvoted, then neutral upvote
    dispatch(neutralVoteCommentActionCreator({ commentId, userId: id, target: 'up-vote' }));

    try {
      await api.downVoteComment({ threadId, commentId });
    } catch (error) {
      dispatch(neutralVoteCommentActionCreator({ commentId, userId: id, target: 'down-vote' }));
      // if signed in user, has upvoted, then upvote again
      if (isUpVoted) {
        dispatch(upVoteCommentActionCreator({ commentId, userId: id }));
      }
    }

    dispatch(hideLoading());
  };
}

function asyncNeutralVoteComment({ commentId, target }) {
  return async (dispatch, getState) => {
    dispatch(showLoading());

    const {
      authUser: { id },
      detailThread: { id: threadId }
    } = getState();

    dispatch(neutralVoteCommentActionCreator({ commentId, userId: id, target }));

    try {
      await api.neutralVoteComment({ threadId, commentId });
    } catch (error) {
      // check button clicked, up vote or down vote
      if (target === 'up-vote') {
        dispatch(upVoteCommentActionCreator({ commentId, userId: id }));
      } else {
        dispatch(downVoteCommentActionCreator({ commentId, userId: id }));
      }
    }

    dispatch(hideLoading());
  };
}

export {
  ActionType,
  receiveDetailThreadActionCreator,
  upVoteDetailThreadActionCreator,
  downVoteDetailThreadActionCreator,
  neutralVoteDetailThreadActionCreator,
  createCommentActionCreator,
  upVoteCommentActionCreator,
  downVoteCommentActionCreator,
  neutralVoteCommentActionCreator,
  asyncReceiveDetailThread,
  asyncUpVoteDetailThread,
  asyncDownVoteDetailThread,
  asyncNeutralVoteDetailThread,
  asyncCreateComment,
  asyncUpVoteComment,
  asyncDownVoteComment,
  asyncNeutralVoteComment,
};
