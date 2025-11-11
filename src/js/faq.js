import Accordion from 'accordion-js';
import '/css/faq.css';
function initFaqAccordion() {
  const accordionContainer = document.querySelector('.accordion-container');

  if (!accordionContainer) {
    return;
  }

  try {
    new Accordion('.accordion-container', {
      duration: 400,
      showMultiple: false,
      collapse: true,
      onOpen: currentElement => {},
      onClose: currentElement => {},
    });
  } catch (error) {}
}
document.addEventListener('DOMContentLoaded', initFaqAccordion);
