1.How to use month year picker ?
#include index.css at the top of the html in the head tag
#include index.js at the end of the body

#make an input field and give a class to it.
now in the script write this 

const input = document.querySelector("name of the class of input field");
const monthYearPicker = new MonthYearPicker(input);



2.How to get values (use function getValue())

const selectedValues = monthYearPicker.getValue();
console.log(selectedValues);

See Live example - https://ranakartikchauhan.github.io/testmonth/
