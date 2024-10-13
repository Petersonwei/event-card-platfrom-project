// /**
//  * Renders a list of events into the specified container.
//  * @param {Array} events - The list of event data to render.
//  * @param {HTMLElement} container - The DOM element where the events should be rendered.
//  */
// export function renderEvents(events, container) {
//     container.innerHTML = ''; // Clear previous content

//     if (events.length === 0) {
//         container.innerHTML = '<p>No events happening this week.</p>';
//         return;
//     }

//     events.forEach(event => {
//         const eventElement = document.createElement('div');
//         eventElement.classList.add('event-item');
//         eventElement.innerHTML = `
//             <h2>${event.subject || 'Untitled Event'}</h2>
//             <p><strong>Location:</strong> ${event.location || 'TBA'}</p>
//             <p><strong>Date:</strong> ${event.formatteddatetime || 'N/A'}</p>
//             <p><strong>Type:</strong> ${event.event_type || 'N/A'}</p>
//         `;
//         container.appendChild(eventElement);
//     });
// }

/**
 * Renders a list of events into the specified container for a given page.
 * @param {Array} events - The list of event data to render.
 * @param {HTMLElement} container - The DOM element where the events should be rendered.
 * @param {number} page - The current page number.
 * @param {number} itemsPerPage - The number of items to display per page.
 */
export function renderEvents(events, container, page = 1, itemsPerPage = 5) {
    container.innerHTML = ''; // Clear previous content

    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const eventsToShow = events.slice(startIndex, endIndex); // Get the events for the current page

    if (eventsToShow.length === 0) {
        container.innerHTML = '<p>No events happening this week.</p>';
        return;
    }

    eventsToShow.forEach(event => {
        const eventElement = document.createElement('div');
        eventElement.classList.add('event-item');
        eventElement.innerHTML = `
            <h2>${event.subject || 'Untitled Event'}</h2>
            <p><strong>Location:</strong> ${event.location || 'TBA'}</p>
            <p><strong>Date:</strong> ${event.formatteddatetime || 'N/A'}</p>
            <p><strong>Type:</strong> ${event.event_type || 'N/A'}</p>
        `;
        container.appendChild(eventElement);
    });
}

