// src/views/index.js
import home from './home.js';
import about from './about.js';
import projects from './projects.js';
import contact from './contact.js';
import notFound from './404.js';

export const views = {
	'/': home,
	'/about': about,
	'/projects': projects,
	'/contact': contact,
	404: notFound,
};
