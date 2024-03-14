import { useRef } from 'react';
import QuillEditor from './QuillEditor';
// styles
import 'quill/dist/quill.snow.css';
import '../styles/quill.custom.css';

function CommentInput() {
  // Use a ref to access the quill instance directly
  const quillRef = useRef();

  return (
    <form className="text-end">
      <div className="mb-2 text-start">
        <QuillEditor ref={quillRef} />
      </div>
      <button type="submit" className="btn btn-primary algin-self-end">Send</button>
    </form>
  );
}

export default CommentInput;
