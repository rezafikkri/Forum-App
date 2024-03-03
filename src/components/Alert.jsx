import PropTypes from 'prop-types';

function Alert({ message, onClose }) {
  const replacedMessage = message.replace(/"/g, '');

  // capitalize first letter of the first word of the message
  const firstWord = replacedMessage.match(/[a-z]+/i)[0];
  const firstWordCapitalize = firstWord[0].toUpperCase() + firstWord.slice(1);  

  const firstWordIndex = replacedMessage.indexOf(firstWord) + firstWord.length;
  const newMessage = firstWordCapitalize + replacedMessage.slice(firstWordIndex);

  return (
    <div className="alert alert-danger alert-dismissible fade show" role="alert">
      {newMessage}
      <button
        type="button"
        className="btn-close"
        data-bs-dismiss="alert"
        aria-label="Close"
        onClick={onClose}
      ></button>
    </div>
  );
}

Alert.propTypes = {
  message: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Alert;
