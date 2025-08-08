const calorieCounter = document.getElementById('calorie-counter');
const budgetNumberInput = document.getElementById('budget');
const budgetProteinInput = document.getElementById('budgetProtein');
const entryDropdown = document.getElementById('entry-dropdown');
const addEntryButton = document.getElementById('add-entry');
const clearButton = document.getElementById('clear');
const output = document.getElementById('output');
let isError = false;

function cleanInputString(str) {
  const regex = /[+-\s]/g;
  return str.replace(regex, '');
}

function isInvalidInput(str) {
  const regex = /\d+e\d+/i;
  return str.match(regex);
}

function addEntry() {
  const targetInputContainer = document.querySelector(`#${entryDropdown.value} .input-container`);
  const entryNumber = targetInputContainer.querySelectorAll('input[type="text"]').length + 1;
  const HTMLString = `
  
  <label for="${entryDropdown.value}-${entryNumber}-name">---------------Entry ${entryNumber} Name---------------</label>
  <input type="text" id="${entryDropdown.value}-${entryNumber}-name" placeholder="Name" />
  
  <label for="${entryDropdown.value}-${entryNumber}-calories"> Calories</label>
  <input
    type="number"
    min="0"
    id="${entryDropdown.value}-${entryNumber}-calories"
    placeholder="Calories"
  </input>
  
  `

  const HTMLString2 =`
  <label for="${entryDropdown.value}-${entryNumber}-protein"> Protein</label>
  <input
    class="protein"
    type="number"
    min="0"
    id="${entryDropdown.value}-${entryNumber}-protein"
    placeholder="Protein"  
    />
  `;
  targetInputContainer.insertAdjacentHTML('beforeend', HTMLString);
  targetInputContainer.insertAdjacentHTML('beforeend', HTMLString2);
}

function calculateCalories(e) {
  e.preventDefault();
  isError = false;

const breakfastNumberInputs = document.querySelectorAll("#breakfast input[type='number']:not(.protein)");
const lunchNumberInputs = document.querySelectorAll("#lunch input[type='number']:not(.protein)");
const dinnerNumberInputs = document.querySelectorAll("#dinner input[type='number']:not(.protein)");
const snacksNumberInputs = document.querySelectorAll("#snacks input[type='number']:not(.protein)");
const exerciseNumberInputs = document.querySelectorAll("#exercise input[type='number']");

  const breakfastCalories = getCaloriesFromInputs(breakfastNumberInputs);
  const lunchCalories = getCaloriesFromInputs(lunchNumberInputs);
  const dinnerCalories = getCaloriesFromInputs(dinnerNumberInputs);
  const snacksCalories = getCaloriesFromInputs(snacksNumberInputs);
  const exerciseCalories = getCaloriesFromInputs(exerciseNumberInputs);
  const budgetCalories = getCaloriesFromInputs([budgetNumberInput]);


  const breakfastNumberInputsP = document.querySelectorAll("#breakfast input.protein");
  const lunchNumberInputsP = document.querySelectorAll("#lunch input.protein");
  const dinnerNumberInputsP = document.querySelectorAll("#dinner input.protein");
  const snacksNumberInputsP = document.querySelectorAll("#snacks input.protein");

  const breakfastP = getCaloriesFromInputs(breakfastNumberInputsP);
  const lunchP = getCaloriesFromInputs(lunchNumberInputsP);
  const dinnerP = getCaloriesFromInputs(dinnerNumberInputsP);
  const snacksP = getCaloriesFromInputs(snacksNumberInputsP);
  const budgetP = getCaloriesFromInputs([budgetProteinInput]);


  if (isError) {
    return;
  }

  const consumedCalories = breakfastCalories + lunchCalories + dinnerCalories + snacksCalories;
  const remainingCalories = budgetCalories - consumedCalories + exerciseCalories;
  const calorieStatus = remainingCalories < 0 ? 'Surplus' : 'Deficit';

  const consumedProtein = breakfastP + lunchP + dinnerP + snacksP;
  const remainingProtein = budgetP - consumedProtein;

  const proteinStatus = remainingProtein < 0 ? 'Deficit' : 'Surplus';

output.innerHTML = `
  <span class="${calorieStatus.toLowerCase()}">${Math.abs(remainingCalories)} Calorie ${calorieStatus}</span>
  <hr>
  <p>${budgetCalories} Calories Budgeted</p>
  <p>${consumedCalories} Calories Consumed</p>
  <p>${exerciseCalories} Calories Burned</p>

  <p>${budgetP} Protein Budgeted</p>
  <p>${consumedProtein} Protein Consumed</p>
  <span class="${proteinStatus.toLowerCase()}">${Math.abs(remainingProtein)} Protein ${proteinStatus}</span>
`;
  
  output.classList.remove('hide');
}

function getCaloriesFromInputs(list) {
  let calories = 0;

  for (const item of list) {
    const currVal = cleanInputString(item.value);
    const invalidInputMatch = isInvalidInput(currVal);

    if (invalidInputMatch) {
      alert(`Invalid Input: ${invalidInputMatch[0]}`);
      isError = true;
      return null;
    }
    calories += Number(currVal);
  }
  return calories;
}
function getProteinFromInput(list2){
  let protein = 0;

  for (const item of list2) {
    const currVal = cleanInputString(item.value);
    const invalidInputMatch = isInvalidInput(currVal);

    if (invalidInputMatch) {
      alert(`Invalid Input: ${invalidInputMatch[0]}`);
      isError = true;
      return null;
    }
    protein += Number(currVal);
  }
  return protein;
}

function clearForm() {
  const inputContainers = Array.from(document.querySelectorAll('.input-container'));

  for (const container of inputContainers) {
    container.innerHTML = '';
  }

  budgetNumberInput.value = '';
  budgetProteinInput.value = '';

  output.innerText = '';
  output.classList.add('hide');
}

addEntryButton.addEventListener("click", addEntry);
calorieCounter.addEventListener("submit", calculateCalories);
clearButton.addEventListener("click", clearForm);