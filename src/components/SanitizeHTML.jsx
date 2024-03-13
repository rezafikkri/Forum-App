import DOMPurify from 'dompurify';

function SanitizeHTML({ html, className }) {
  const cleanUp = (dirty) => ({
    __html: DOMPurify.sanitize(dirty),
  });
 
  return <div className={className} dangerouslySetInnerHTML={cleanUp(html)}></div>;
}

export default SanitizeHTML;
