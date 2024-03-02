function Alert({ message, onClose }) {
  const strong = message.match(/[a-z]+/i)[0];
  const strongIndex = message.indexOf(strong) + strong.length + 2;
  const strongCapitalize = strong[0].toUpperCase() + strong.slice(1);

  const objMessage = {
    strong: strongCapitalize,
    other: message.slice(strongIndex),
  };

  return (
    <div className="alert alert-danger alert-dismissible fade show" role="alert">
      <strong>{objMessage.strong}</strong> {objMessage.other}
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

export default Alert;
