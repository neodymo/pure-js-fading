const fadeInOut = (element, timing, limit = 1, callback) => {
    if(timing > 0) {
        if(element.checkVisibility({ checkVisibilityCSS: true })) return false;
        element.style.visibility = "visible";
        element.style.opacity = 0;
    } else {
        if(!element.checkVisibility({ checkVisibilityCSS: true })) return false;
        element.style.opacity = limit;
    }
    const steps = 25;
    let pos = steps;
    const processor = setInterval(() => {
        if(pos > 0) {
            element.style.opacity = parseFloat(element.style.opacity) + limit / steps * (timing / Math.abs(timing));
            pos--;
        } else {
            if(timing < 0) {
                element.style.opacity = 0;
                element.style.visibility = "hidden";
            } else {
                element.style.opacity = limit;
            }
            if(typeof callback === "function") callback();
            clearInterval(processor);
        }
    }, Math.abs(timing) / steps);
};
