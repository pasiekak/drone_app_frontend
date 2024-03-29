export const getScrollbarWidth = () => {
    // Creating invisible container
    const outer = document.createElement("div");
    outer.style.visibility = "hidden";
    outer.style.overflow = "scroll"; // forcing scrollbar to appear
    outer.style.msOverflowStyle = "scrollbar"; // needed for WinJS apps
    document.body.appendChild(outer);

    // Creating inner element and placing it in the container
    const inner = document.createElement("div");
    outer.appendChild(inner);

    // Calculating difference between container's full width and the child width
    const scrollbarWidth = outer.offsetWidth - inner.offsetWidth;

    // Removing temporary elements from the DOM
    outer.parentNode.removeChild(outer);

    return scrollbarWidth;
};

export const getModifiedObjectByPathAndName = (ob, path, name, value) => {
    const copyOb = JSON.parse(JSON.stringify(ob));
    if (!path) {
        copyOb[name] = value;
    } else {
        const properties = path.split(".");
        let tempOb = copyOb;
        for (let i = 0; i < properties.length; i++) {
            const prop = properties[i];
            tempOb = tempOb[prop];
            if (i === properties.length - 1) {
                tempOb[name] = value;
            }
        }
    }
    return copyOb;
};

export const formatDate = (stringDate) => {
    const date = new Date(stringDate)
    const year = date.toLocaleString('default', {year: 'numeric'});
    const month = date.toLocaleString('default', {
        month: '2-digit',
    });
    const day = date.toLocaleString('default', {day: '2-digit'});

    return [year, month, day].join('-');
}

export const isNumeric = (str) => {
    if (str === null || str === undefined || typeof str !== 'string') {
        return false;
    }

    return !isNaN(Number(str));
}