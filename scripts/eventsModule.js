import { fetchRecordsInBatches } from './apiClient.js';
import { renderEvents } from './eventRender.js';

/**
 * Returns the start and end dates of the current week (Monday to Sunday).
 */
function getWeekDateRange() {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1));
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);

    return { startOfWeek, endOfWeek };
}

/**
 * Formats a Date object to 'YYYY-MM-DD' for API queries.
 */
function formatDateToApi(date) {
    return date.toISOString().split('T')[0];
}

// document.addEventListener('DOMContentLoaded', async () => {
//     const eventContainer = document.getElementById('event-list'); // Ensure you have an element with this ID in the HTML
//     const datasetId = 'brisbane-city-council-events';
//     const { startOfWeek, endOfWeek } = getWeekDateRange();

//     const queryParams = {
//         limit: 100,
//         order_by: 'start_datetime',
//         where: `start_datetime >= date'${formatDateToApi(startOfWeek)}' AND end_datetime <= date'${formatDateToApi(endOfWeek)}'`
//     };

//     try {
//         const eventsThisWeek = await fetchRecordsInBatches(datasetId, queryParams);
//         console.log('Fetched events:', eventsThisWeek);

//         // Render events into the container
//         renderEvents(eventsThisWeek, eventContainer);
//     } catch (error) {
//         console.error('Error fetching events:', error);
//         eventContainer.innerHTML = '<p>Error fetching events.</p>';
//     }
// });


document.addEventListener('DOMContentLoaded', async () => {
    const eventContainer = document.getElementById('event-list');
    const datasetId = 'brisbane-city-council-events';
    const { startOfWeek, endOfWeek } = getWeekDateRange();

    const queryParams = {
        limit: 100, // You can adjust the limit here
        order_by: 'start_datetime',
        where: `start_datetime >= date'${formatDateToApi(startOfWeek)}' AND end_datetime <= date'${formatDateToApi(endOfWeek)}'`
    };

    try {
        const eventsThisWeek = await fetchRecordsInBatches(datasetId, queryParams);
        console.log('Fetched events:', eventsThisWeek);

        let currentPage = 1;
        const itemsPerPage = 5;
        const totalPages = Math.ceil(eventsThisWeek.length / itemsPerPage);

        // Initial render
        renderEvents(eventsThisWeek, eventContainer, currentPage, itemsPerPage);

        // Pagination controls
        const prevButton = document.getElementById('prev-page');
        const nextButton = document.getElementById('next-page');
        const pageInfo = document.getElementById('page-info');

        // Update page info display
        pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;

        prevButton.addEventListener('click', () => {
            if (currentPage > 1) {
                currentPage--;
                renderEvents(eventsThisWeek, eventContainer, currentPage, itemsPerPage);
                pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;
                togglePaginationButtons();
            }
        });

        nextButton.addEventListener('click', () => {
            if (currentPage < totalPages) {
                currentPage++;
                renderEvents(eventsThisWeek, eventContainer, currentPage, itemsPerPage);
                pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;
                togglePaginationButtons();
            }
        });

        function togglePaginationButtons() {
            prevButton.disabled = currentPage === 1;
            nextButton.disabled = currentPage === totalPages;
        }

        // Initial button state
        togglePaginationButtons();
    } catch (error) {
        console.error('Error fetching events:', error);
        eventContainer.innerHTML = '<p>Error fetching events.</p>';
    }
});

