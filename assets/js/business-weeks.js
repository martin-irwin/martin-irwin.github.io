function getISOWeek(date) {
    const tempDate = new Date(date);
    tempDate.setDate(tempDate.getDate() + 3 - (tempDate.getDay() || 7));
    const firstThursday = new Date(tempDate.getFullYear(), 0, 4);
    firstThursday.setDate(firstThursday.getDate() + 3 - (firstThursday.getDay() || 7));
    return Math.round(((tempDate - firstThursday) / 86400000 + 1) / 7);
}

function getBusinessDays(start, end) {
    let count = 0;
    let current = new Date(start);
    while (current <= end) {
        if (current.getDay() !== 0 && current.getDay() !== 6) count++;
        current.setDate(current.getDate() + 1);
    }
    return count;
}

function updateBusinessInfo() {
    const today = new Date();
    const weekNumber = getISOWeek(today);

    const quarters = [
        { name: "Q1", start: new Date(2025, 0, 1), end: new Date(2025, 2, 31) },
        { name: "Q2", start: new Date(2025, 3, 1), end: new Date(2025, 5, 30) },
        { name: "Q3", start: new Date(2025, 6, 1), end: new Date(2025, 8, 30) },
        { name: "Q4", start: new Date(2025, 9, 1), end: new Date(2025, 11, 31) }
    ];

    let currentQuarter = quarters.find(q => today >= q.start && today <= q.end);
    const businessDaysRemaining = getBusinessDays(today, currentQuarter.end);

    const quarterProgress = ((getBusinessDays(currentQuarter.start, today) / getBusinessDays(currentQuarter.start, currentQuarter.end)) * 100).toFixed(2);
    const yearProgress = ((getBusinessDays(new Date(2025, 0, 1), today) / getBusinessDays(new Date(2025, 0, 1), new Date(2025, 11, 31))) * 100).toFixed(2);
    const yearRemaining = (100 - yearProgress).toFixed(2);

    document.getElementById("week-number").innerHTML = `<b>${weekNumber}</b>`;
    document.getElementById("quarter-end").innerHTML = `<b>${currentQuarter.end.toDateString()}</b>`;
    document.getElementById("business-days-left").innerHTML = `<b>${businessDaysRemaining}</b>`;
    document.getElementById("quarter-list").innerHTML = quarters.map(q => `<li><b>${q.name}</b>: ${q.start.toDateString()} - ${q.end.toDateString()}</li>`).join('');
    document.getElementById("quarter-progress").innerHTML = `<b>${quarterProgress}%</b>`;
    document.getElementById("year-remaining").innerHTML = `<b>${yearRemaining}%</b>`;

    // Update the progress bar
    const progressBar = document.getElementById("year-progress-bar");
    progressBar.style.width = `${yearProgress}%`;
    progressBar.textContent = `${yearProgress}%`;
}

document.addEventListener("DOMContentLoaded", updateBusinessInfo);
