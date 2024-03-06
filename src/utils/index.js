function stripHtml(htmlString) {
   let tmp = document.createElement("DIV");
   tmp.innerHTML = htmlString;
   return tmp.textContent || tmp.innerText || "";
}

export { stripHtml };
