const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
var monthState = 0;
var isSecondDropdownSelected = false;
var isFirstDropdownSelected = false;
var startMonth = null;
var endMonth = null;

class MonthYearPicker {
    constructor(input) {
        this.input = input;
        this.input.className = 'month-picker-input'
        this.startPickerDropdown = this.createPickerDropdown('picker-dropdown-1');
        this.endPickerDropdown = this.createPickerDropdown('picker-dropdown-2');
        this.parentPicker = this.createParentPicker();
        this.setupEventListeners();
        this.input.insertAdjacentElement('afterend', this.parentPicker);
    }

    createParentPicker() {
        const parentPicker = document.createElement("div");
        parentPicker.className = "picker";
        parentPicker.appendChild(this.startPickerDropdown);
        parentPicker.appendChild(this.endPickerDropdown);
        return parentPicker;
    }
    
    createApplyButton(applyButtonClassName) {
        const btnDiv = document.createElement("div");
        btnDiv.className = 'apply-btn-div'
        const applyBtn = document.createElement("button");
        applyBtn.className = applyButtonClassName;
        applyBtn.innerText = "Apply";
        applyBtn.addEventListener('click', () => {
            this.hideDropdowns();
        });
        btnDiv.appendChild(applyBtn);
        const clearBtn = document.createElement("button");
        clearBtn.className = 'clear-btn';
        clearBtn.innerText = "Clear";
        clearBtn.addEventListener('click', () => {
            this.input.value = '';
        });
        btnDiv.appendChild(clearBtn);
        return btnDiv;
    }

    createPickerDropdown(pickerClassName) {
        const pickerDropdown = document.createElement("div");
        pickerDropdown.className = pickerClassName;
        const pickerYear = document.createElement("div");
        pickerYear.className = "picker-year";
        const prevYearBtn = document.createElement("button");
        prevYearBtn.className = "prevYear";
        prevYearBtn.innerHTML = "<i class='fa fa-angle-double-left' style='font-size:20px;opacity:0.5'></i>";
        const selectedYear = document.createElement("span");
        selectedYear.className = "selectedYear";
        selectedYear.innerText = pickerClassName === 'picker-dropdown-1' ? new Date().getFullYear() : new Date().getFullYear() + 1;

        const nextYearBtn = document.createElement("button");
        nextYearBtn.className = "nextYear";
        nextYearBtn.innerHTML = "<i class='fa fa-angle-double-right' style='font-size:20px;opacity:0.5'></i>";

        /*if(pickerClassName =='picker-dropdown-1'){
            pickerYear.appendChild(prevYearBtn);
            pickerYear.appendChild(selectedYear);
        }
        else{
            pickerYear.appendChild(selectedYear);
            pickerYear.appendChild(nextYearBtn);
        }*/
        //modefied version of upper code
        (pickerClassName === 'picker-dropdown-1' ? [prevYearBtn, selectedYear] : [selectedYear, nextYearBtn]).forEach((element) => {
            pickerYear.appendChild(element);
        });
        const pickerMonths = document.createElement("div");
        pickerMonths.className = "picker-months";
        monthNames.forEach((monthName) => {
            const monthBtn = document.createElement("button");
            monthBtn.className = "month";
            monthBtn.innerText = monthName;
            pickerMonths.appendChild(monthBtn);
        });
        pickerDropdown.appendChild(pickerYear);
        pickerDropdown.appendChild(pickerMonths);
        return pickerDropdown;
    }

    setupEventListeners() {
        this.input.addEventListener("focus", () => {
            this.startPickerDropdown.style.display = 'block';
            this.endPickerDropdown.style.display = 'block';
            const startMonths = this.startPickerDropdown.querySelectorAll(".month");
            const endMonths = this.endPickerDropdown.querySelectorAll(".month");
            this.endPickerDropdown.querySelectorAll('.month').forEach(function (button) {
                button.classList.remove('disabled');
                button.disabled = false;
            });
            this.startPickerDropdown.querySelectorAll('.month').forEach(function (button) {
                button.classList.remove('disabled');
                button.disabled = false;
            });
        });

        this.outSideClickEffect();

        const startMonths = this.startPickerDropdown.querySelectorAll(".month");
        const endMonths = this.endPickerDropdown.querySelectorAll(".month");

        startMonths.forEach((month) => {
            month.addEventListener("click", () => {
                if (monthState == 0) {
                    this.selectMonth(this.startPickerDropdown, month.innerText, monthState);
                    monthState = monthState + 1;
                }
                else {
                    this.selectMonth(this.startPickerDropdown, month.innerText, monthState);
                    monthState = monthState - 1;
                }
            });
        });

        endMonths.forEach((month) => {
            month.addEventListener("click", () => {
                this.selectMonth(this.endPickerDropdown, month.innerText);
            });
        });

        const startPrevYearBtn = this.startPickerDropdown.querySelector(".prevYear");
        var disabledMonths = [];
        var disableYear = null;

        function enableButtons(pickerDropdown) {
            pickerDropdown.querySelectorAll('.month').forEach((button) => {
                button.disabled = false;
                button.classList.remove('disabled');
                button.classList.remove('selected')
            });
        }

        function updateDisabledMonths() {
            disabledMonths = []; // Clear the array before populating it
            for (var i = 0; i < this.input.getAttribute('start-month') - 1; i++) {
                if (!disabledMonths.includes(monthNames[i])) {
                    disabledMonths.push(monthNames[i]);
                }
            }
        }

        startPrevYearBtn.addEventListener("click", () => {
            enableButtons(this.startPickerDropdown);
            enableButtons(this.endPickerDropdown)
            updateDisabledMonths.call(this);
            this.clearHoverEffect();
            disableYear = this.input.getAttribute('start-year');
            var selectedMonth = monthNames[disabledMonths.length];
            const currentYear = parseInt(this.startPickerDropdown.querySelector(".selectedYear").innerText);
            const currentYearOfSecond = parseInt(this.endPickerDropdown.querySelector(".selectedYear").innerText);
            this.startPickerDropdown.querySelector(".selectedYear").innerText = currentYear - 1;
            this.endPickerDropdown.querySelector(".selectedYear").innerText = currentYear;
            if (disableYear == currentYear - 1) {
                const monthButtons = this.startPickerDropdown.querySelectorAll('.month');
                monthButtons.forEach((button) => {
                    if (disabledMonths.includes(button.innerText)) {
                        button.disabled = true;
                        button.classList.add('disabled');
                    }
                    if (button.innerText == selectedMonth) {
                        button.classList.add('selected');
                    }
                });
            }

            if (disableYear == currentYearOfSecond - 1) {
                const monthButtons = this.endPickerDropdown.querySelectorAll('.month');
                monthButtons.forEach((button) => {
                    if (disabledMonths.includes(button.innerText)) {
                        button.disabled = true;
                        button.classList.add('disabled');
                    }
                    if (button.innerText == selectedMonth) {
                        button.classList.add('selected');
                    }
                });
                this.startPickerDropdown.querySelectorAll('.month').forEach((button) => {
                    button.disabled = true;
                    button.classList.add('disabled');
                });
            }
            if (disableYear > currentYear - 1) {
                this.startPickerDropdown.querySelectorAll('.month').forEach((button) => {
                    button.disabled = true;
                    button.classList.add('disabled');
                });
            }

            if (disableYear > currentYearOfSecond - 1) {
                const monthButtons = this.endPickerDropdown.querySelectorAll('.month');
                monthButtons.forEach((button) => {
                    button.disabled = true;
                    button.classList.add('disabled');
                });
            }

        });

        const endNextYearBtn = this.endPickerDropdown.querySelector(".nextYear");
        endNextYearBtn.addEventListener("click", () => {
            const currentYear = parseInt(this.endPickerDropdown.querySelector(".selectedYear").innerText);
            const currentYearOfFirst = parseInt(this.startPickerDropdown.querySelector(".selectedYear").innerText);
            this.endPickerDropdown.querySelector(".selectedYear").innerText = currentYear + 1;
            this.startPickerDropdown.querySelector(".selectedYear").innerHTML = currentYear;
            enableButtons(this.startPickerDropdown);
            enableButtons(this.endPickerDropdown);
            updateDisabledMonths.call(this);
            this.clearHoverEffect();
            disableYear = this.input.getAttribute('start-year');
            var selectedMonth = monthNames[disabledMonths.length];
            if (disableYear == currentYear + 1) {
                const monthButtons = this.endPickerDropdown.querySelectorAll('.month');
                monthButtons.forEach((button) => {
                    if (disabledMonths.includes(button.innerText)) {
                        button.disabled = true;
                        button.classList.add('disabled');
                    }
                    if (button.innerText == selectedMonth) {
                        button.classList.add('selected');
                    }
                });
            }
            if (disableYear == currentYearOfFirst + 1) {
                const monthButtons = this.startPickerDropdown.querySelectorAll('.month');
                monthButtons.forEach((button) => {
                    if (disabledMonths.includes(button.innerText)) {
                        button.disabled = true;
                        button.classList.add('disabled');
                    }
                    if (button.innerText == selectedMonth) {
                        button.classList.add('selected');
                    }
                });
            }
            if (disableYear > currentYear + 1) {
                const monthButtons = this.endPickerDropdown.querySelectorAll('.month');
                monthButtons.forEach((button) => {
                    button.disabled = true;
                    button.classList.add('disabled');
                });
            }
            if (disableYear > currentYearOfFirst + 1) {
                const monthButtons = this.startPickerDropdown.querySelectorAll('.month');
                monthButtons.forEach((button) => {
                    button.disabled = true;
                    button.classList.add('disabled');
                });
            }


        });
    }
    toggleDropdowns() {
        this.startPickerDropdown.style.display = this.startPickerDropdown.style.display === "none" ? "block" : "none";
        this.endPickerDropdown.style.display = this.endPickerDropdown.style.display === "none" ? "block" : "none";
    }
    hideDropdowns() {
        this.startPickerDropdown.style.display = "none";
        this.endPickerDropdown.style.display = "none";
    }
    selectMonth(pickerDropdown, month) {

        var year = pickerDropdown.querySelector(".selectedYear").innerText;
        if (startMonth !== null && endMonth !== null) {
            startMonth = monthNames.indexOf(month) + 1;
            endMonth = null;
            this.input.value = startMonth + '/' + year;
            this.input.setAttribute('start-month', startMonth)
            this.input.setAttribute('start-year', year)
            var monthButtons = pickerDropdown.querySelectorAll('.month');
            monthButtons.forEach(function (button, index) {
                button.classList.toggle('disabled', index < startMonth - 1);
                button.disabled = index < startMonth - 1;
                button.classList.remove('selected');
                if (button.innerHTML === monthNames[startMonth - 1]) {
                    button.classList.add('selected');
                }
            });
        } else if (startMonth === null && endMonth !== null && pickerDropdown.className == 'picker-dropdown-1') {
            startMonth = monthNames.indexOf(month) + 1;
            this.input.value = startMonth + '/' + year;
            this.input.setAttribute('start-month', startMonth)
            this.input.setAttribute('start-year', year)
            var monthButtons = pickerDropdown.querySelectorAll('.month');
            monthButtons.forEach(function (button, index) {
                button.classList.toggle('disabled', index < startMonth - 1);
                button.disabled = index < startMonth - 1;
                button.classList.remove('selected');
                if (button.innerHTML === monthNames[startMonth - 1]) {
                    button.classList.add('selected');
                }
            });
        } else if (endMonth === null && startMonth !== null && pickerDropdown.className === 'picker-dropdown-2') {
            var selectedMonthsCount = this.startPickerDropdown.querySelectorAll('.month.selected').length;
            endMonth = monthNames.indexOf(month) + 1;
            // this.startPickerDropdown.querySelector('.prevYear').disabled = false;
            this.input.value = this.input.value + '-' + endMonth + '/' + year;
            this.input.setAttribute('end-month', endMonth)
            this.input.setAttribute('end-year', year)
            var monthButtons = pickerDropdown.querySelectorAll('.month');

            if (selectedMonthsCount == 0) {
                monthButtons.forEach(function (button) {
                    if (button.innerHTML === monthNames[endMonth - 1]) {
                        button.classList.add('selected');
                    }
                });
            }
            else {
                monthButtons.forEach(function (button) {
                    button.classList.remove('selected');
                });
                monthButtons.forEach(function (button) {
                    if (button.innerHTML === monthNames[endMonth - 1]) {
                        button.classList.add('selected');
                    }
                });
            }


            this.endPickerDropdown.style.display = 'none';
            this.startPickerDropdown.style.display = 'none';
            startMonth = null;
            endMonth = null;
        } else if (endMonth === null && startMonth !== null && pickerDropdown.className === 'picker-dropdown-1') {
            var selectedMonthsCount = this.endPickerDropdown.querySelectorAll('.month.selected').length;
            if (selectedMonthsCount == 1) {
                this.startPickerDropdown.querySelectorAll('.month.selected').forEach(function (button) {
                    button.classList.remove('selected');
                    button.classList.remove('disabled');
                });
            }

            endMonth = monthNames.indexOf(month) + 1;
            // this.startPickerDropdown.querySelector('.prevYear').disabled = false;
            this.input.value = this.input.value + '-' + endMonth + '/' + year;
            this.input.setAttribute('end-month', endMonth)
            this.input.setAttribute('end-year', year)
            var monthButtons = pickerDropdown.querySelectorAll('.month');
            monthButtons.forEach(function (button, index) {
                button.classList.toggle('disabled', index < startMonth - 1);
                button.disabled = index < startMonth - 1;
            });
            monthButtons.forEach(function (button) {
                if (button.innerHTML === monthNames[endMonth - 1]) {
                    button.classList.add('selected');
                }
            });
            this.endPickerDropdown.style.display = 'none';
            this.startPickerDropdown.style.display = 'none';
            startMonth = null;
            endMonth = null;
        } else if (startMonth === null && endMonth === null) {
            // this.startPickerDropdown.querySelector('.prevYear').disabled = true;
            var selectedMonthsCount = this.startPickerDropdown.querySelectorAll('.month.selected').length;
            var selectedMonths2Count = this.endPickerDropdown.querySelectorAll('.month.selected').length;
            if (selectedMonthsCount <= 1) {
                this.startPickerDropdown.querySelectorAll('.month').forEach(function (button) {
                    button.classList.remove('selected');
                    button.classList.add('disabled');
                    button.disabled = true;
                });
                if (selectedMonths2Count > 0) {
                    this.endPickerDropdown.querySelectorAll('.month').forEach(function (button) {
                        button.classList.remove('selected');
                        button.classList.remove('disabled');
                    });
                }
            }
            if (selectedMonthsCount === 2) {
                this.startPickerDropdown.querySelectorAll('.month').forEach(function (button) {
                    button.classList.remove('selected');
                    button.classList.add('disabled');
                    button.disabled = true;
                });
            }
            startMonth = monthNames.indexOf(month) + 1;
            this.input.value = startMonth + '/' + year;
            this.input.setAttribute('start-month', startMonth)
            this.input.setAttribute('start-year', year)
            var monthButtons = pickerDropdown.querySelectorAll('.month');
            monthButtons.forEach(function (button, index) {
                button.classList.toggle('disabled', index < startMonth - 1);
                button.disabled = index < startMonth - 1;
                button.classList.remove('selected');
                if (button.innerHTML === monthNames[startMonth - 1]) {
                    button.classList.add('selected');
                }
            });
        } else {
            console.log('Error:');
        }

        this.setHoverEffect();
    }
    //get value function is to get the value of input field
    getValue() {
        const value = this.input.value.trim();
        const monthYearRegex = /^(\d{1,2})\/(\d{4})\s*-\s*(\d{1,2})\/(\d{4})$/;
        const matches = value.match(monthYearRegex);

        if (matches && matches.length === 5) {
            const startMonth = parseInt(matches[1]);
            const startYear = parseInt(matches[2]);
            const endMonth = parseInt(matches[3]);
            const endYear = parseInt(matches[4]);
            return {
                startMonth,
                startYear,
                endMonth,
                endYear
            };
        }

        return null;
    }

    setHoverEffect() {
        const startMonthsList = this.startPickerDropdown.querySelector('.picker-months');
        const startMonths = Array.from(startMonthsList.children);
        const endMonthsList = this.endPickerDropdown.querySelector('.picker-months');
        const endMonths = Array.from(endMonthsList.children);
        const months = [...startMonths, ...endMonths];

        let selectedIndices = [];

        for (let i = 0; i < months.length; i++) {
            const month = months[i];
            if (month.classList.contains('selected')) {
                selectedIndices.push(i);
            }
        }

        months.forEach((month, index) => {
            month.addEventListener('mouseenter', function (event) {
                const hoverIndex = months.indexOf(month);
                if (selectedIndices.length === 2) {
                    const [firstIndex, secondIndex] = selectedIndices;
                    if (hoverIndex > firstIndex && hoverIndex < secondIndex) {
                        months.forEach((month, i) => {
                            if (i > firstIndex && i <= hoverIndex) {
                                month.classList.add('between');
                            } else {
                                month.classList.remove('between');
                            }
                        });
                    } else {
                        months.forEach((month, i) => {
                            if (i > firstIndex && i < secondIndex) {
                                month.classList.add('between');
                            } else {
                                month.classList.remove('between');
                            }
                        });
                    }
                } else if (selectedIndices.length === 1) {
                    const selectedIndex = selectedIndices[0];
                    if (hoverIndex !== selectedIndex) {
                        months.forEach((month, i) => {
                            if ((i > selectedIndex && i <= hoverIndex) || (i < selectedIndex && i >= hoverIndex)) {
                                month.classList.add('between');
                            } else {
                                month.classList.remove('between');
                            }
                        });
                    } else {
                        month.classList.remove('between');
                    }
                } else {
                    month.classList.remove('between');
                }
            });
        });
    }

    clearHoverEffect() {
        const startMonthsList = this.startPickerDropdown.querySelector('.picker-months');
        const startMonths = Array.from(startMonthsList.children);
        const endMonthsList = this.endPickerDropdown.querySelector('.picker-months');
        const endMonths = Array.from(endMonthsList.children);
        console.log(startMonths);
        const months = [...startMonths, ...endMonths];
        months.forEach((month) => {
            month.classList.remove('between');
        });
    }
    
    outSideClickEffect() {
        const elementToHide = this.startPickerDropdown;
        document.addEventListener('click', function (event) {
            const clickedElement = event.target;
            if (!elementToHide.contains(clickedElement)) {
                // Clicked outside the element, hide it
                elementToHide.style.display = 'none';
            }
            if (clickedElement.className == 'month-picker-input' || clickedElement.classList == 'fa fa-angle-double-right' || clickedElement.classList == 'picker-year' || clickedElement.classList == 'selectedYear') {
                elementToHide.style.display = 'block';
            }
        })
        const elementToHide2 = this.endPickerDropdown;
        document.addEventListener('click', function (event) {
            const clickedElement = event.target;
            if (!elementToHide.contains(clickedElement)) {
                // Clicked outside the element, hide it
                elementToHide2.style.display = 'none';
            }
            if (clickedElement.className == 'month-picker-input' || clickedElement.classList == 'fa fa-angle-double-right' || clickedElement.classList == 'picker-year' || clickedElement.classList == 'selectedYear') {
                elementToHide2.style.display = 'block';
            }
        })
    }

}
// Usage
// const input = document.querySelector(".monthYearRangeInput");
// const monthYearPicker = new MonthYearPicker(input);
