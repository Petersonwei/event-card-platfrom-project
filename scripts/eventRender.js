/**
 * Renders a list of events into the specified container.
 * @param {Array} events - The list of event data to render.
 * @param {HTMLElement} container - The DOM element where the events should be rendered.
 */
export function renderEvents(events, container) {
    container.innerHTML = ''; // Clear previous content

    if (events.length === 0) {
        container.innerHTML = '<p>No events happening this week.</p>';
        return;
    }

    events.forEach(event => {
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
