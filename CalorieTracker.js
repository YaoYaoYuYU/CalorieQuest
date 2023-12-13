const apiKey = 'nlFarY62IO8Tzsv9VKYnkg==UJyqd9bpyem8X1Sq';

document.getElementById('food').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        document.getElementById('add').click();
    }
}); 

let currentList = 1;
let totalCalories = 0;
let totalProtein = 0;
let totalTotalFat = 0;
let totalTotalCarbs = 0;
let totalFiber = 0;
let totalSugar = 0;
let totalCholesterol = 0;
let totalSodium = 0;

function addFood(event) {
    event.preventDefault()
    var food = document.getElementById('food').value;
    food = capitalizeFirstLetter(food);
    if (food) {
        fetchNutritionInfo(food, currentList, food);

        document.getElementById('listOfFood' + currentList).classList.add('hasContent');
        currentList = (currentList % 10) + 1; 
        document.getElementById('totalMacrosContainer').classList.add('hasContent');
    }
    document.getElementById('food').value = '';
}



function resetButton(event){ 
    event.preventDefault();
    document.getElementById('listOfFood1').classList.remove('hasContent');
    document.getElementById('listOfFood2').classList.remove('hasContent');
    document.getElementById('listOfFood3').classList.remove('hasContent');
    document.getElementById('listOfFood4').classList.remove('hasContent');
    document.getElementById('listOfFood5').classList.remove('hasContent');
    document.getElementById('listOfFood6').classList.remove('hasContent');
    document.getElementById('listOfFood7').classList.remove('hasContent');
    document.getElementById('listOfFood8').classList.remove('hasContent');
    document.getElementById('listOfFood9').classList.remove('hasContent');
    document.getElementById('listOfFood10').classList.remove('hasContent');
    document.getElementById('listOfFood1').innerHTML = '';
    document.getElementById('listOfFood2').innerHTML = '';
    document.getElementById('listOfFood3').innerHTML = '';
    document.getElementById('listOfFood4').innerHTML = '';
    document.getElementById('listOfFood5').innerHTML = '';
    document.getElementById('listOfFood6').innerHTML = '';
    document.getElementById('listOfFood7').innerHTML = '';
    document.getElementById('listOfFood8').innerHTML = '';
    document.getElementById('listOfFood9').innerHTML = '';
    document.getElementById('listOfFood10').innerHTML = '';
}
    
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function appendToList(result, listId) {
    const li = document.createElement("li");
    li.textContent = result;
    document.getElementById('listOfFood' + listId).appendChild(li);
}

function fetchNutritionInfo(query, listId, foodName) {
    $.ajax({
        method: 'GET',
        url: 'https://api.api-ninjas.com/v1/nutrition?query=' + query,
        headers: { 'X-Api-Key': apiKey },
        contentType: 'application/json',
        success: function(result) {
            handleApiResponse(result, listId, foodName);
        },
    });
}

function handleApiResponse(result, listId, foodName) {
    console.log(result);
    appendToList(foodName, listId); 
    const calories = result[0].calories;
    appendToList("Calories: " + calories, listId); 

    const protein = result[0].protein_g;
    appendToList("Protein: " + protein + " grams", listId);

    const totalFat = result[0].fat_total_g;
    appendToList("Total Fat: " + totalFat + " g", listId);

    const totalCarbs = result[0].carbohydrates_total_g;
    appendToList("Total Carbs: " + totalCarbs + " g", listId);

    const servingSize = result[0].serving_size_g;
    appendToList("Serving Size: " + servingSize + " g", listId);

    const fiber = result[0].fiber_g;
    appendToList("Fiber: " + fiber + " g", listId);

    const sugar = result[0].sugar_g;
    appendToList("Sugar: " + sugar + " g", listId);

    const cholesterol = result[0].cholesterol_mg;
    appendToList("Cholesterol: " + cholesterol + " mg", listId);

    const sodium = result[0].sodium_mg;
    appendToList("Sodium: " + sodium + " mg", listId);

    document.getElementById('listOfFood' + listId).classList.add('hasContent');

    totalCalories += Math.round(calories);
    totalProtein += Math.round(protein);
    totalTotalFat += Math.round(totalFat);
    totalTotalCarbs += Math.round(totalCarbs);
    totalFiber += Math.round(fiber);
    totalSugar += Math.round(sugar);
    totalCholesterol += Math.round(cholesterol);
    totalSodium += Math.round(sodium);

    
    document.getElementById("totalMacrosContainer").innerHTML = 
        "Total Calories: " + totalCalories + " | " +
        "Total Protein: " + totalProtein + " grams | " +
        "Total Fat: " + totalTotalFat + " grams | " +
        "Total Carbs: " + totalTotalCarbs + " grams | " +
        "Total Fiber: " + totalFiber + " grams | " +
        "Total Sugar: " + totalSugar + " grams | " +
        "Total Cholesterol: " + totalCholesterol + " milligrams | " +
        "Total Sodium: " + totalSodium + " milligrams";

        var ctx = document.getElementById('percentChart').getContext('2d');
        var myChart = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: ['Calories', 'Protein', 'Total Fat', 'Total Carbs', 'Fiber', 'Sugar', 'Cholesterol', 'Sodium'],
                datasets:  [{ 
                    data: [totalCalories, totalProtein, totalTotalFat, totalTotalCarbs, totalFiber, totalSugar, totalCholesterol, totalSodium],
                    backgroundColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)',
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)',
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                plugins: {
                    legend: {
                        labels: {
                            color: 'white',
                            font:{
                                size:20
                            }
                        }
                    }
                }
            }
        });
}
