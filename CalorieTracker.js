const apiKey = 'nlFarY62IO8Tzsv9VKYnkg==UJyqd9bpyem8X1Sq';

document.getElementById('food').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        document.getElementById('add').click();
    }
});

function addFood(event) {
    event.preventDefault();
    const query = document.getElementById("food").value;
    const capitalizedQuery = capitalizeFirstLetter(query);
    console.log(capitalizedQuery);

    fetchNutritionInfo(capitalizedQuery, capitalizedQuery);
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function appendToList(listId, text) {
    const li = document.createElement("li");
    li.textContent = text;
    document.getElementById(listId).appendChild(li);
}

function fetchNutritionInfo(query, foodName) {
    $.ajax({
        method: 'GET',
        url: 'https://api.api-ninjas.com/v1/nutrition?query=' + query,
        headers: { 'X-Api-Key': apiKey },
        contentType: 'application/json',
        success: function(result) {
            appendToList("listOfFood", foodName);
            handleApiResponse(result);
        },
        error: function(jqXHR) {
            console.error('Error: ', jqXHR.responseText);
        }
    });
}

function handleApiResponse(result) {
    console.log(result);
    const calories = result[0].calories;
    appendToList("listOfFood", "Calories: " + calories);

    const protein = result[0].protein_g;
    appendToList("listOfFood", "Protein: " + protein + " grams");

    const totalFat = result[0].fat_total_g;
    appendToList("listOfFood", "Total Fat: " + totalFat + " g");

    const totalCarbs = result[0].carbohydrates_total_g;
    appendToList("listOfFood", "Total Carbs: " + totalCarbs + " g");

    const servingSize = result[0].serving_size_g;

    const fiber = result[0].fiber_g;
    appendToList("listOfFood", "Fiber: " + fiber + " g");

    const sugar = result[0].sugar_g;
    appendToList("listOfFood", "Sugar: " + sugar + " g");

    const cholesterol = result[0].cholesterol_mg;
    appendToList("listOfFood", "Cholesterol: " + cholesterol + " mg");

    const sodium = result[0].sodium_mg;
    appendToList("listOfFood", "Sodium: " + sodium + " mg");
}
