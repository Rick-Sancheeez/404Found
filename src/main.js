import './css/styles.css';
import Accordion from 'accordion-js';

window.Accordion = Accordion;
import { initFaqAccordion } from './js/faq.js';
document.addEventListener('DOMContentLoaded', () => {
  initFaqAccordion();
});
