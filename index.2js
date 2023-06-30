
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
        this.input.parentNode.insertBefore(this.parentPicker, this.input);
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
        prevYearBtn.innerHTML = "<i class='fa fa-angle-double-left' style='font-size:25px;opacity:0.5'></i>";

        const selectedYear = document.createElement("span");
        selectedYear.className = "selectedYear";
        selectedYear.innerText = pickerClassName === 'picker-dropdown-1' ? new Date().getFullYear() : new Date().getFullYear() + 1;


        const nextYearBtn = document.createElement("button");
        nextYearBtn.className = "nextYear";
        nextYearBtn.innerHTML = "<i class='fa fa-angle-double-right' style='font-size:25px;opacity:0.5'></i>";


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

        });

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

        // Initialize selectedMonths array
        let selectedMonths = [];

        startPrevYearBtn.addEventListener("click", () => {
            const currentYear = parseInt(this.startPickerDropdown.querySelector(".selectedYear").innerText);
            this.startPickerDropdown.querySelector(".selectedYear").innerText = currentYear - 1;
            this.endPickerDropdown.querySelector(".selectedYear").innerText = currentYear;

            // Add 'selected' and 'disabled' classes to the months in selectedMonths array
            const months = this.endPickerDropdown.querySelectorAll('.month');




            var firstSlashIndex = this.input.value.indexOf('/');
            var hyphenIndex = this.input.value.indexOf('-');

            // Check if a hyphen exists and its position is after the first slash
            var valueAfterSlash;
            if (hyphenIndex !== -1 && hyphenIndex > firstSlashIndex) {
                valueAfterSlash = this.input.value.substring(firstSlashIndex + 1, hyphenIndex);
            } else {
                valueAfterSlash = this.input.value.substring(firstSlashIndex + 1);
            }

            if(this.input.value.length >= 13 ){
                var monthButtons = this.startPickerDropdown.querySelectorAll('.month');
                monthButtons.forEach(function (button, index) {
                   button.classList.remove('selcted')
                   button.classList.remove('disabled')
                   button.disabled = false;
                });
                var monthButtons = this.endPickerDropdown.querySelectorAll('.month');
                monthButtons.forEach(function (button, index) {
                   button.classList.remove('selcted')
                   button.classList.remove('disabled')
                   button.disabled = false;
                });
            }

            if (valueAfterSlash == currentYear) {
                months.forEach(function (button) {
                    const month = button.innerText;
                    if (selectedMonths.includes(month)) {
                        button.classList.add('disabled');
                        button.disabled = true;
                    }
                });
            }

        });

        const endNextYearBtn = this.endPickerDropdown.querySelector(".nextYear");

        endNextYearBtn.addEventListener("click", () => {
            const currentYear = parseInt(this.endPickerDropdown.querySelector(".selectedYear").innerText);
            var firstSlashIndex = this.input.value.indexOf('/');
            var hyphenIndex = this.input.value.indexOf('-');

            // Check if a hyphen exists and its position is after the first slash
            var valueAfterSlash;
            if (hyphenIndex !== -1 && hyphenIndex > firstSlashIndex) {
                valueAfterSlash = this.input.value.substring(firstSlashIndex + 1, hyphenIndex);
            } else {
                valueAfterSlash = this.input.value.substring(firstSlashIndex + 1);
            }

            if (valueAfterSlash == currentYear) {
                this.endPickerDropdown.querySelectorAll('.month').forEach(function (button) {

                    const month = button.innerText;
                    if (button.classList.contains('disabled')) {
                        selectedMonths.push(month);
                    }

                    button.classList.remove('selected');
                    button.classList.remove('disabled');
                    button.disabled = false;
                });
            }


            this.endPickerDropdown.querySelector(".selectedYear").innerText = currentYear + 1;
            this.startPickerDropdown.querySelector(".selectedYear").innerHTML = currentYear;
           
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

            this.startPickerDropdown.querySelector('.prevYear').disabled = false;
            this.input.value = this.input.value + '-' + endMonth + '/' + year;

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
            this.startPickerDropdown.querySelector('.prevYear').disabled = false;
            this.input.value = this.input.value + '-' + endMonth + '/' + year;
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
            this.startPickerDropdown.querySelector('.prevYear').disabled = true;

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
}

// Usage
// const input = document.querySelector(".monthYearRangeInput");
// const monthYearPicker = new MonthYearPicker(input);


