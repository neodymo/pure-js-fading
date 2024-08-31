const fadeInOut = (element, duration, limit = 1, callback) => {
    if(parseFloat(element.style.opacity) > 0 && parseFloat(element.style.opacity) < limit) return false;
    if(duration > 0) {
        if(element.checkVisibility({ checkVisibilityCSS: true })) return false;
        element.style.visibility = "visible";
        element.style.opacity = 0;
    } else {
        if(!element.checkVisibility({ checkVisibilityCSS: true })) return false;
        element.style.opacity = limit;
    }
    var start;
    const processor = (timestamp) => {
        if(!start) start = timestamp;
        const progress = (timestamp - start) / duration;
        if(progress * (duration / Math.abs(duration)) < 1) {
            element.style.opacity = parseFloat(element.style.opacity) + progress * limit;
            requestAnimationFrame(processor);
        } else {
            if(duration < 0) {
                element.style.opacity = 0;
                element.style.visibility = "hidden";
            } else {
                element.style.opacity = limit;
            }
            if(typeof callback === "function") callback();
        }
    };
    requestAnimationFrame(processor);
};
