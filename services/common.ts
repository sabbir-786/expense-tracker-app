export const getLast7Days = () => {
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const result = [];

    for (let i = 6; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        result.push({
            day: daysOfWeek[date.getDay()],
            date: date.toISOString().split("T")[0], // Format: YYYY-MM-DD
            income: 0,
            expense: 0,
        });
    }

    return result.reverse();
    // returns an array of all the previous 7 days
};


export const getLast12Months = () => {
    const monthsOfYear = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    const result = [];

    for (let i = 11; i >= 0; i--) {
        const date = new Date();
        date.setMonth(date.getMonth() - i);

        const monthName = monthsOfYear[date.getMonth()];
        const shortYear = date.getFullYear().toString().slice(-2); // e.g., '24'
        const formattedMonthYear = `${monthName} ${shortYear}`;     // e.g., 'Jan 24'
        const formattedDate = date.toISOString().split("T")[0];     // e.g., '2025-01-01'

        result.push({
            month: formattedMonthYear,
            fullDate: formattedDate,
            income: 0,
            expense: 0,
        });
    }

    return result.reverse();
};


export const getLast10Years = () => {
    const result = [];

    const currentYear = new Date().getFullYear();

    for (let i = 2; i >= 0; i--) {
        const year = currentYear - i;
        const shortYear = year.toString().slice(-2); // e.g., '24'

        // Use January 1st for a consistent date format
        const date = new Date(year, 0, 1);
        const formattedDate = date.toISOString().split("T")[0]; // e.g., '2025-01-01'

        result.push({
            year: year.toString(),    // e.g., '2025'
            shortYear,                // e.g., '25'
            fullDate: formattedDate,  // e.g., '2025-01-01'
            income: 0,
            expense: 0,
        });
    }

    return result.reverse();
};
