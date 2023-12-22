// HtmlContent.js
import React from 'react';
import DOMPurify from 'dompurify';

function HtmlContent({ html }) {
  const sanitizedHtml = DOMPurify.sanitize(html);
  const style = {
    width: '100%',
  };

  const setWidthForImages = (content) => {
    const modifiedContent = content.replace(
      /<img/g,
      '<img style="width: 60%; display: block; margin: auto;"',
    );
    return { __html: modifiedContent };
  };

  const modifiedHtml = setWidthForImages(sanitizedHtml);

  return <div dangerouslySetInnerHTML={modifiedHtml} style={style} />;
}

export default HtmlContent;
