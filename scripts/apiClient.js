// apiClient.js
const API_BASE_URL = 'https://data.brisbane.qld.gov.au/api/explore/v2.1/catalog/datasets/';

/**
 * Fetch records from the Opendatasoft API, handling pagination for more than 100 results.
 *
 * @param {string} datasetId - The dataset ID.
 * @param {Object} queryParams - Optional query params: limit, offset, etc.
 * @returns {Promise<Array>} - Returns all records as an array.
 */
export async function fetchRecordsInBatches(datasetId, queryParams = {}) {
    let allRecords = [];
    let limit = queryParams.limit || 100;
    let offset = queryParams.offset || 0;
    let hasMoreRecords = true;

    // Fetch while there are more records
    while (hasMoreRecords) {
        const apiUrl = constructApiUrl(datasetId, { ...queryParams, limit, offset });
        try {
            const response = await fetch(apiUrl);
            const data = await response.json();

            if (data.results && data.results.length > 0) {
                allRecords = allRecords.concat(data.results);
                offset += limit;
            }

            // Stop if fewer than `limit` results are returned
            hasMoreRecords = data.results.length === limit;
        } catch (error) {
            console.error(`Error fetching records: ${error}`);
            break;
        }
    }

    return allRecords;
}

/**
 * Builds the API URL with query parameters.
 * 
 * @param {string} datasetId - The dataset ID.
 * @param {Object} queryParams - Optional query params (limit, offset, etc.).
 * @returns {string} - The constructed API URL.
 */
function constructApiUrl(datasetId, queryParams = {}) {
    let url = `${API_BASE_URL}${datasetId}/records?`;

    // Add query params to the URL
    const params = new URLSearchParams();
    for (const [key, value] of Object.entries(queryParams)) {
        if (value !== undefined && value !== null) {
            params.append(key, value);
        }
    }

    return url + params.toString();
}
