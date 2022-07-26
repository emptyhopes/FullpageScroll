class FullpageScroll extends null {
    static section = null;
    static controller = null;

    static AnimationDuration = 750;
    static LastAnimation = 0;

    static index = 0;
    static count = 4;

    static ScrollOptions = { behavior: "smooth" };

    static Run(event) {
        this.Callback(event);
    }

    static Clear() {
        this.index = 0;
    }

    static Callback(event) {
        event.preventDefault();

        const timestamp = new Date().getTime();
        const delta = event.wheelDelta;

        if (timestamp - this.LastAnimation < this.AnimationDuration) return;

        if (delta < 0) {
            if (this.index > this.count - 2) return;
            this.CheckCurrnetElements(this.section);
            if (this.controller !== null) this.CheckCurrnetElements(this.controller);
            this.index = this.index + 1;
            this.CheckElements(this.section, this.controller);
        }

        if (delta > 0) {
            if (this.index === 0) return;
            this.CheckCurrnetElements(this.section);
            if (this.controller !== null) this.CheckCurrnetElements(this.controller);
            this.index = this.index - 1;
            this.CheckElements(this.section, this.controller);
        }

        this.LastAnimation = timestamp;
    }

    static Scroll(SectionElement) {
        SectionElement.scrollIntoView(this.ScrollOptions);
    }

    static CheckCurrnetElements(element) {
        element.forEach((element, ElementIndex) => {
            if (this.index === ElementIndex) this.AddClass(element);
        });
    }

    static CheckElements(SectionElement, ControllerElement) {
        SectionElement.forEach((section, SectionIndex) => {
            if (this.index === SectionIndex) {
                this.Scroll(section);
                this.AddClass(section);

                if (ControllerElement !== null) this.CheckCurrnetElements(ControllerElement);
            }
        });
    }

    static AddClass(element) {
        element.classList.toggle("active");
    }
}

module.exports = { FullpageScroll };
