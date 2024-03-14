import { hideLoading, showLoading } from "react-redux-loading-bar";
import api from "../../utils/api";

const ActionType = {
  RECEIVE_DETAIL_THREAD: 'RECEIVE_DETAIL_THREAD',
  CLEAR_DETAIL_THREAD: 'CLEAR_DETAIL_THREAD',
  UP_VOTE_DETAIL_THREAD: 'UP_VOTE_DETAIL_THREAD',
  DOWN_VOTE_DETAIL_THREAD: 'DOWN_VOTE_THREAD',
  NEUTRAL_VOTE_DETAIL_THREAD: 'NEUTRAL_VOTE_DETAIL_THREAD',
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

export {
  ActionType,
  receiveDetailThreadActionCreator,
  upVoteDetailThreadActionCreator,
  downVoteDetailThreadActionCreator,
  neutralVoteDetailThreadActionCreator,
  asyncReceiveDetailThread,
  asyncUpVoteDetailThread,
  asyncDownVoteDetailThread,
  asyncNeutralVoteDetailThread,
};
